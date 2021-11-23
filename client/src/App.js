import './App.css';
import { React } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import RegisterScreen from './components/RegisterScreen'
import LoginScreen from './components/LoginScreen'
import HomeScreen from './components/HomeScreen'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'


function App() {
  return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    {/* <AppBanner /> */}
                    <Switch>
                        <Route path="/" exact component={SplashScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/home/" exact component={HomeScreen} />
                        {/* <Route path="/top5list/:id" exact component={WorkspaceScreen} /> */}
                    </Switch>
                    {/* <Statusbar /> */}
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    // <div className="App">
    //   <SplashScreen />
    // </div>
  );
}

export default App;
