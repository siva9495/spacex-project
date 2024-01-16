import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginActivity from './Login/LoginActivity'
import LanchesDashborad from './Dashboard/LanchesDashborad';
import firebase from './Firebase/firebase'
import LoadingPage from './Components/LoadingPage';

function App() {

  const [LoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
    })

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };

  }, []);



  return (
    <div className='App'>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Router basename="/spacex-project">
          <Switch>
            <Route exact path='/'>
              {LoggedIn ? <Redirect to="/dashboard" /> : <LoginActivity />}
            </Route>
            <Route path='/dashboard'>
              {LoggedIn ?  <LanchesDashborad /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  )
}

export default App
