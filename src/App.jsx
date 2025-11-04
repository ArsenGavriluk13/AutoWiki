import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';

import BrandPage from './pages/BrandPage';

import AuthPage from './pages/AuthPage';

import ModelPage from './pages/ModelPage';

// import Header from './components/Header'; // Header тепер буде всередині сторінок або тут

// import './App.css'; // Якщо App.css порожній, можна видалити

function App() {
  return (
    <div>
      {/* Можна розмістити Header тут, якщо він спільний для ВСІХ сторінок */}

      {/* <Header /> */}

      <Routes>
        {/* Головна сторінка */}

        <Route path="/" element={<HomePage />} />

        {/* Сторінка бренду (з динамічним параметром :brandId) */}

        <Route path="/brands/:brandId" element={<BrandPage />} />

        {/* Сторінка моделі (з параметрами :brandId та :modelId) */}

        <Route
          path="/brands/:brandId/models/:modelId"
          element={<ModelPage />}
        />

        {/* Сторінка авторизації */}

        <Route path="/auth" element={<AuthPage />} />

        {/* Маршрут для неіснуючих сторінок (404) - опціонально */}

        <Route path="*" element={<div>Сторінка не знайдена (404)</div>} />
      </Routes>

      {/* Можна додати спільний Footer тут, якщо він є */}
    </div>
  );
}

export default App;
