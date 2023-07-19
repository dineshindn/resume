import React from 'react';
import { useLocation } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="not-found">
      <h1 className="not-found-title">404 - Page Not Found</h1>
      <p className="not-found-text">
        The requested page '<span className="not-found-path">{location.pathname}</span>' does not exist.
      </p>
    </div>
  );
};

export default NotFound;
