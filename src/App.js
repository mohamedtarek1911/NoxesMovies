import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import Home from "./Components/HOME/Home";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import People from "./Components/People/People";
import About from "./Components/About/About";
import NotFound from "./Components/NotFound/NotFound";
import RootLayout from "./Layouts/RootLyout/RootLayout";
import Network from "./Components/Network/Network";
import Details from "./Components/Details/Details";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import PerDetails from "./Components/PerDetails/PerDetails";

function ProtectedRootes(props) {
  let key = localStorage.getItem("key");
  if (!key) {
    return <Navigate to="/SignIn" />;
  } else {
    return props.children;
  }
}

let routes = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Home",
        element: <Home />,
      },
      {
        path: "Movies",
        element: <Movies />,
      },
      {
        path: "Tv",
        element: <Tv />,
      },
      {
        path: "People",
        element: <People />,
      },
      {
        path: "About",
        element: <About />,
      },
      {
        path: "Network",
        element: <Network />,
      },
      {
        path: "Datails/:id/:media",
        element: <Details />,
      },
      {
        path: "PerDatails/:id/:media",
        element: <PerDetails />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "SignIn", element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
