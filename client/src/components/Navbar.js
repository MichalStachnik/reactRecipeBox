import React from 'react';

class Navbar extends React.Component {
   
  handleRegisterClick = () => {
    this.props.onToggleRegisterModal(); 
  }

  handleLogInClick = () => {
    this.props.onToggleLogInModal();
  }

  render() {
    if(this.props.username) {
      return (
        <nav>
          <h2>Recipe Box</h2>
          <h4>welcome back {this.props.username}</h4>
        </nav>
      );
    }
    else {
      return (
        <nav>
          <h2>Recipe Box</h2>
          <p onClick={this.handleRegisterClick} className="register">
            Register
          </p>
          <p onClick={this.handleLogInClick} className="logIn">
            Log In
          </p>
        </nav>
      )
    }
  }
};

export default Navbar;