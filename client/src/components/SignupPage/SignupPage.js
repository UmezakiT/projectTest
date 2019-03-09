import React, { Component } from 'react';
import SignupForm from './SignupForm';
import './SignupPage.css';

class SignupPage extends Component {
  render() {
    return (
      <div className="SignupPage">
        <SignupForm />
      </div>
    );
  }
}

export default SignupPage;
