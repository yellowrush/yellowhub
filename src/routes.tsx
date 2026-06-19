import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Games from "./pages/Games";
import GamePlayer from "./pages/GamePlayer";
import LoadingDemo from "./pages/LoadingDemo";

const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "games",
        element: <Games />,
      },
      {
        path: "games/:gameId",
        element: <GamePlayer />,
      },
      {
        path: "loading-demo",
        element: <LoadingDemo />,
      },
    ],
  },
];

export default routes;
