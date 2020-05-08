const recipeInstructionsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_INSTRUCTIONS":
      return action.payload;
    default:
      return state;
  }
};

export default recipeInstructionsReducer;
