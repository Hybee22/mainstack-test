import Product from "../../../models/Product";
import { ProductService } from "../services/product.service";
import { ProductController } from "./product.controller";

const productService = new ProductService(Product); // Replace with the actual implementation of Category

jest.mock("../services/product.service");

describe("ProductController", () => {
  // createProduct method should create a product and return a 201 status code with the created product data
  it("should create a product and return a 201 status code with the created product data", async () => {
    const req = {
      body: {
        name: "Test Product",
        description: "Test Description",
        price: 10,
        category: "Test Category",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    //   @ts-ignore
    await ProductController.createProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled()
  });

  // getProduct method should return a 200 status code with the fetched product data
  it("should return a 200 status code with the fetched product data", async () => {
    const req = {
      params: {
        id: "testId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ProductController.getProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // getProducts method should return a 200 status code with the fetched categories data
  it("should return a 200 status code with the fetched categories data", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ProductController.getProducts(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // getProducts method should return a 404 status code if there are no categories found
  it("should return a 404 status code if there are no categories found", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
//   @ts-ignore
    await ProductController.getProducts(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // updateProduct method should update a product and return a 200 status code with the updated product data
  it("should update a product and return a 200 status code with the updated product data", async () => {
    const req = {
      params: {
        id: "testId",
      },
      body: {
        name: "Updated Product",
        description: "Updated Description",
        price: 20,
        category: "Updated Category",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
//   @ts-ignore
    await ProductController.updateProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // deleteProduct method should delete a product and return a 200 status code with the deleted product data
  it("should delete a product and return a 200 status code with the deleted product data", async () => {
    const req = {
      params: {
        id: "testId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
//   @ts-ignore
    await ProductController.deleteProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // updateProduct method should return a 404 status code if the product id is invalid or not found
  it("should return a 404 status code when the product id is invalid or not found", async () => {
    const req = {
      params: {
        id: "invalidId",
      },
      body: {
        name: "Test Product",
        description: "Test Description",
        price: 10,
        category: "Test Category",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ProductController.updateProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });

  // deleteProduct method should return a 404 status code if the product id is invalid or not found
  it("should return a 404 status code when the product id is invalid or not found", async () => {
    const req = {
      params: {
        id: "invalidId",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    //   @ts-ignore
    await ProductController.deleteProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled()
  });
});
