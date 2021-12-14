import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import App from "./App";

const queryClient = new QueryClient();

(async () => {
  if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    const { worker } = await import("./mocks/browser");
    worker.start();
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
