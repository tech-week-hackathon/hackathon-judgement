import { CardanoSyncClient } from "@utxorpc/sdk";
import { Db, ObjectId } from 'mongodb';
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

export default async function indexer() {
  await connect("mongodb://localhost:27017");

  const mongo = getDb("webData");


  let tip = await mongo.collection("height").findOne({type: "top"});
  if(!tip){
    tip = { ...config.historyStart, _id: new ObjectId() };
  }
  const rcpClient = new CardanoSyncClient({ uri : config.utxoRpc.host,  headers : config.utxoRpc.headers} );

  const tipPoint = [{slot: tip.slot, hash: tip.hash}];
  const stream =  rcpClient.followTip(tipPoint);

  for await (const block of stream ) {
    if(block.action === "apply"){
      await handleBlock(block);
    }
    else if(block.action === "undo"){
      await handleBlockUndo(block);
    }
    else if(block.action === "reset"){
      await handleBlockReset(block);
    }

   }
}


async function handleBlock(block: any){
  let blockHash = Buffer.from(block.block.header.hash).toString('hex');
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
