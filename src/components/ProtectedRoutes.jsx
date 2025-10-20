import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../auth/AuthProvider";
import { supabase } from "../lib/supabase";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, initialized } = useAuth();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching role:', error);
          setRole(null);
        } else {
          console.log('Fetched role:', data?.role);
          setRole(data?.role || null);
        }
      } catch (err) {
        console.error('Catch error:', err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    if (initialized) {
      fetchRole();
    }
  }, [user, initialized]);

  if (!initialized || loading) {
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

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (role !== requiredRole) {
    console.log(`Access denied. Role: ${role}, Required: ${requiredRole}`);
    return <Navigate to="/" replace />;
  }

  return children;
}