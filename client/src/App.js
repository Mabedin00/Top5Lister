import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'


function App() {
  return (
    <div className="App">
      <SplashScreen />
    </div>
  );
}

export default App;
