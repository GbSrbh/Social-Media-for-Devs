import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/layout/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);//Add token in the headers
}

function App() {

  useEffect(() => {//This will run only once everytime app.js is updated
    store.dispatch(loadUser());
  }, []);

  return (
    <section className='container'>
      <Alert />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
      </Routes>
    </section>
  );
}

export default App;


