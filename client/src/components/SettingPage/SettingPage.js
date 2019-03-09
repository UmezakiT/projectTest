import React, { Component } from 'react';
import Globals from '../../utils/globals';
import superagent from 'superagent';
import SettingForm from './SettingForm';


class SettingPage extends Component {
  
  state = {
      user: Object,
  }

  componentDidMount() {
    let userID = localStorage.getItem("userID");
    let url = Globals.instance().baseUrl + '/users/profile/' + userID;
		superagent
        .get(url)
        .end((err, res) => {
          
          if(err){
            let message = JSON.parse(res.text);
            alert(message.message); 
            return;
          }

          this.setState({
            user: res.body
          });
          console.log(this.state.user);
          
          Globals.hideLoadingIndicator();
        });
  }
  
  render() {
    return (
      <div className="DashboardPage">
          <SettingForm user={this.state.user} />
      </div>
    );
  }
}

export default SettingPage;
