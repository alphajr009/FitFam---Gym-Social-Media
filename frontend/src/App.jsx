import React from "react";
import Login from "./pages/User/Login";
import Signin from "./pages/User/Signin";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Meal from "./pages/Meal/Meal";
import Media from "./pages/Media/Media";
import Workout from "./pages/Workouts/Workout";
import Account from "./pages/User/Account";

const AdminRouteGuard = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("currentUser"));

  if (admin && admin.isInstructor) {
    return children;
  } else {
    return <Navigate to="/admin-login" />;
  }
};
//User RouteGuard
const UserRouteGuard = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserRouteGuard>
                <Layout />
              </UserRouteGuard>
            }
          >
            <Route index element={<Media />} />
          </Route>

          <Route
            path="/meal"
            element={
              <UserRouteGuard>
                <Layout />
              </UserRouteGuard>
            }
          >
            <Route index element={<Meal />} />
          </Route>

          <Route
            path="/feed"
            element={
              <UserRouteGuard>
                <Layout />
              </UserRouteGuard>
            }
          >
            <Route index element={<Media />} />
          </Route>

          <Route
            path="/workouts"
            element={
              <UserRouteGuard>
                <Layout />
              </UserRouteGuard>
            }
          >
            <Route index element={<Workout />} />
          </Route>

          <Route
            path="/account"
            element={
              <UserRouteGuard>
                <Layout />
              </UserRouteGuard>
            }
          >
            <Route index element={<Account />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
