import { Routes, Route } from "react-router-dom";
import About from "./pages/AboutPage";
import Home from "./pages/HomePage";
import Profile from "./pages/ProfilePage";
import SignIn from "./pages/SignInPage";
import SignUp from "./pages/SignUpPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import CreateListingPage from "./pages/CreateListingPage";
import ListingsPage from "./pages/ListingsPage";
import UpdateListingPage from "./pages/UpdateListingPage";
import ListingPage from "./pages/ListingPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/listing/:listingId' element={<ListingPage />} />
        <Route path='/search' element={<SearchPage />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/edit-listing/:listingId" element={<UpdateListingPage />} />
          <Route path="/listings" element={<ListingsPage />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
