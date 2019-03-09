import React, { Component } from 'react';
import Globals from '../../utils/globals';
import superagent from 'superagent';
import LocationView from './LocationView';

class LocationPage extends Component {

  state = {
    location: [],
    fishes: []
  }
  
  componentDidMount() {
    let locationID = this.props.match.params.locationID;
    let url = Globals.instance().baseUrl + '/locations/' + locationID;
		superagent
        .get(url)
        .end((err, res) => {
          
          if(err){
            let message = JSON.parse(res.text);
            alert(message.message); 
            return;
          }

          this.setState({
            location: res.body[0],
            fishes: res.body[1]
          });
          
          Globals.hideLoadingIndicator();
        });
  }
  
  render() {
    return (
      <div>
          <LocationView location={this.state.location} fishes={this.state.fishes} />
      </div>
    );
  }
}

export default LocationPage;
