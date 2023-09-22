import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { NavbarProps } from '../types/types';

export const Navbar: React.FC<NavbarProps> = ({ showHomeButton }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="navbar">
            <span>{user?.username}</span>
            {showHomeButton && <button onClick={() => navigate('/home')}>Home</button>}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
