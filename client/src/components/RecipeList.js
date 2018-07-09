import React from 'react';

class RecipeList extends React.Component {

  handleClick = (id) => {
    this.props.onDelete(id);
  }
  render() {
    return (
      <div className="recipeList">
        <ul>
          { this.props.recipes ? 
            this.props.recipes.map(recipe => {
            return (
              <li key={recipe._id}>
                <h3>{recipe.name}</h3>
                <button 
                  onClick={() => this.handleClick(recipe._id)}
                >
                X
                </button>
                <p>{recipe.ingredients}</p>
              </li>
            );
          }) 
            : '' }
        </ul>
      </div>
    );
  }
}

export default RecipeList;