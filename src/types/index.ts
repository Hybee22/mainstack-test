export type LoginUserType = {
  email: string;
  password: string;
};

export type RegisterUserType = {
  name: string;
  email: string;
  password: string;
};

export type CreateProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export type UpdateProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export type CreateCategoryType = {
  name: string;
  description: string;
}

export type CreateReviewType = {
  description: string;
  user: string;
  product: string;
}