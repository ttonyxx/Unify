import logo from './logo.svg';
import './App.css';
import StudentDashboard from './Components/StudentDashboard'
import SignIn from './Components/SignIn'
import { Route , Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/dashboard" component={StudentDashboard}/>
        </Switch>
    </div>
  );
}

export default App;
