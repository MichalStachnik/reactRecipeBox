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
    
    // Get and prepopulate edit fields
    fetch(`/recipes/${id}`)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        console.log(data);
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

  render() {
    return (
      <div>
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
