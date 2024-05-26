import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import RoomDetailPage from "./pages/roomDetail";
import AdminDashboardPage from "./pages/admin";

const App = () => {
  return (
    <Fragment>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/room/:id"
          element={<RoomDetailPage />}
        />
        <Route
          path="/admin"
          element={<AdminDashboardPage />}
        />
      </Routes>
    </Fragment>
  );
};

export default App;
