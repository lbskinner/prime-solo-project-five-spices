const initialRecipeDetailsReducerState = [
  {
    description: "",
    favorite: "",
    image_url: "",
    recipe_id: "",
    recipe_name: "",
    recipe_url: "",
    serving_size: "",
    total_time: "",
  },
];

const recipeDetailsReducer = (
  state = initialRecipeDetailsReducerState,
  action
) => {
  switch (action.type) {
    case "SET_RECIPE_DETAILS":
      return action.payload;
    case "RECIPE_DETAILS_NOT_FOUND":
      return null;
    case "RESET_TO_INITIAL_STATE":
      return initialRecipeDetailsReducerState;
    default:
      return state;
  }
};

export default recipeDetailsReducer;
