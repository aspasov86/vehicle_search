import React, { useEffect } from 'react';
import axios from 'axios';
import { SemanticToastContainer } from 'react-semantic-toasts';
import { useDispatch } from 'react-redux';
import Router from './AppRouter';
import useToast from './hooks/Toast';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const App = () => {
  const sendToast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => {
        if (response.status === 201) sendToast('success');
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          dispatch({ type: 'LOGOUT' });
          sendToast('Invalid credentials');
        } else {
          sendToast('error');
        }
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Router />
      <SemanticToastContainer position="bottom-left" />
    </div>
  );
};

export default App;
