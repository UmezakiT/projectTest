import React, { Component } from 'react';
import { Route, Redirect  } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Header, LoadingIndicator, LoginPage, SignupPage, DashboardPage, RecentPage, 
  SettingPage, UploadPage, LocationPage } from '.';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    suppressDeprecationWarnings: true
  }
});

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => localStorage.getItem("token") === ""? (<Redirect to='/login' />)
    : (<Component {...props} />)} />
);


class App extends Component {
 
  render() {
      return (
        <MuiThemeProvider theme={theme}>
          <div className='app'>
            <Header/>
            <div className='main-content'>
              <PrivateRoute exact path='/' component={DashboardPage}/>
              <Route exact path='/login' component={LoginPage}/>
              <Route exact path='/signup' component={SignupPage}/>                  
              <PrivateRoute exact path='/dashboard' component={DashboardPage}/>
              <PrivateRoute exact path='/setting' component={SettingPage}/>
              <PrivateRoute exact path='/recent' component={RecentPage}/>
              <PrivateRoute exact path='/upload' component={UploadPage}/>
              <PrivateRoute exact path='/location/:locationID' component={LocationPage}/>
              
            </div>
            <LoadingIndicator/>
        </div>
      </MuiThemeProvider>
      );
  }
}

export default App;
