import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function PrivateRoute() {
  const { currentUser, loading  } = useSelector((state) => state.user);
  
   // Show loading spinner while checking auth state
   if (loading) {
    return <LoadingSpinner />;
  }

  // If user is not authenticated, redirect to sign in page
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
}
