import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRouteLayout } from "./navigation/ProtectedRouteLayout";
import { UnprotectedRouteLayout } from "./navigation/UnProtectedRouteLayout";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import ResumeBuilder from "./components/resume/Resume";
import NotFound from "./components/NotFound/index";
function App() {
  return (
    <div
      style={{
        width: "100%",
        overflow: "auto",
        overflowY: "auto",
        position: "relative",
      }}
    >
      <Routes>
        <Route element={<ProtectedRouteLayout />}>
          <Route element={<Home />} path="/" />
          <Route element={<ResumeBuilder />} path="/profile" />
        </Route>
        <Route element={<UnprotectedRouteLayout />}>
          <Route element={<Login />} path="/login" />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
