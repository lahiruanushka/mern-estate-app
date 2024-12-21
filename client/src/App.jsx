import { Routes, Route } from "react-router-dom";
import { PublicRoute } from "./components/PublicRoute";
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
import SearchPage from "./pages/SearchPage";
import SingleListingPage from "./pages/SingleListingPage";
import AutoScrollToTop from "./components/AutoScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import MaintenanceMessage from "./components/MaintenanceMessage";
import Footer from "./components/Footer";

export default function App() {
  const isMaintenanceMode = import.meta.env.VITE_MAINTENANCE_MODE === "true";

  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/listing/:listingId" element={<SingleListingPage />} />
        <Route path="/search" element={<SearchPage />} />

        {/* Authentication Routes - Protected from authenticated users */}
        <Route element={<PublicRoute />}>
          <Route
            path="/sign-in"
            element={isMaintenanceMode ? <MaintenanceMessage /> : <SignIn />}
          />
          <Route
            path="/sign-up"
            element={isMaintenanceMode ? <MaintenanceMessage /> : <SignUp />}
          />
        </Route>

        {/* Private Routes - Protected from unauthenticated users */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route
            path="/edit-listing/:listingId"
            element={<UpdateListingPage />}
          />
          <Route path="/listings" element={<ListingsPage />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <AutoScrollToTop />
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
