//TODO: Add menu sidebar with search filter

import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import RegisterModal from './components/RegisterModal';
import LogInModal from './components/LogInModal';
import RecipeList from './components/RecipeList';

class App extends Component {

  state = {
    isAddModalOpen: false,
    isEditModalOpen: false,
    isRegisterModalOpen: false,
    isLogInModalOpen: false,
    recipes: [],
    editData: {},
    token: '',
    username: ''
  };
  componentDidMount = () => {
    fetch('/recipes')
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        this.setState({ recipes: data });
      });
  }

  toggleRegisterModal= () => {
    this.setState({
      isRegisterModalOpen: !this.state.isRegisterModalOpen
    });
  }

  toggleLogInModal = () => {
    this.setState({
      isLogInModalOpen: !this.state.isLogInModalOpen
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

  // Register a user
  handleRegister = (data) => {
    this.setState({
      isRegisterModalOpen: false
    });

    fetch('/auth/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => console.log(res));
  }

  // Log In a user
  handleLogIn = (data) => {
    this.setState({
      isLogInModalOpen: false
    });

    fetch('/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({ 
        token: res.token,
        username: res.user.username
      });
      console.log(this.state);
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
    // Check token
    if(this.state.token === '') return;

    else {
      this.setState({
        recipes: [...this.state.recipes, newRecipe]
      });
      // Send to server
      fetch('/recipes', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': this.state.token   
        },
        body: JSON.stringify(newRecipe)
      })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(res => console.log(res));
    }
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
      e.target.className !== 'inputBox' &&
      e.target.className !== 'register' &&
      e.target.className !== 'logIn'
    ){
      this.setState({
        isAddModalOpen: false,
        isEditModalOpen: false,
        isRegisterModalOpen: false,
        isLogInModalOpen: false
      });
    }
  }

  render() {
    return (
      <div onClick={(e) => this.handleModalClose(e)}>
        <Navbar
          onToggleRegisterModal={this.toggleRegisterModal}
          onToggleLogInModal={this.toggleLogInModal}
          username={this.state.username}
        />
        { this.state.token ? 
          <button className="plus" onClick={this.toggleAddModal}>
            <i className="fas fa-plus"></i>
          </button> : ''
        }
        <RegisterModal 
          isOpen={this.state.isRegisterModalOpen}
          onRegister={this.handleRegister}
        />
        <LogInModal
          isOpen={this.state.isLogInModalOpen}
          onLogIn={this.handleLogIn}
        />
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
          isToken={this.state.token}
        />
      </div>
    );
  }
}

export default App;
