import React, { Component } from 'react';
import Globals from '../../utils/globals';
import superagent from 'superagent';
import DashboardView from './DashboardView';

class DashboardPage extends Component {

  
  constructor(props){
    super(props)
    this.state = {
      locations: [],
      user:null
    }    
  }
  componentDidMount() {
    let userID = localStorage.getItem("userID");
    if (userID == undefined || userID == null || userID == '') {
      this.props.history.push('/login');
      return;
    }
    let url = Globals.instance().baseUrl + '/locations/user/' + userID;
    superagent
      .get(url)
      .end((err, res) => {

        if (err) {
          let message = JSON.parse(res.text);
          alert(message.message);
          return;
        }
        this.setState({
          locations: res.body[1],
          user: res.body[0]
        });
        setTimeout(() => {
          Globals.hideLoadingIndicator();
        }, 1000);
      });
  }

  render() {
    return (
      <div>
        {
          (this.state.user )?
           <DashboardView locations={this.state.locations} user={this.state.user} ></DashboardView>
          :null
        }
      </div>
    );
  }
}

export default DashboardPage;
