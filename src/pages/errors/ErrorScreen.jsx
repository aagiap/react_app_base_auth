import React from 'react';

const ErrorScreen = ({ statusCode = 500, title, message }) => {

    // Thiết lập thông báo mặc định dựa trên mã trạng thái
    let defaultTitle = 'An Unexpected Error Occurred';
    let defaultMessage = 'We are working to fix the problem. Please try again later.';

    if (statusCode === 401) {
        defaultTitle = '401 - Unauthorized Access';
        defaultMessage = 'You do not have permission to access this resource. Please log in again.';
    } else if (statusCode === 500) {
        defaultTitle = '500 - Internal Server Error';
        defaultMessage = 'Our servers are experiencing a problem. Please wait a moment and refresh the page.';
    } else if (statusCode === 400) {
        defaultTitle = '400 - Bad Request';
        defaultMessage = 'The request could not be understood by the server due to malformed syntax.';
    }

    return (
        <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '80px', color: '#dc3545', margin: '0' }}>{statusCode}</h1>
            <h2 style={{ fontSize: '32px', color: '#343a40', marginTop: '10px' }}>{title || defaultTitle}</h2>
            <p style={{ fontSize: '18px', color: '#6c757d', marginTop: '20px' }}>
                {message || defaultMessage}
            </p>

            {/* Nút Refresh hoặc Home */}
            <button
                onClick={() => window.location.reload()}
                style={{
                    marginTop: '30px',
                    padding: '10px 20px',
                    backgroundColor: '#ffc107',
                    color: '#212529',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Refresh Page
            </button>
        </div>
    );
};

export default ErrorScreen;