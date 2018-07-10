import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Modal from './components/Modal';
import RecipeList from './components/RecipeList';

class App extends Component {

  state = {
    isModalOpen: false,
    recipes: []
  };
  
  componentWillMount = () => {
    fetch('/recipes')
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        console.log(data);
        this.setState({ recipes: data });
      });
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  // Add a recipe
  handleAdd = (data) => {
    console.log('DATA FROM HANDLEADD', data);
    this.setState({
      isModalOpen: false
    });
    const newRecipe = {
      name: data.name,
      ingredients: data.ingredients
    };
    // Validate
    if(newRecipe.name === '' || newRecipe.ingredients === '') return;

    let localArr = this.state.recipes;
    localArr.push(newRecipe);
    this.setState({
      recipes: localArr
    });
    console.log('SENDING', newRecipe);
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
      // .then(res => console.log(res));
      .then(res => {
        this.setState({recipes: res});
      });
    
  }

  render() {
    return (
      <div>
        <Navbar />
        <button className="plus" onClick={this.toggleModal}>+</button>
        <Modal 
          isOpen={this.state.isModalOpen}
          onAdd={this.handleAdd}
        />
        <RecipeList
          recipes={this.state.recipes}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default App;
