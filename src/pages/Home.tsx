import React, { useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import UsersTable from '../components/UsersTable';
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles(() =>
  createStyles({
    paper: {
      width: 400,
      height: 400,
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
);

function Home() {
  const styles = useStyles();
  const {
    state: { isLoading, error },
  } = useContext(UserContext);

  if (isLoading) {
    return <CircularProgress className={styles.paper} />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <UsersTable />;
}

export default Home;
