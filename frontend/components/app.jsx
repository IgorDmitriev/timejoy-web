import React from 'react';
import NavBar from './nav_bar/nav_bar_container';


const App = ({ children }) => (
  <div>
    <h1>TimeJoy</h1>
    <NavBar />
    { children }
  </div>
);

export default App;
