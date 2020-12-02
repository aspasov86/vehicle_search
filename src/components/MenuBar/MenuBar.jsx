import React from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu/Menu';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './MenuBar.module.scss';

const MenuBar = () => {
  const history = useHistory();
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const onLogout = async () => {
    await dispatch({ type: 'LOGOUT' });
    history.push('/auth');
  };
  return (
    <Menu
      text
      size="huge"
      className={styles.menubar}
    >
      <Menu.Item
        className={styles.title}
        as={NavLink}
        to="/search"
      >
        Vehicle Search
      </Menu.Item>
      {token && (
        <Menu.Item
          className={styles.logout}
          onClick={onLogout}
        >
          <Icon name="log out" size="large" />
        </Menu.Item>
      )}
    </Menu>
  );
};

export default MenuBar;
