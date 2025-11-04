import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

import BrandPage from './pages/BrandPage';

import AuthPage from './pages/AuthPage';

import ModelPage from './pages/ModelPage';


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


        <Route path="/auth" element={<AuthPage />} />


        <Route path="*" element={<div>Сторінка не знайдена (404)</div>} />
      </Routes>

    </div>
  );
}

export default App;
