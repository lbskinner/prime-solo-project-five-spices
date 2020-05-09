const recipeCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

export default recipeCategoryReducer;
