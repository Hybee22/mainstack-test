import { CategoryService } from "./categories.service";
import { ProductService } from "../../products/services/product.service";

jest.mock("../../products/services/product.service");

describe("CategoryService", () => {
  // create a category with valid name and description
  it("should create a category with valid name and description", async () => {
    const mockCategoryRepository = {
      create: jest.fn().mockResolvedValue({
        name: "Test Category",
        description: "Test Description",
      }),
    };
    //@ts-ignore
    const categoryService = new CategoryService(mockCategoryRepository);

    const createCategoryDto = {
      name: "Test Category",
      description: "Test Description",
    };
    const result = await categoryService.createCategory(createCategoryDto);

    expect(mockCategoryRepository.create).toHaveBeenCalledWith(
      createCategoryDto
    );
    expect(result).toEqual({
      name: "Test Category",
      description: "Test Description",
    });
  });

  // get all categories
  it("should get all categories", async () => {
    const mockCategories = [
      { name: "Category 1", description: "Description 1" },
      { name: "Category 2", description: "Description 2" },
    ];
    const mockCategoryRepository = {
      find: jest.fn().mockResolvedValue(mockCategories),
    };
    //@ts-ignore
    const categoryService = new CategoryService(mockCategoryRepository);

    const result = await categoryService.getCategories();

    expect(mockCategoryRepository.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockCategories);
  });

  // update a category with valid id and data
  it("should update a category with valid id and data", async () => {
    const mockUpdatedCategory = {
      name: "Updated Category",
      description: "Updated Description",
    };
    const mockCategoryRepository = {
      findByIdAndUpdate: jest.fn().mockResolvedValue(mockUpdatedCategory),
    };
    //@ts-ignore
    const categoryService = new CategoryService(mockCategoryRepository);

    const categoryId = "123";
    const updateData = {
      name: "Updated Category",
      description: "Updated Description",
    };
    const result = await categoryService.updateCategory(categoryId, updateData);

    expect(mockCategoryRepository.findByIdAndUpdate).toHaveBeenCalledWith(
      categoryId,
      updateData,
      { new: true }
    );
    expect(result).toEqual(mockUpdatedCategory);
  });

  // create a category with empty description
  it("should create a category with empty description", async () => {
    const mockCategoryRepository = {
      create: jest
        .fn()
        .mockResolvedValue({ name: "Test Category", description: "" }),
    };
    //@ts-ignore
    const categoryService = new CategoryService(mockCategoryRepository);

    const createCategoryDto = { name: "Test Category", description: "" };
    const result = await categoryService.createCategory(createCategoryDto);

    expect(mockCategoryRepository.create).toHaveBeenCalledWith(
      createCategoryDto
    );
    expect(result).toEqual({ name: "Test Category", description: "" });
  });

  // Deletes a category successfully when no products are assigned to it
  it("should delete category when no products are assigned to it", async () => {
    // Arrange
    const categoryId = "validCategoryId";
    const products = [{ name: "Product 1", category: "validCategoryId" }];

    const mockCategoryRepository = {
      findByIdAndDelete: jest.fn().mockResolvedValue({}),
    };

    const mockProductRepository = {
      find: jest.fn().mockResolvedValue(products),
    };
    //@ts-ignore
    const categoryService = new CategoryService(mockCategoryRepository);
    //@ts-ignore
    const productService = new ProductService(mockProductRepository);

    productService.getProductsByCategory = jest
      .fn()
      .mockResolvedValue([]);
    // Act
    const result = await categoryService.deleteCategory(categoryId);

    // Assert
    expect(result).toBeDefined();
  });

  // Should return a category object when given a valid category id
  it("should return a category object when given a valid category id", async () => {
    const categoryId = "validCategoryId";
    const category = { name: "Test Category", description: "Test Description" };
    const categoryRepository = {
      findById: jest.fn().mockResolvedValue(category),
    };
    // @ts-ignore
    const categoryService = new CategoryService(categoryRepository);

    const result = await categoryService.getCategoryById(categoryId);

    expect(result).toEqual(category);
    expect(categoryRepository.findById).toHaveBeenCalledWith(categoryId);
  });
});
