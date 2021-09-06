import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/Home';
import RegisterComplete from './pages/auth/RegisterComplete';
import History from './pages/user/History';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authObserver } from './actions/auth';
import ForgotPassword from './pages/auth/ForgotPassword';
console.log('App outside');
const App = () => {
  //hooks
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    console.log('App inside useEffect');
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('App inside onAuthStateChanged');
      dispatch(authObserver(user, history));
    });
    return () => {
      console.log('unsubcribe');
      return unsubscribe();
    };
  }, []);
  //writing functions
  console.log('App inside');
  return (
    <>
      <ToastContainer />
      <Header />
      <Switch>
        {console.log('App inside return')}
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/register/complete' component={RegisterComplete} />
        <Route path='/forgot/password' component={ForgotPassword} />
        <Route path='/user/history' component={History} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
};

export default App;
