const recipeCategoryReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_RECIPE_CATEGORY":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default recipeCategoryReducer;
