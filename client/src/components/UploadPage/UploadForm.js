import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Globals from '../../utils/globals';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import superagent from 'superagent';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './UploadPage.css';

class UploadForm extends Component {
  
  constructor (props) {
    super(props);
    const plat = this.props.latitude;
    const plng = this.props.longitude;
    this.state = {
        value: 0,
        file: null,
        previewState: true,
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        locationDescription: '',
        locationName: '',
        selectedLocation: '',
        image: [],
        open: false,
        is_null: false,
        markers: [plat, plng],
        fishName: '',
        fishSize: '',
        fishDescription: '',
        locations : this.props.locations
      };
    this.handleChange = this.handleChange.bind(this);
    this.photoChange = this.photoChange.bind(this);
    this.formChange = this.formChange.bind(this);
    this.previewRemove = this.previewRemove.bind(this);
    this.previewButton = this.previewButton.bind(this);
    this.previewPhoto = this.previewPhoto.bind(this);
    this.googleMapClick = this.googleMapClick.bind(this);
    this.locationUpload = this.locationUpload.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.fishUpload = this.fishUpload.bind(this);
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  formChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
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
                <div 
                  onClick={this.previewRemove} 
                  className='delete'
                >
                  <FontAwesomeIcon icon={faTimesCircle} size='2x' />
                </div>
              </div>
          );
      }
  }

  googleMapClick(t, map, coord) {

    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState({
        markers: [
          {
            position: { lat, lng }
          }
        ],
        latitude: lat,
        longitude: lng,
        fishName: '',
        fishSize: '',
    });
  }

  locationUpload () {
    if (this.state.locationName === '' || this.state.locationDescription === '') {
      this.setState({is_null: true});
      return;
    }
    const location = {
      'locationName': this.state.locationName,
      'locationDescription': this.state.locationDescription,
      'latitude': this.state.latitude,
      'longitude': this.state.longitude,
      'userID': localStorage.getItem("userID")
    }
    let url = Globals.instance().baseUrl + '/locations/create';
    let uploadRequest = superagent.post(url).field(location);
    uploadRequest.attach('image', this.state.image);
    uploadRequest.end((err, res) => {
      if (err) {
          alert(res.body.message);
          return;
      }

      this.setState({open: true});
    });

    setTimeout(() => {
      window.location.href = 'recent';
    }, 1000);
  }

  fishUpload() {
    if (this.state.fishName === '' || this.state.fishDescription === '' || this.state.selectedLocation === '' || this.state.fishSize === '') {
      this.setState({is_null: true});
      return;
    }
    const fish = {
      'fishName': this.state.fishName,
      'fishDescription': this.state.fishDescription,
      'locationID': this.state.selectedLocation,
      'fishSize': this.state.fishSize,
      'userID': localStorage.getItem("userID")
    }
    let url = Globals.instance().baseUrl + '/locations/fish/create';
    let uploadRequest = superagent.post(url).field(fish);
    uploadRequest.attach('image', this.state.image);
    uploadRequest.end((err, res) => {
      if (err) {
          alert(res.body.message);
          return;
      } 

      this.setState({open: true});

      setTimeout(() => {
        window.location.href = 'recent';
      }, 1000);
    });
  }

  handleClose = () => {
    this.setState({ open: false, is_null:false });
  };

  render() {
    const { value } = this.state;

    return (
      <div>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Location" icon={<i className="material-icons">cloud_upload</i>} onClick={this.previewRemove} />
            <Tab label="Fish" icon={<i className="material-icons">cloud_upload</i>} onClick={this.previewRemove} />
          </Tabs>
        {value === 0 && (
          <div>
              <Grid container spacing={24}>
                <Grid item xs={6} >
                  <Paper className="u_userInfo">
                    <h2 className="s_title"> Location Information </h2>
                    <Grid className="s_info" container>
                      <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            label="Location Name"
                            name="locationName"
                            margin="dense"
                            variant="outlined"
                            value = {this.state.locationName}
                            onChange={this.formChange}
                            />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            label="Latitude"
                            name="latitude"
                            margin="dense"
                            disabled
                            value = {this.state.latitude}
                            variant="outlined"
                            />
                      </Grid>
                      <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            disabled
                            label="Longitude"
                            name="longitude"
                            margin="dense"
                            value = {this.state.longitude}
                            variant="outlined"
                            />
                      </Grid>
                    </Grid>

                    <Grid className="s_info hobby_field" container>
                      <TextField
                            label="Description"
                            fullWidth
                            name="locationDescription"
                            multiline={true}
                            rows={2}
                            rowsMax={3}
                            margin="dense"
                            variant="outlined"
                            value = {this.state.locationDescription}
                            onChange={this.formChange}
                            />
                    </Grid>
                    
                    <div className='buttons fadein'>
                        <div className='button'>
                            {this.previewButton()} 
                            {this.previewPhoto()}
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.locationUpload} >
                        Save
                        <SaveIcon />
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper  className="u_userInfo">
                    <Map
                      google={this.props.google}
                      zoom={7}
                      style={{margin:2}}
                      initialCenter={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                      }}
                      onClick = {this.googleMapClick}
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
          </div>
        )}
        {value === 1 && (
          <div>
              <Grid container spacing={24}>
                <Grid item xs={3}>
                </Grid>
                <Grid item xs={6} >
                  <Paper className="u_userInfo">
                    <Grid item xs={12}>
                      <FormControl style={{marginTop:15, width: '90%'}}>
                        <InputLabel
                          ref={ref => {
                            this.InputLabelRef = ref;
                          }}
                          htmlFor="outlined-age-simple"
                          style={{marginLeft:25}}
                        >
                          Location
                        </InputLabel>
                        <Select
                          value={this.state.selectedLocation}
                          name="selectedLocation"
                          onChange={this.formChange}
                          input={
                            <OutlinedInput
                              labelWidth = {100}
                              name="selectedLocation"
                              id="outlined-age-simple"
                            />
                          }
                        >
                          {this.props.locations.map((location, i) => (
                              <MenuItem value={location.id} key={i}>{location.locationName}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid className="s_info" container>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fish Name"
                            name="fishName"
                            margin="dense"
                            value = {this.state.fishName}
                            variant="outlined"
                            onChange={this.formChange}
                            style={{width: '80%'}}
                            />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                            label="Fish Size"
                            name="fishSize"
                            margin="dense"
                            value = {this.state.fishSize}
                            variant="outlined"
                            onChange={this.formChange}
                             style={{width: '80%'}}
                            />
                      </Grid>
                    </Grid>

                    <Grid className="s_info hobby_field" container>
                      <TextField
                            label="Description"
                            fullWidth
                            name="fishDescription"
                            multiline={true}
                            rows={2}
                            rowsMax={3}
                            margin="dense"
                            variant="outlined"
                            value = {this.state.fishDescription}
                            onChange={this.formChange}
                            />
                    </Grid>
                    
                    <div className='buttons fadein'>
                        <div className='button'>
                            {this.previewButton()} 
                            {this.previewPhoto()}
                        </div>
                    </div>
                    <Button variant="contained" color="primary" onClick={this.fishUpload} >
                        Save
                        <SaveIcon />
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
          </div>
        )}

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
          message={<span id="message-id">Uploading Successed!</span>}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={this.handleClose}
          open={this.state.is_null}
          autoHideDuration={6000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please Insert All Fields!</span>}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ''
})(UploadForm);
