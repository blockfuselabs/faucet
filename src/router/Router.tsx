import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// LAYOUTS
import RootLayout from "../layout/RootLayout";

// pages
import Home from "../page/home/Home";
import Facet from "../page/faucet/Faucet";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/faucet" element={<Facet />} />

      {/* <Route path="*" element={<h1>404</h1>} /> */}
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
