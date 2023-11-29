import { AuthRoutes } from "../modules/auth/routes/auth.route";
import { CategoryRoutes } from "../modules/categories/routes/categories.route";
import { ProductRoutes } from "../modules/products/routes/product.route";
import { ReviewRoutes } from "../modules/reviews/routes/review.route";
import { UsersRoutes } from "../modules/users/routes/users.route";


const routes = [
  {
    path: "/auth",
    router: AuthRoutes,
  },
  {
    path: "/users",
    router: UsersRoutes,
  },
  {
    path: "/categories",
    router: CategoryRoutes,
  },
  {
    path: "/products",
    router: ProductRoutes,
  },
  {
    path: "/reviews",
    router: ReviewRoutes,
  },
];

const prefix = "/api/v1";

export const appRoutes = (app: any) =>
  routes.map((route) =>
    app.use(prefix + route.path, route.router)
  );
