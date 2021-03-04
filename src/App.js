import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import Header from './Component/Header';
import Shop from './Component/Shop';
import Login from './Component/Login';
import Home from './Component/Home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRouter from './Component/PrivateRouter';
import LoginUser from './Component/LoginUser';

export const MyContext = React.createContext();

function App() {
  const [logInUser, setlogInUser] = useState({})
  return (
    <div className="App">
      <h1>Name:{logInUser.name}</h1>
      <h4>Email:{logInUser.email}</h4>
      <img src={logInUser.photo} alt=""/>
      
      <MyContext.Provider value={[logInUser,setlogInUser]}>
        <LoginUser />
          <Router>
              <Header login={logInUser.login} />
                  <Switch>
                    <PrivateRouter path="/shop">
                      <Shop />
                    </PrivateRouter>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                </Switch>
            </Router>
        </MyContext.Provider>
         
      </div>
  )
}

export default App;
