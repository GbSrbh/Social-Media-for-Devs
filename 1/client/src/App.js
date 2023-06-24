import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { Route, Routes } from 'react-router-dom';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
