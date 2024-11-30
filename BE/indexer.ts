import { CardanoSyncClient } from "@utxorpc/sdk";
import { Db } from 'mongodb';
import { connect, getDb } from "./db.js";

const config = {
    "historyStart" : {   "hash": "87458e357c3245835e21d2d752db0b3c71561c111cc4d43d9de3a250264fd3e5",
      "height": 2940242,
      "slot": 77294142
},
"utxoRpc": {
  "host": "https://preview.utxorpc-v0.demeter.run",
  "headers": {"dmtr-api-key":"utxorpc1l2u0r07s2rg3sl63h69"} 
},
}

export default async function indexer() {
  await connect("mongodb://localhost:27017");
  setInterval(() => {
    console.log("Indexer");
  }, 1000);
  const mongo = getDb("webData");


  let tip = await mongo.collection("height").findOne({type: "top"});
  if(!tip){
    tip = config.historyStart;
  }
  const rcpClient = new CardanoSyncClient({ uri : config.utxoRpc.host,  headers : config.utxoRpc.headers} );

  const tipPoint = [{slot: tip.slot, hash: tip.hash}];
  const stream =  rcpClient.followTip(tipPoint);

  for await (const block of stream ) {
      console.log(1);

   }
}

