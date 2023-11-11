import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import fs from "fs";
import EventEmitter from "events";
import http from "http";

///////////////////////////////////////////////////////////////////

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// let parsedPath = path.parse(__filename);
// console.log(parsedPath);

///////////////////////////////////////////////////////////////////

// console.log(os.freemem(), os.totalmem());

///////////////////////////////////////////////////////////////////

// fs.readdir("./", (err, files) => {
//   console.log(files);
// });

///////////////////////////////////////////////////////////////////

// class MyEventEmitter extends EventEmitter {}

// const myEmitter = new MyEventEmitter();
// myEmitter.on("log", (msg) => {
//   console.log(msg);
// });

// myEmitter.emit("log", "Hello");

///////////////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello1");
  } else if (req.url === "/product") {
    res.write(JSON.stringify({ Products: ["Product1", "Product1"] }));
  } else {
    res.write("Hello3");
  }
  res.end();
});

server.listen(3000);
