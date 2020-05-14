const categoryListReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CATEGORY_LIST":
      return action.payload;
    case "CLEAR_REDUCERS":
      return [];
    default:
      return state;
  }
};

export default categoryListReducer;
