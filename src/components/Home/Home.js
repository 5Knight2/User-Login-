import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';



const Home = (props) => {
  const ctxAuth=useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
     <Button onClick={ctxAuth.onLogout}>LogOut</Button>
    </Card>
  );
};

export default Home;
