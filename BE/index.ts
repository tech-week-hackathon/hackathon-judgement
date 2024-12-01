import indexer from "./indexer.js";
import api from "./api.js";
import {connect} from "./db.js";
console.log("Hello World");


async function main(){
  await connect("mongodb://localhost:27017");
  api();
  indexer();
}

main();
