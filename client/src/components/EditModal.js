import React from 'react';

class EditModal extends React.Component {
  
  state = {
    editName: '',
    editIngredients: ''
  }
  componentDidUpdate = (prevProps) => {
    if(this.props !== prevProps){
      this.setState({
        editName: this.props.editData.data ? this.props.editData.data.name : '',
        editIngredients: this.props.editData.data ? this.props.editData.data.ingredients : ''
      });
    }
  }

  handleSave = (id) => {
    const recipe = {
      name: this.refs.editName.value,
      ingredients: this.refs.editIngredients.value
    }
    this.props.onSaveEdit(recipe, id);
    this.refs.editName.value = '';
    this.refs.editIngredients.value = '';
  }

  handleDelete = (id) => {
    this.props.onDelete(id);
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const modalStyles = {
      transition: '0.2s all ease-in-out',
      opacity: this.props.isOpen ? 1 : 0,
      zIndex: this.props.isOpen ? 10 : -10
    };
    let currentId = this.props.editData.data ? this.props.editData.data._id : '';
    return(
      <div className="modal" style={modalStyles}>
        <label>Name: </label>
        <input 
          name="editName" 
          ref="editName" 
          className="inputBox" 
          type="text" 
          onChange={this.onInputChange} 
          value={this.state.editName}
        />
        <label>Ingredients: </label>
        <textarea 
          name="editIngredients" 
          ref="editIngredients" 
          className="inputBox" 
          type="text" 
          onChange={this.onInputChange} 
          value={this.state.editIngredients}
        />
        <button 
          onClick={() => this.handleSave(currentId)}
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