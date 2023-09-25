import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavbarProps } from '../types/types';
import "../styles/navbar.scss";

export const Navbar: React.FC<NavbarProps> = ({ showHomeButton }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar-container">
            <span className="navbar-container__username">{user?.name}</span>
            {showHomeButton && <button className="navbar-container__homepage-button" onClick={() => navigate('/home')}>Home</button>}
            <button className="navbar-container__logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
}
