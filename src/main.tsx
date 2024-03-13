import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./Root.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  </Provider>
);
