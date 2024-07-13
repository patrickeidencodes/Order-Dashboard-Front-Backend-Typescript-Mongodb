import React, { useContext, useState } from 'react';
import '../styles/Form.css';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const [credentials, setCredentials] = useState({
    knr: undefined,
    password: undefined,
  })

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
      const res = await axios.put('http://localhost:8800/api/auth/setpassword', credentials);
      console.log(res.data)
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      navigate("/home")
    } catch (err: any) {
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Network error or server is not reachable';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
    }
  };

  return (
    <div>
        <h1>Registriere dich mit deiner Kundennummer und einem Passwort</h1>
        {error && <div style={{ textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="text">Kundennummer:</label>
            <input
            type="text"
            id="knr"
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
        <button type="submit">Registrieren</button>
        </form>
    </div>
  );
};

export default SignUpForm;
