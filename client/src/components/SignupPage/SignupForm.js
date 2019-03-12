import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Globals from '../../utils/globals'
import superagent from 'superagent';
import Snackbar from '@material-ui/core/Snackbar';

const styles =  {
    root: {
      padding: 40,
      textAlign: 'center'
    },
    margin_left : {
        marginLeft: 50
    },
    alert: {
      color : '#880000',
      backgroundColor: 'rgba(206, 17, 38, 0.05)'
    }
};

export default class SignupForm extends React.Component{

    constructor() {
      super()

      this.state = {
        latitude: '',
        longitude: '',
        firstName : '',
        lastName : '',
        username : '',
        password : '',
        is_empty: false,
        fail: false,
        open: false,
        empty_location: false
      }

      this.getMyLocation = this.getMyLocation.bind(this)
      this.handleClose = this.handleClose.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.goLoginForm = this.goLoginForm.bind(this);
      
    }


    componentDidMount() {
      this.getMyLocation()
    }

    handleClose() {
      this.setState({
        is_empty: false,
        fail: false,
        open: false,
        empty_location: false
      })
    }

    getMyLocation() {
      const location = window.navigator && window.navigator.geolocation
      
      if (location) {
        location.getCurrentPosition((position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        }, (error) => {
          this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        })
      }

    }

    handleFormSubmit = (e) => { // called when user click signup button

        if (this.state.username.trim() === '' || this.state.password === '' || this.state.firstName==='' || this.state.lastName === '') {
            this.setState({is_empty: true});
            return;
        }

        if (this.state.latitude === 'err-latitude') {
          this.setState({empty_location: true});
          return;
        }     
    
        let url = Globals.instance().baseUrl + '/users/register';
            superagent
            .post(url)
            .send(this.state)
            .end((err, res) => {
              
              if(err){
                this.setState({fail: true})
                return;
              }

              Globals.hideLoadingIndicator();
              this.setState({open: true})
              setTimeout(() => {
                window.location.href = "/login";
              }, 1000);
              
            });
        }



    handleInputChange = (e) => { // update state from input
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    goLoginForm = () => {
        window.location.href = '/';
    }
    


    render(){
     return(
     <div>
      <Paper style={styles.root} elevation={1}>

        <h1 style={{color: '#3f51b5'}}>SIGN UP</h1>
        
        <TextField
          label="FirstName"
          margin="dense"
          name='firstName'
          value={this.state.firstName}
          onChange={this.handleInputChange}
        />

         <TextField
          label="LastName"
          margin="dense"
          style={styles.margin_left}
          name = 'lastName'
          value = {this.state.lastName}
          onChange={this.handleInputChange}

        />

       <br/> 
       
        <TextField
          label="Email"
          type="email"
          margin="dense"
          name='username'
          value = {this.state.username}
          onChange={this.handleInputChange}

        />

         <TextField
          label="Password"
          type="password"
          margin="dense"
          name='password'
          value = {this.state.password}
          onChange={this.handleInputChange}
          style={styles.margin_left}
        />
       
       <br/><br/>
    
      
        <Button variant="contained" 
              color="primary" 
              style={styles.center}
              onClick={this.handleFormSubmit}>
              Signup
        </Button>
    
      </Paper>
      <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.open}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Regster Success!</span>}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.is_empty}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Please Insert All User Information Field.</span>}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.fail}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Email already exist!</span>}
          />

          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            onClose={this.handleClose}
            open={this.state.empty_location}
            autoHideDuration={6000}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Couldn't get Location Info.</span>}
          />
    </div>
        );
    }
}


