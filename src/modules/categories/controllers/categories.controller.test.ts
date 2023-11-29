import Category from "../../../models/Category";
import { CategoryService } from "../services/categories.service";
import { CategoriesController } from "./categories.controller";

const categoryService = new CategoryService(Category); // Replace with the actual implementation of Category

jest.mock("../services/categories.service");

describe("CategoriesController", () => {
  // createCategory method should create a new category and return it with a 201 status code
  it("should create a new category and return it with a 201 status code when payload is valid", async () => {
    const req = {
      body: { name: "Test Category", description: "Test Description" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // @ts-ignore
    await CategoriesController.createCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  // getCategory method should return a category with a 200 status code
  it("should return a category with a 200 status code when category is found", async () => {
    const req = { params: { id: "1" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // @ts-ignore
    await CategoriesController.getCategory(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  // getCategories method should return all categories with a 200 status code
  it("should return all categories with a 200 status code when categories are found", async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    // @ts-ignore
    await CategoriesController.getCategories(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  // updateCategory method should update a category and return it with a 200 status code
  it("should update a category and return it with a 200 status code when payload is valid", async () => {
    // Arrange
    const req = {
      params: { id: "testId" },
      body: { name: "Updated Category", description: "Updated Description" },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    categoryService.updateCategory = jest.fn().mockResolvedValue({
      id: "testId",
      name: "Updated Category",
      description: "Updated Description",
    });

    // Act
    // @ts-ignore
    await CategoriesController.updateCategory(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  // deleteCategory method should delete a category and return it with a 200 status code
  it("should delete a category and return it with a 200 status code when id is valid", async () => {
    // Arrange
    const req = { params: { id: "validId" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();
    categoryService.deleteCategory = jest.fn().mockResolvedValue(null);

    // Act
    // @ts-ignore
    await CategoriesController.deleteCategory(req, res, next);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
