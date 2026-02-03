// import fs from 'node:fs/promises';

// //Top level await
// const data = await fs.readFile("./data.json", "utf-8");
// const json =JSON.parse(data);

// console.log(data);

//------------------
// import http from 'node:http';
// const PORT= 3000;

// //Endpoint
// //localhost:3000/
// //localhost:3000/health
// //localhost:3000/about

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     if(req.url === "/" && req.method === 'GET'){
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({message:"Welcome to the home route!"}));
//         return;
//     };
//     if(req.url === "/health" && req.method === "GET"){
//         res.writeHead(200, {"Content-Type": "application/json"});
//         res.end(JSON.stringify({status: "Ok"}));
//         return;
//     }



//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello, Node.js!');
// });
// server.listen(PORT, ()=> {
//     console.log(`Server is running at http://localhost:${PORT}/`);
// });

//----------------
import express from 'express';

const app = express();

//GET localhost:3000/
//GET localhost:3000/health

//Middleware - function
app.use((req, res, next)=> {
    console.log("app.use",req.url, req.method);
    next();
})
app.get('/', (req, res) => {
    console.log(req.url, req.method);
    res.status(200).json({message: 'Welcme to home route'});
});
app.get("/health", (req, res) => {
    res.status(200).json({status: "Ok!"});
});
app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})