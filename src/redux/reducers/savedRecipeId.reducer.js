const savedRecipeIdReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_SAVED_RECIPE_ID":
      return action.payload;
    case "CLEAR_SAVED RECIPE_ID":
      return [];
    default:
      return state;
  }
};

export default savedRecipeIdReducer;
