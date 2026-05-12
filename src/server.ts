import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer((req: IncomingMessage, res:ServerResponse)=>{
    // console.log(req.url);
    // console.log(req.method);

    const url = req.url;
    const method = req.method;

    if (url === '/' && method === "GET") {
        console.log('This is root route');
    }
})

server.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})