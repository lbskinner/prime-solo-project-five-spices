const recipeDataFromRapidApiReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_DATA_FROM_RAPIDAPI":
      return action.payload;
    default:
      return state;
  }
};

export default recipeDataFromRapidApiReducer;
