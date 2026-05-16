import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

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

    
    try {
        return sendResponse(res, 200, true, "This is product route", products)
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    // console.log(product);

    if (!product) {
      
      try {
        return sendResponse(res, 404, false, "Product not found")
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
    }
    

    try {
        return sendResponse(res, 200, true, "Product Retrieve Successfully", product)
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
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
    

    try {
        return sendResponse(res, 201, true, "Product created Successfully", newProduct)
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
          try {
        return sendResponse(res, 404, false, "Product not found!")
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
    }
    // console.log(products[index]);

    products[index] = {
      id: products[index].id,
      ...body,
    };

    insertProduct(products);
    

    try {
        return sendResponse(res, 200, true, "Product updated Successfully", products[index])
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    // console.log(index);

    if (index < 0) {
        try {
        return sendResponse(res, 404, false, "Product not found!")
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
    }
    products.splice(index, 1);
    // console.log(products);
    insertProduct(products);
    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Product deleted successfully",
        
    //   }),
    // );
    try {
        return sendResponse(res, 200, true, "Product deleted Successfully")
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went wrong", error)
      }
  }
};
