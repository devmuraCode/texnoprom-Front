import { RouterProvider } from "react-router-dom";
import { router } from "./config/routerConfig/router";

const App = () => {
  return <RouterProvider router={router} />;
}

export default App