import React from 'react';

class AddModal extends React.Component {
  
  handleClick = () => {

    const recipe = {
      name: this.refs.name.value,
      ingredients: this.refs.ingredients.value
    }
    this.props.onAdd(recipe);
    this.refs.name.value = '';
    this.refs.ingredients.value = '';
  }

  render() {

    const modalStyles = {
      transition: '0.2s all ease-in-out',
      opacity: this.props.isOpen ? 1 : 0,
      zIndex: this.props.isOpen ? 10 : -10
    };
    
    return(
      <div className="modal" style={modalStyles}>
        <label>Name: </label>
        <input ref="name" type="text" />
        <label>Ingredients: </label>
        <textarea ref="ingredients" type="text" />
        <button 
          className="add"
          onClick={this.handleClick}
        >
          Add
        </button>
      </div>
    )
  }
};

export default AddModal;