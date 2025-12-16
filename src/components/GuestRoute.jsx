import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const GuestRoute = ({ children }) => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
