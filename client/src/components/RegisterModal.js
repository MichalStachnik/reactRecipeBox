import React from 'react';

class RegisterModal extends React.Component {
  
  handleClick = () => {

    const newUserInfo = {
      username: this.refs.username.value,
      password: this.refs.password.value
    }
    this.props.onRegister(newUserInfo);
    this.refs.username.value = '';
    this.refs.password.value = '';
  }

  render() {

    const modalStyles = {
      transition: '0.2s all ease-in-out',
      opacity: this.props.isOpen ? 1 : 0,
      zIndex: this.props.isOpen ? 10 : -10
    };
    
    return(
      <div className="modal" style={modalStyles}>
        <label>Username: </label>
        <input ref="username" className="inputBox" type="text" />
        <label>Password: </label>
        <input ref="password" className="inputBox" type="password" />
        <button 
          className="add"
          onClick={this.handleClick}
        >
          Register
        </button>
      </div>
    )
  }
};

export default RegisterModal;