import React from 'react';
import NavBar from './nav_bar/nav_bar_container';


const App = ({ children }) => (
  <div>
    <h1>TimeJoy</h1>
    <NavBar />
    { children }

    // calendar component
      // children
    // map component
  </div>
);

export default App;
