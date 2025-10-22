import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {

    return (
        <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '100px', color: '#dc3545', margin: '0' }}>401</h1>
            <h2 style={{ fontSize: '36px', color: '#343a40', marginTop: '10px' }}>Unauthorized Access</h2>
            <p style={{ fontSize: '18px', color: '#6c757d', marginTop: '20px' }}>
                You do not have the necessary permissions to view this page, or your session has expired.
            </p>
            <Link
                to="/"
                style={{
                    display: 'inline-block',
                    marginTop: '30px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}
            >
                Go to Homepage
            </Link>
        </div>
    );
};

export default Unauthorized;
