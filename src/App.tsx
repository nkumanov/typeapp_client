import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route,Switch } from 'react-router-dom'

import MainContent from '../src/components/MainContent'
import Header from './components/Header';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
      
      <Header/>
      
      <Switch>
        <Route exact path='/'>
          <MainContent></MainContent>
        </Route>
        <Route path='/about'>
          <About></About>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/register'>
          <Register></Register>
        </Route>
        <Route path='/blog/:blogId'>
          <Detail></Detail>
        </Route>
      </Switch>

    </BrowserRouter>



  );
}

export default App;
