const allFavoriteRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_FAVORITE_RECIPES":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default allFavoriteRecipeReducer;
