const recipeIngredientsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_INGREDIENTS":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default recipeIngredientsReducer;
