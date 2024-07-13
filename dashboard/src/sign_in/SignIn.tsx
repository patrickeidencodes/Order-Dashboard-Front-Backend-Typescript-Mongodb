import React, { useContext, useState } from 'react';
import '../styles/Form.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInForm = () => {
  const [credentials, setCredentials] = useState({
    cnr: undefined,
    password: undefined,
  })
  //
  const { user, loading, error, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleChange = (e:any) =>{
    setCredentials((prev)=>({...prev, [e.target.id]: e.target.value}));
    console.log(credentials)
  };

  const handleSubmit = async (event: React.FormEvent) => {
    console.log(credentials)
    event.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('http://localhost:8800/api/auth/login', credentials);
      console.log(res.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate("/home")
      console.log("succesfull")
    } catch (err: any) {
      const errorMessage = err.response ? err.response.data : 'Network error or server is not reachable';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      console.log("not succesfull")
    }
  };

  return (
    <>
      {user ? <h1>Du bist bereits eingeloggt!</h1> : 
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Kundennummer:</label>
            <input
              type="text"
              id="cnr"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Passwort:</label>
            <input
              type="password"
              id="password"
              onChange={handleChange}
              required
            />
          </div>
          <button disabled={loading} type="submit">Anmelden</button>
        </form>
      }
    </>
  );
};

export default SignInForm;
