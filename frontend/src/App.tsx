import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import SeedStage from './pages/stages/SeedStage';
import SproutStage from './pages/stages/SproutStage';
import GrowthStage from './pages/stages/GrowthStage';
import FlowerStage from './pages/stages/FlowerStage';
import FruitStage from './pages/stages/FruitStage';
import HarvestStage from './pages/stages/HarvestStage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="stages/seed" element={<SeedStage />} />
            <Route path="stages/sprout" element={<SproutStage />} />
            <Route path="stages/growth" element={<GrowthStage />} />
            <Route path="stages/flower" element={<FlowerStage />} />
            <Route path="stages/fruit" element={<FruitStage />} />
            <Route path="stages/harvest" element={<HarvestStage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
