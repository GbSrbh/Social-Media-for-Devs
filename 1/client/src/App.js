import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from './components/layout/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddEducation from './components/profile-forms/AddEducation';
import AddExperience from './components/profile-forms/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/Profile/Profile';
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
        <Route exact path='/create-profile' element={<PrivateRoute> <CreateProfile /> </PrivateRoute>} />
        <Route exact path='/edit-profile' element={<PrivateRoute> <EditProfile /> </PrivateRoute>} />
        <Route exact path='/add-education' element={<PrivateRoute> <AddEducation /> </PrivateRoute>} />
        <Route exact path='/add-experience' element={<PrivateRoute> <AddExperience /> </PrivateRoute>} />
        <Route exact path='/profiles' element={<Profiles />} />
        <Route exact path='/profile/:id' element={<Profile />} />
      </Routes>
    </section>
  );
}

export default App;


