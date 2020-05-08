const recipeIngredientsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_INGREDIENTS":
      return action.payload;
    default:
      return state;
  }
};

export default recipeIngredientsReducer;
