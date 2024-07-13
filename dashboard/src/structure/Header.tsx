import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const Header: React.FC = () => {
  const { user, loading, error, dispatch } = useContext(AuthContext)

  const handleLogout = async () => {
    try{
      await axios.post('http://localhost:8800/api/auth/logout', {}, { withCredentials: true });
      dispatch({ type: 'LOGOUT', payload: null });
    }catch (err){
      console.error('Fehler beim Ausloggen:', err);
    }
  };

  return (
    
    <header>
      <nav>
        {!user && (
          <ul>
            <li><Link to="/anmelden">Anmelden</Link></li>
            <li><Link to="/registrieren">Registrieren</Link></li>
          </ul>)
        }
        {user && (
          <ul>
            <li><Link to="/home" >Startseite</Link></li>
            <li><Link to="/anmelden" onClick={handleLogout}>Logout</Link></li>
          </ul>)
        }
      </nav>
    </header>
  );
};

export default Header;
