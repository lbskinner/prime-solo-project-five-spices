const recipeDetailsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_DETAILS":
      return action.payload;
    default:
      return state;
  }
};

export default recipeDetailsReducer;
