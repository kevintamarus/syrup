import React from 'react';
import NavBarLogin from './NavBarLogin';
import HomePage from './HomePage';

const LandingPage = ({auth}) => {
  
  return (
    <div>
      <NavBarLogin auth={auth}/>
    </div>
  );
};

export default LandingPage;