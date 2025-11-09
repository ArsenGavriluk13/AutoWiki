import { Navigate } from 'react-router-dom';

const useAuthStatus = () => {
  const isLoggedIn = true;

  return { isLoggedIn };
};
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStatus();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
