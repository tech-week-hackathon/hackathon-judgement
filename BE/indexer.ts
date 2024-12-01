import { CardanoSyncClient } from "@utxorpc/sdk";
import { Db, ObjectId } from 'mongodb';
import { submit, syncConnect, cardano, queryConnect, submitConnect, query } from '@utxorpc/spec';

import { connect, getDb } from "./db.js";

const config = {
    "historyStart" : {   "hash": "87458e357c3245835e21d2d752db0b3c71561c111cc4d43d9de3a250264fd3e5",
      "height": 2940242,
      "slot": 77294142
},
"utxoRpc": {
  "host": "http://142.93.164.76:50051",
  "headers": {} 
},
}

let mongo : Db;

export default async function indexer() {

  mongo = getDb("webData");

  let tip = await mongo.collection("height").findOne({type: "top"});
  if(!tip){
    tip = { ...config.historyStart, _id: new ObjectId() };
  }
  const rcpClient = new CardanoSyncClient({ uri : config.utxoRpc.host,  headers : config.utxoRpc.headers} );

  const tipPoint = [{slot: tip.slot, hash: tip.hash}];
  const stream =  rcpClient.followTip(tipPoint);

  for await (const block of stream ) {
    if(block.action === "apply"){
      await handleBlock(block.block);
    }
    else if(block.action === "undo"){
      await handleBlockUndo(block);
    }
    else if(block.action === "reset"){
      await handleBlockReset(block);
    }

   }
}


async function handleBlock(block: cardano.Block ){
  
  let blockHash = Buffer.from(block.header.hash).toString('hex');
  block.body.tx.forEach(async (tx) => {
    if(tx.auxiliary?.metadata){
      
    tx.auxiliary?.metadata?.forEach(async (data) => {
      if(data.label === 77777n){
        console.log(data.value?.toJsonString());
        const metadataJson = JSON.parse(data.value?.toJsonString());
        const metadata = { }
        metadataJson["map"].pairs.forEach((pair: any) => {
          metadata[pair.key.text] = pair.value.text
        })
        
        metadata["height"] = block.header.height;
        metadata["slot"] = block.header.slot;
        metadata["blockHash"] = blockHash;
        
        console.log(metadata);
        const txHash = Buffer.from(tx.hash).toString('hex');
        metadata["txHash"] = txHash;
        metadata["voter"] = Buffer.from(tx.inputs[0].asOutput.address).toString('hex');
        await mongo.collection("judgements").updateOne({txHash: txHash}, {$set: metadata}, {upsert: true});
      }
      });
    }
    });
  await mongo.collection("height").updateOne({type: "top"}, {$set: {hash: blockHash, slot: block.header.slot, height: block.header.height, type: "top"}}, {upsert: true});
  console.log(blockHash);
}

async function handleBlockUndo(block: any){
 // let blockHash = Buffer.from(block.block.header.hash).toString('hex');
  console.log("undo", block);
}

async function handleBlockReset(block: any){
 // let blockHash = Buffer.from(block.block.header.hash).toString('hex');
  
   console.log("reset", block);
}
