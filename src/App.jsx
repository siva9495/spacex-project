import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginActivity from './Login/LoginActivity'
import LanchesDashborad from './Dashboard/LanchesDashborad';
import firebase from './Firebase/firebase'

function App() {

  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(true);
      }else{
        setLoggedIn(false);
      }
    })

    return () => {
      unsubscribe();
    };

  }, []);



  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            {LoggedIn ? <Redirect to="/dashboard" /> : <LoginActivity />}
          </Route>
          <Route path='/dashboard'>
            {LoggedIn ?  <LanchesDashborad /> : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
