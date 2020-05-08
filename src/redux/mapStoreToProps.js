const mapStoreToProps = (reduxState) => {
  return {
    store: reduxState,
    // reduxState properties bound directly to "props"
    // ---------
    // Instead of taking everything from state, we just want the user info.
    // if you wanted you could write this code like this:
    user: reduxState.user,
    loginMode: reduxState.loginMode,
    errors: reduxState.errors,
    allRecipes: reduxState.allRecipesReducer,
    categoryList: reduxState.categoryListReducer,
    favoriteRecipes: reduxState.allFavoriteRecipeReducer,
    recipeDetails: reduxState.recipeDetailsReducer,
    recipeIngredients: reduxState.recipeIngredientsReducer,
    recipeInstructions: reduxState.recipeInstructionsReducer,
  };
};

export default mapStoreToProps;
