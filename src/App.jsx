import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import AuthPage from './pages/AuthPage';
import ModelPage from './pages/ModelPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import GuestRoute from './components/GuestRoute';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/brands/:brandId" element={<BrandPage />} />
        <Route
          path="/brands/:brandId/models/:modelId"
          element={<ModelPage />}
        />

        {/* 2. Обертаємо /auth у GuestRoute */}
        <Route
          path="/auth"
          element={
            <GuestRoute>
              <AuthPage />
            </GuestRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
