import React, { Component } from 'react';
import Globals from '../../utils/globals';
import superagent from 'superagent';
import RecentView from './RecentView';


class RecentPage extends Component {
  
  state = {
      locations: [],
      fishes: []
  }

  componentDidMount() {
    let url = Globals.instance().baseUrl + '/locations/recent/';
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
          console.log(this.state.locations);
          
          Globals.hideLoadingIndicator();
        });
  }
  
  render() {
    return (
      <div className="DashboardPage">
          <RecentView locations={this.state.locations} />
      </div>
    );
  }
}

export default RecentPage;
