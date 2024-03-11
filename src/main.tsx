import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Root.tsx";
import { CartProvider } from "react-use-cart";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </CartProvider>
);
