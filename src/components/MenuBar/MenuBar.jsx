import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import styles from './MenuBar.module.scss';

const MenuBar = () => (
  <Menu
    text
    size="huge"
    className={styles.menubar}
  >
    <Menu.Item
      className={styles.title}
      as={NavLink}
      to="/templates"
    >
      Vehicle Search
    </Menu.Item>
    <Menu.Item
      className={styles.logout}
      as={NavLink}
      to="/auth"
    >
      Logout
    </Menu.Item>
  </Menu>
);

export default MenuBar;
