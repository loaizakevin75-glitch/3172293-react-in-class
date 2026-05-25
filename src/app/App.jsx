import { RouterProvider } from "react-router-dom";
import router from "@/app/router";

export default function app() {
  return <RouterProvider router={router} />;
}