import React from 'react';

class EditModal extends React.Component {
  
  handleSave = () => {

  }
  handleDelete = (id) => {
    this.props.onDelete(id);
  }

  render() {
    const modalStyles = {
      transition: '0.2s all ease-in-out',
      opacity: this.props.isOpen ? 1 : 0,
      zIndex: this.props.isOpen ? 10 : -10
    };
    console.log(this.props);
    let editName = this.props.editData.data ? this.props.editData.data.name : '';
    let currentId = this.props.editData.data ? this.props.editData.data._id : '';
    let editIngredients = this.props.editData.data ? this.props.editData.data.ingredients : '';
    return(
      <div className="modal" style={modalStyles}>
        <label>Name: </label>
        <input ref="name" type="text" value={editName}/>
        <label>Ingredients: </label>
        <textarea ref="ingredients" type="text" value={editIngredients}/>
        <button 
          onClick={this.handleSave}
        >
          <i className="far fa-save"></i>
        </button>
        <button
          onClick={() => this.handleDelete(currentId)}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    )
  }
};

export default EditModal;