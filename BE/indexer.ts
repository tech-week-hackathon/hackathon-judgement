import { CardanoSyncClient } from "@utxorpc/sdk";
import { Db, ObjectId } from 'mongodb';
import { submit, syncConnect, cardano, queryConnect, submitConnect, query } from '@utxorpc/spec';

import { connect, getDb } from "./db.js";

const members = [
  {
      "name": "Emurgo",
      "bio": "EMURGO is a global blockchain technology company providing solutions for developers, startups, enterprises and governments. EMURGO develops enterprise-grade applications, builds developer tools, invests in startups, and provides blockchain education. We are also one of the founding entities behind Cardano blockchain, a leading blockchain 3.0 platform.",
      "website": "https://emurgo.io/",
      "twitter": "https://twitter.com/emurgo_io",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-07164ac1-29fe-480f-99da-f8fbc678c347",
      "hotCredHex": "",
      "coldCredHex": "136095e643ea6f1cccb6e463ec34349026b3a48621aac5d512655ab1bf",
      "hotCredBech": "",
      "coldCredBech": "cc_cold1zdsftejrafh3en9ku337cdp5jqnt8fyxyx4vt4gjv4dtr0c5vz6ed",
      "total": 0
  },
  {
      "name": "Input | Output",
      "bio": "Input | Output is a research and development company committed to using the peer-to-peer innovations of blockchain to build accessible financial services and products for all. The company is the blockchain engineering company behind the Cardano blockchain.",
      "website": "https://iohk.io/",
      "twitter": "https://twitter.com/InputOutputHK",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-c394a45e-029a-4a3c-8f9b-ce8707abdbcd",
      "hotCredHex": "034f00984fa72e265b8ff8ffce4405da562cd3d6b16a4a38de3372eeea",
      "coldCredHex": "1394c0de47e7ae32e3f7234ada5cf976506b68e3bb88c54dc53b4ba984",
      "hotCredBech": "cc_hot1qd8spxz05uhzvku0lrluu3q9mftze57kk94y5wx7xdewa6s3guxzr",
      "coldCredBech": "cc_cold1zw2vphj8u7hr9clhyd9d5h8ewegxk68rhwyv2nw98d96npqxjxaj2",
      "total": 4
  },
  {
      "name": "Cardano Foundation",
      "bio": "The Cardano Foundation is an independent standards body that oversees and supervises the advancement of Cardano and its ecosystem. The Foundation's core mission is to 'standardize, protect and promote' the Cardano Protocol technology.",
      "website": "https://cardanofoundation.org/",
      "twitter": "https://twitter.com/Cardano_CF",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-f7fc210f-fabb-4486-a67b-e17a22b7674b",
      "hotCredHex": "",
      "coldCredHex": "132f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04h",
      "hotCredBech": "",
      "coldCredBech": "cc_cold1zvh55mr0px8zpmjtl4dnn9pvzezht7xwkdyww4xlt58vqnc6qdgps",
      "total": -4
  },
  {
      "name": "Cardano Atlantic Council",
      "bio": "A global consortium serving on Cardano's Constitutional Committee",
      "website": "https://github.com/Cardano-Atlantic-Council",
      "twitter": "https://twitter.com/CardanoAtlantic",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-ad603abe-3b0a-473f-b203-fe3542cba84c",
      "hotCredHex": "03e3a4c41d67592a1b8d87c62e5c5d73f7e8db836171945412d13f40f8",
      "coldCredHex": "135098dfd0deba725fadd692198fc33ee959fbe7e6edf1b5a695e06e61",
      "hotCredBech": "cc_hot1q036f3qavavj5xudslrzuhzaw0m73kurv9ceg4qj6yl5p7qf4a3gz",
      "coldCredBech": "cc_cold1zdgf3h7sm6a8yhad66fpnr7r8m54n7l8umklrddxjhsxucgkudvrr",
      "total": 2
  },
  {
      "name": "Intersect",
      "bio": "Intersect is a member-based organization for the Cardano ecosystem - putting the community at the center of Cardano’s development.",
      "website": "https://www.intersectmbo.org/",
      "twitter": "https://x.com/intersectmbo",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-aee8d8b6-cb00-49b9-b1b7-f83d668e7610",
      "hotCredHex": "03104f3db4e905fd008396f53a6d035e290f97f6172d3792673b213956",
      "coldCredHex": "135a71f17f4ce4c1c0be053575d717ade6ad8a1d5453d02a65ce40d4b1",
      "hotCredBech": "cc_hot1qvgy70d5ayzl6qyrjm6n5mgrtc5sl9lkzukn0yn88vsnj4sm78an6",
      "coldCredBech": "cc_cold1zdd8rutlfnjvrs97q56ht4ch4hn2mzsa23faq2n9eeqdfvgss2fuc",
      "total": 2
  },
  {
      "name": "Cardano Eastern Council",
      "bio": "A global consortium serving on Cardano's Constitutional Committee",
      "website": "",
      "twitter": "https://x.com/EasternCardano",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-a319cc43-aacb-4151-b883-ea9b6bfccc54",
      "hotCredHex": "03e732eac066fe2759f10b4b3473623b1cce4ba67ffc299b41915a1a0f",
      "coldCredHex": "132f4a6c6f098e20ee4bfd5b39942c164575f8ceb348e754df5d0ec04f",
      "hotCredBech": "cc_hot1q0nn96kqvmlzwk03pd9ngumz8vwvujax0l7znx6pj9dp5rcn8g5cu",
      "coldCredBech": "cc_cold1zwn2tcqxl48g75gx9hzrzd3rdxe2gv2q408d32307gjk67cp3tktt",
      "total": -1
  },
  {
      "name": "Cardano Japan",
      "bio": "Formed by Japanese ambassadors to contribute to the decentralization and healthy growth of the Cardano network.",
      "website": "",
      "twitter": "https://x.com/CardanoJapan",
      "logoURI": "https://s3.eu-west-1.amazonaws.com/gov-tool-cc-portal-prod/profile-photo-e02b6b8b-5181-4f9b-86d7-6b7f56594860",
      "hotCredHex": "",
      "coldCredHex": "1394f51c795a6c11adb9c1e30f0b6def4230cbd0b8bc800098e2d2307b",
      "hotCredBech": "",
      "coldCredBech": "cc_cold1zw2028retfkprtdec83s7zmdaaprpj7shz7gqqycutfrq7c8rrdeh",
      "total": 0
  }
]


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
        const memberExists = members.some(m => m.coldCredBech === metadata["member"]);
        if (!memberExists) {
          return;
        }
        metadata["height"] = block.header.height;
        metadata["slot"] = block.header.slot;
        metadata["blockHash"] = blockHash;
        
        console.log(metadata);
        const txHash = Buffer.from(tx.hash).toString('hex');
        metadata["txHash"] = txHash;
        const voter = Buffer.from(tx.inputs[0].asOutput.address).toString('hex'); 
        metadata["voter"] = voter;
        await mongo.collection("judgements").updateOne({voter: voter, member: metadata["member"]}, {$set: metadata}, {upsert: true});
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
