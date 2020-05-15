const allRecipesReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ALL_RECIPES":
      return action.payload;
    case "SET_ALL_RECIPES_BY_CATEGORY":
      return action.payload;
    case "CLEAR_REDUCERS":
      return null;
    case "RESET_ALL_RECIPES_REDUCER":
      return null;
    default:
      return state;
  }
};

export default allRecipesReducer;
