//TODO: Add menu sidebar with search filter

import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import RecipeList from './components/RecipeList';

class App extends Component {

  state = {
    isAddModalOpen: false,
    isEditModalOpen: false,
    recipes: [],
    editData: {}
  };
  componentDidMount = () => {
    fetch('/recipes')
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        this.setState({ recipes: data });
      });
  }

  toggleAddModal = () => {
    this.setState({
      isAddModalOpen: !this.state.isAddModalOpen
    });
  }

  toggleEditModal = (id) => {
    // Get and pre-populate edit fields
    fetch(`/recipes/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        this.setState({
          editData: {...this.state.editData, data}
        });
      });
    this.setState({
      isEditModalOpen: !this.state.isEditModalOpen
    });
  }

  // Add a recipe
  handleAdd = (data) => {
    this.setState({
      isAddModalOpen: false
    });
    const newRecipe = {
      name: data.name,
      ingredients: data.ingredients
    };
    // Validate
    if(newRecipe.name === '' || newRecipe.ingredients === '') return;

    this.setState({
      recipes: [...this.state.recipes, newRecipe]
    });
    // Send to server
    fetch('/recipes', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8"       
      },
      body: JSON.stringify(newRecipe)
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  // Delete a recipe
  handleDelete = (recipe) => {
    fetch(`/recipes/${recipe}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json; charset=utf-8"       
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          recipes: res,
          isEditModalOpen: false
        });
      });
  }

  // Save an edit
  handleSaveEdit = (recipe, id) => {
    const editedRecipe = {
      name: recipe.name,
      ingredients: recipe.ingredients
    };
    fetch(`/recipes/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json; charset=utf-8"       
      },
      body: JSON.stringify(editedRecipe)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({ 
          isEditModalOpen: false,
          recipes: data
        });
      });
  }

  handleModalClose = (e) => {
    if(
      e.target.className !== 'editButton' && 
      e.target.className !== 'far fa-edit' && 
      e.target.className !== 'plus' && 
      e.target.className !== 'fas fa-plus' &&
      e.target.className !== 'modal' &&
      e.target.className !== 'inputBox'
    ){
      this.setState({
        isAddModalOpen: false,
        isEditModalOpen: false
      });
    }
  }

  render() {
    return (
      <div onClick={(e) => this.handleModalClose(e)}>
        <Navbar />
        <button className="plus" onClick={this.toggleAddModal}><i className="fas fa-plus"></i></button>
        <AddModal 
          isOpen={this.state.isAddModalOpen}
          onAdd={this.handleAdd}
        />
        <EditModal
          isOpen={this.state.isEditModalOpen}
          editData={this.state.editData}
          onDelete={this.handleDelete} 
          onSaveEdit={this.handleSaveEdit}
        />
        <RecipeList
          recipes={this.state.recipes}
          onEdit={this.toggleEditModal}
        />
      </div>
    );
  }
}

export default App;
