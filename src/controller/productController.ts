import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (req :IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    if (url === "/products"  && method === "GET") {
        // const products = [
        //     {
        //         id : 1 , 
        //         name: "Apple",
        //         price : 200
        //     }
        // ];
        const products = readProduct()

        res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({message : "This is products route", data : products}))
    }
}