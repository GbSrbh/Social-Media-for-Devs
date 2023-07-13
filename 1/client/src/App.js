import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

//Redux
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/layout/Alert';

function App() {
  return (
    //Wrap everyhting inside provider
    <Provider store={store}>
      <section className='container'>
        <Alert />
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </section>
    </Provider>
  );
}

export default App;
