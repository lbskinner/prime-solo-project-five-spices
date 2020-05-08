const allFavoriteRecipeReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_FAVORITE_RECIPES":
      return action.payload;
    default:
      return state;
  }
};

export default allFavoriteRecipeReducer;
