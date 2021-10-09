import React from 'react';
import { Route , Switch } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import StudentDashboard from './Components/StudentDashboard/StudentDashboard'
import CollegeDashboard from './Components/CollegeDashboard/CollegeDashboard'
import SignIn from './Components/SignIn/SignIn'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <header className="App-header">
        Unify
      </header>
      <Switch>
        <Route path="/signin" component={SignIn}/>
        <Route path="/dashboard" component={StudentDashboard}/>
        <Route path="/college" component={CollegeDashboard}/>
      </Switch>
    </ChakraProvider>
  );
}

export default App;
