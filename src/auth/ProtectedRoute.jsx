import { Navigate } from "react-router";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { activeUser } = useAuth();
  if (!activeUser) return <Navigate to="/" replace />;

  return <>{children}</>;
}
