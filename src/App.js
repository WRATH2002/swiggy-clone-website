import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
// import About from "./components/About";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Menu from "./components/Menu";
import Help from "./components/Help";
import Account from "./components/Account";
import useOnline from "./utils/useOnline";
import Offline from "./utils/Offline";
import { lazy, Suspense } from "react";
import SkeletonUI from "./components/SkeletonUI";
import { Provider } from "react-redux";
import store from "./utils/store";
import NewCart from "./components/NewCart";

const AppLayout = () => {
  return !useOnline() ? (
    <Provider store={store}>
      <Header />
      <Offline />
    </Provider>
  ) : (
    <Provider store={store}>
      <Header />
      {/* <Body /> */}
      <Outlet />
      <Footer />
    </Provider>
  );
};

// Dynamic Loading
// Code Splitting
// Lazy loading
// Dynamic Import
const About = lazy(() => import("./components/About"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<SkeletonUI />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      // {
      //   path: "/cart",
      //   element: <Cart />,
      // },
      {
        path: "/newcart",
        element: <NewCart />,
      },
      // {
      //   path: "/instamart",
      //   element: <Instamart />,
      // },
      {
        path: "/restaurant/:id",
        element: <Menu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<AppLayout />);
root.render(<RouterProvider router={appRouter} />);
