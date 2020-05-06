const allRecipesReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_RECIPES":
      return action.payload;
    default:
      return state;
  }
};

export default allRecipesReducer;
