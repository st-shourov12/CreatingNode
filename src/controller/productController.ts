import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (req :IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    console.log("req", req);

    const urlParts = url?.split("/");
    // console.log(urlParts);
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null;
    // console.log(id);

    // Get all Product
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
    } else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p:IProduct) => p.id === id);
        // console.log(product);
        res.writeHead(200,{"content-type" : "application/json"})
        res.end(
            JSON.stringify({
                message : "Product Retrieve Successfully", 
                data : product
            })
        )
        
    } else if(method === "POST" && url === "/products"){
        const body = await parseBody(req);
        console.log(body);

        res.writeHead(200,{"content-type" : "application/json"})
        res.end(
            JSON.stringify({
                message : "Product created Successfully", 
                data : body
            })
        )
    }
}