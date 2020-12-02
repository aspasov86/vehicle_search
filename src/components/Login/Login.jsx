import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import useInput from '../../hooks/Input';
import { loginUser } from '../../services/services';

const Login = ({ history }) => {
  const [email, emailChangeHandler] = useInput();
  const [password, passwordChangeHandler] = useInput();
  const [loggingIn, setLoggingIn] = useState(false);
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'CHECK_IF_LOGGED_IN' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) history.push('/search');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const onLogin = async () => {
    setLoggingIn(true);
    const res = await loginUser(email, password);
    if (get(res, 'data.auth_token')) dispatch({ type: 'LOGIN', payload: res.data.auth_token });
    setLoggingIn(false);
  };

  return (
    <Form size="large">
      <Segment stacked>
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          value={email}
          onChange={emailChangeHandler}
        />
        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
        />

        <Button
          primary
          fluid
          size="large"
          onClick={onLogin}
          loading={loggingIn}
        >
          Login
        </Button>
      </Segment>
    </Form>
  );
};

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired
};

export default Login;
