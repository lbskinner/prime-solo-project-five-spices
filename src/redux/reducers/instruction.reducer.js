const recipeInstructionsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_INSTRUCTIONS":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default recipeInstructionsReducer;
