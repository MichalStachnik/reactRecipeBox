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
                <div className="leftCol">
                  <button 
                    onClick={() => this.handleClick(recipe._id)}
                  >
                  X
                  </button>
                </div>
                <div className="rightCol">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.ingredients}</p>
                </div>
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