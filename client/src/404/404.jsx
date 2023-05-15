import React from 'react';
import { Link } from 'react-router-dom';
import "./404.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">Oops! Page Not Found</h1>
      <p className="not-found-text">
        It looks like the page you're looking for doesn't exist. Please check the URL or click the button below to go back to the homepage.
      </p>
      <Link to="/" className="not-found-link">Go Back to Homepage</Link>
    </div>
  );
}

export default NotFound;
