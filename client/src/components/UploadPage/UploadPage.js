import React, { Component } from 'react';
import UploadForm from './UploadForm';
import Globals from '../../utils/globals';
import superagent from 'superagent';

import './UploadPage.css';

class UploadPage extends Component {

  state = {
    locations:[],
    latitude: localStorage.getItem('latitude'),
    longitude: localStorage.getItem('longitude')
  }

  componentDidMount() {
    let url = Globals.instance().baseUrl + '/locations/all';
		superagent
        .get(url)
        .end((err, res) => {
          
          if(err){
            let message = JSON.parse(res.text);
            alert(message.message); 
            return;
          }

          this.setState({
            locations: res.body
          });
          
          Globals.hideLoadingIndicator();
        });
  }

  render() {
    return (
      <div>
        <UploadForm latitude={this.state.latitude} longitude={this.state.longitude} locations={this.state.locations} />      
      </div>
    );
  }
}

export default UploadPage;
