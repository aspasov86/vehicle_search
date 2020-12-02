import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
  const token = useSelector(state => state.token);
  if (token) {
    return <Route {...props} />;
  }
  return <Redirect to="/auth" />;
};

export default ProtectedRoute;
