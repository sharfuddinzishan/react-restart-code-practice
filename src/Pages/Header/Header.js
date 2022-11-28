import React from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    return (
        <div>
            <h2>Header</h2>
            <Link to="/">All Infos</Link>
            <Link to="/add/info">Add Info</Link>
            <Link to="/update/info/">Update Info</Link>
        </div>
    );
};

export default Header;