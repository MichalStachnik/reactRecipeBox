import React from 'react';

class Navbar extends React.Component {
   
  // because we took care of this binding we don't need a constructor
  // with an arrow function
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return(
      <nav>
        Recipe Box
      </nav>
    )
  }
};

export default Navbar;