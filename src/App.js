import React, { useEffect, useState } from "react";
import { Route , Switch } from "react-router-dom";
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard'
import CollegeDashboard from './Components/CollegeDashboard/CollegeDashboard'
import SignIn from './Components/SignIn/SignIn'
import Profile from './Components/Profile/Profile'
import Navbar from './Components/Navbar/Navbar';
import Search from './Components/Search/Search';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { getUser } from "./utils"
import { useHistory } from 'react-router-dom';

function App() {

  const [user, loading, error] = useAuthState(auth);
  const [loaded, setLoaded] = useState(false)
  const [type, setType] = useState('');
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) history.replace("/signin");
    else {
      getUser(user.email).then((value) => {
        if (value) {
          setType(value.type);
          setLoaded(true)
        }
      })
    }
  }, [user, loading]);

  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Switch>
        <Route path="/signin" component={SignIn}/>
        { loaded ?
          (<Route path="/dashboard" component={type == 'high-school' ? StudentDashboard : CollegeDashboard}/>) :
          (<></>)
        }
        <Route path="/college" component={CollegeDashboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/search" component={Search}/>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
