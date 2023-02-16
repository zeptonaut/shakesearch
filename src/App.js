import Search, { loader as searchLoader } from "/src/routes/Search";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
    errorElement: <Search />,
    loader: searchLoader,
  },
  {
    path: "/:query",
    element: <Search />,
    errorElement: <Search />,
  },
]);

const App = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
