import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './view/layouts/AuthContext';
import PrivateRoute from './view/layouts/PrivateRoute';

import Login from './view/login/Login';
import CriarConta from './view/login/CriarConta';
import Index from './view/layouts/main/Index';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/criarConta" element={<CriarConta />} />
          <Route path="/main/*" element={<PrivateRoute component={Index} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
