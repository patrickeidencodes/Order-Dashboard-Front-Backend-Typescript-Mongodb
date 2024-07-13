import React from 'react';
import SignInForm from './sign_in/SignIn';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Structure from './structure/Structure';
import GlobalStyles from "./Global.jsx";
import SignUpForm from './sign_up/SignUp.js';
import UserPage from './user_page/UserPage.js';

const App: React.FC = () => {
  //const handleSignUp = (email: string, password: string) => {
  //  console.log('Signing up with', email, password);
    // Add your sign-up logic here, such as calling an API
  //};

  return (
    <BrowserRouter>
    <GlobalStyles></GlobalStyles>
      <Structure>
        <Routes>
          <Route path="/anmelden" element={<SignInForm/>}/>
          <Route path="/registrieren" element={<SignUpForm/>}/>
          <Route path="/home" element={<UserPage/>}/>
        </Routes>
      </Structure>
    </BrowserRouter>
  );
};

export default App;