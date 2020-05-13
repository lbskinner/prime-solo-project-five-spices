const savedRecipeIdReducer = (state = [{ recipe_id: "" }], action) => {
  switch (action.type) {
    case "SET_SAVED_RECIPE_ID":
      return action.payload;
    default:
      return state;
  }
};

export default savedRecipeIdReducer;
