import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import Inicio from './pages/inicio';
import Calculadora from './pages/calculadora';
import Acerca from './pages/acerca';
import Equipo from './pages/equipo';
import Login from './pages/login';
import Registro from './pages/registro';
import { getCurrentUser } from './services/auth-service';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const loggedInUser = getCurrentUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Si NO hay usuario, solo mostramos las rutas de Autenticación sin el Layout */}
        {!user ? (
          <>
            <Route path="/login" element={<Login setAuth={setUser} />} />
            <Route path="/registro" element={<Registro />} />
            {/* Cualquier otra ruta redirige al login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* Si SÍ hay usuario, envolvemos las rutas con el Layout (Header y Footer) */
          <Route element={<Layout user={user} setAuth={setUser}><OutletWrapper /></Layout>}>
            <Route path="/" element={<Inicio />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/acerca" element={<Acerca />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
}

// Un pequeño componente auxiliar para poder usar Layout con Outlet adentro.
import { Outlet } from 'react-router-dom';
const OutletWrapper = () => <Outlet />;

export default App;
