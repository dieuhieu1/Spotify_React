import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Account from "./pages/Account";

import AppLayout from "./UI/AppLayout";
import Search from "./features/main/search/Search";
import SearchResult from "./features/main/search/SearchResult";
import Album from "./features/main/albums/album";
import Track from "./features/main/track/Track";
import Playlist from "./features/main/playlists/Playlist";
import Artist from "./features/main/Artists/Artist";
import PageNotFound from "./UI/PageNotFound";
import { Toaster } from "react-hot-toast";
import Premium from "./features/account/Premium";
import Profile from "./features/account/Profile";
import EmptyPlaylist from "./features/main/playlists/EmptyPlaylist";
import ForgotPassword from "./features/auth/forgot-password/ForgotPassword";
import VerifyCodePage from "./features/auth/forgot-password/VerifyCodePage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { path: "", element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "search/searchQuery", element: <SearchResult /> },

      { path: "album/:albumId", element: <Album /> },
      { path: "track/:trackId", element: <Track /> },
      { path: "playlist/:playlistId", element: <Playlist /> },
      { path: "playlist/", element: <EmptyPlaylist /> },
      { path: "artist/:artistId", element: <Artist /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/verify",
    element: <VerifyCodePage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/admin",
    element: <Admin />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/account",
    element: <Account />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/premium",
    element: <Premium />,
    errorElement: <PageNotFound />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </React.StrictMode>
  );
}

export default App;
