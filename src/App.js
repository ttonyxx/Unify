import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <router>
      <div>
        <Nav/>

        <Route path="/signin" component={SignIn}/>
        <Route path="/dashboard" component={StudentDashboard}/>
        
      </div>
    </router>
  );
}

export default App;
