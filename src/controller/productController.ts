import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  // console.log("req", req);

  const urlParts = url?.split("/");
  // console.log(urlParts);
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log(id);

  // Get all Product
  if (url === "/products" && method === "GET") {
    // const products = [
    //     {
    //         id : 1 ,
    //         name: "Apple",
    //         price : 200
    //     }
    // ];
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "This is products route", data: products }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product Retrieve Successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    // console.log("body", body);
    const products = readProduct();
    const newProduct = {
      id: products.length + 1,
      ...body,
    };
    products.push(newProduct);
    // console.log(products);
    insertProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product created Successfully",
        data: newProduct,
      }),
    );
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
          // data : product
        }),
      );
    }
    // console.log(products[index]);

    products[index] = {
        id: products[index].id,
        ...body
    };


    insertProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product updated successfully",
          data : products[index]
        }),
      );


  }
};
