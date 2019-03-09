import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Globals from '../../utils/globals';
import superagent from 'superagent'
import { Map, GoogleApiWrapper,  Marker } from 'google-maps-react';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';

import './SettingPage.css';

class SettingForm extends Component {

    constructor(props) {
        super(props);
        const plat = this.props.user.latitude;
        const plng = this.props.user.longitude;
        this.state = {
            markers: [ plat, plng ],
            user: this.props.user,
            file: null,
            previewState: true,
            image: [],
            open: false,
            is_change : false,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            hobby: this.props.user.hobby
        }
        this.photoChange = this.photoChange.bind(this);
        this.previewRemove = this.previewRemove.bind(this);
        this.previewButton = this.previewButton.bind(this);
        this.previewPhoto = this.previewPhoto.bind(this);
        this.formChange = this.formChange.bind(this);
        this.profileUpdate = this.profileUpdate.bind(this);
        this.photoUpload = this.photoUpload.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
      if (this.state.user.photo) {
        this.setState({
          previewState: false,
          file: Globals.instance().publicUrl + this.state.user.photo  
        });
      }
    }

  photoChange = (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0]),
      image: e.target.files[0],
      previewState: false,
      is_change: true
    });
  }

  previewRemove() {
      this.setState({
          file: null,
           previewState: true
      });
  }

  previewButton() {
      if (this.state.previewState) {
          return (
              <div>
                <label htmlFor='single'>
                    <FontAwesomeIcon icon={faImage} color='#3B5998' size='7x' />
                </label>
                <input type='file' id='single' onChange={this.photoChange}/>
              </div>
          )
      }
  }

  previewPhoto() {
      if (this.state.file) {
          return (
              <div>
                <img className="preview" src={this.state.file} alt="Profile"/>
                <div>
                    <Button variant="contained" color="default" onClick={this.photoUpload}>
                        Upload
                        <CloudUploadIcon />
                    </Button>
                    <Button variant="contained" color="secondary" style={{marginLeft:10}} onClick={this.previewRemove}>
                        Remove
                        <DeleteIcon />
                    </Button>
                </div>
              </div>
          );
      }
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  formChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  photoUpload() {
      if (!this.state.is_change) {
        return;
      }
      let url = Globals.instance().baseUrl + '/users/photo/'+this.state.user.id;
      let uploadRequest = superagent.post(url);
      uploadRequest.attach('image', this.state.image);
      uploadRequest.end((err, res)=>{
          if(err) {
              alert(res.body.message);
              return;
          }

          console.log('Upload Successed!' + JSON.stringify(res.body));
          this.setState({
            open: true,
            is_change: false
          });
      })
  }

  profileUpdate() {
    const user = {
      'firstName': this.state.firstName,
      'lastName': this.state.lastName,
      'hobby': this.state.hobby
    }
    let url = Globals.instance().baseUrl + '/users/profile/'+this.state.user.id;
    let uploadRequest = superagent.put(url).send(user);
    
    uploadRequest.end((err, res) => {
      if (err) {
          alert(res.body.message);
          return;
      }

      this.setState({open: true});
    })
  }
  
  render() {
    return (
      <div className="DashboardPage">
          <Grid container spacing={24}>
            <Grid item xs={6} >
              <Paper className="s_userInfo">
                <h2 className="s_title"> User Information </h2>
                <Grid className="s_info" container>
                  <Grid item xs={12} sm={6} lg={4}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        defaultValue={this.state.user.firstName}
                        margin="dense"
                        variant="outlined"
                        onChange={this.formChange}
                        />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <TextField
                        label="Last Name"
                        name="lastName"
                        defaultValue={this.state.user.lastName}
                        margin="dense"
                        variant="outlined"
                        onChange={this.formChange}
                        />
                  </Grid>
                  <Grid item xs={12} sm={6} lg={4}>
                    <TextField
                        disabled
                        label="Email"
                        defaultValue={this.state.user.username}
                        margin="dense"
                        variant="outlined"
                        />
                  </Grid>
                </Grid>

                <Grid className="s_info hobby_field" container>
                  <TextField
                        label="Hobby"
                        fullWidth
                        name="hobby"
                        multiline={true}
                        rows={2}
                        rowsMax={3}
                        defaultValue={this.state.user.hobby}
                        margin="dense"
                        variant="outlined"
                        onChange={this.formChange}

                        />
                </Grid>
                <Button variant="contained" color="primary" onClick={this.profileUpdate} >
                    Update
                    <SaveIcon />
                </Button>
                
                <h2 className="title"> Upload Profile Photo </h2>
                <div className='buttons fadein'>
                    <div className='button'>
                        {this.previewButton()} 
                        {this.previewPhoto()}
                    </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper  className="s_userInfo">
                <Map
                  google={this.props.google}
                  zoom={15}
                  style={{margin: 3}}
                  initialCenter={{
                    lat: this.state.user.latitude,
                    lng: this.state.user.longitude
                  }}
                >
                    {this.state.markers.map((marker, index) => (
                          <Marker
                          key={index}
                          position={marker.position}
                          />
                      ))}
                </Map>
                
              </Paper>
            </Grid>
          </Grid>

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
            message={<span id="message-id">Update Successed!</span>}
          />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBQVfqqSFo-SzqrFH2dGubbDrPUkSxAbgs'
})(SettingForm);
