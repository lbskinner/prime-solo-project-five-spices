const allRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_RECIPES":
      return action.payload;
    case "SET_ALL_RECIPES_BY_CATEGORY":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default allRecipesReducer;
