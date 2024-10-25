import { Routes, Route } from "react-router-dom";
import About from "./pages/AboutPage";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}
