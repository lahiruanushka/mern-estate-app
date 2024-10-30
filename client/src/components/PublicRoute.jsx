import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export function PublicRoute() {
  const { currentUser, loading  } = useSelector((state) => state.user);
  
  // Show loading spinner while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is authenticated, redirect to home page
  return currentUser ? <Navigate to="/" replace /> : <Outlet />;
}
