import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

const Layout = ({ children }) => (
  <Grid textAlign="center">
    <Grid.Column style={{ maxWidth: 450, marginTop: '2rem' }}>
      {children}
    </Grid.Column>
  </Grid>
);

Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default Layout;
