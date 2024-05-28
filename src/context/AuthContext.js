import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth({
                isAuthenticated: true,
                user: JSON.parse(localStorage.getItem('user')),
                token: token
            });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post('http://localhost:5000/login', { username, password });
            const { access_token } = res.data;
            const user = { username };

            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            setAuth({
                isAuthenticated: true,
                user: user,
                token: access_token
            });
        } catch (err) {
            console.error(err);
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null
            });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
