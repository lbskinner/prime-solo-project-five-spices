initialClassesReducer = {
  bgClass: "body-background",
  loaderClass: loader,
};

const cssClassesReducer = (state = initialClassesReducer, action) => {
  switch (action.type) {
    //   case "SET_CATEGORY_LIST":
    //     return action.payload;
    //   case "CLEAR_REDUCERS":
    //     return [];
    default:
      return state;
  }
};

export default cssClassesReducer;
