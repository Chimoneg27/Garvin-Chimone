import { Navigate } from "react-router";
import { userRole } from "../hooks/userRoleHook";

export default function ProtectedRoute({ children }) {
  const { role, loading } = userRole();

  if (loading) {
    return (
      <p className="flex items-center justify-center py-6 text-gray-700">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
        </span>
        Loading...
      </p>
    );
  }

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
