import Cart from "../components/cart/Cart";
import Main from "../components/home/Main";


interface Routes {
  path: string;
  component: React.ComponentType<any>;
}

export const publicRoutes: Routes[] = [
  { path: "/", component: Main },
  { path: "/cart", component: Cart }
];
