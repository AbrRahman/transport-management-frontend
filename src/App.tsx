import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes/AppRoutes";
const queryClient = new QueryClient();
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
