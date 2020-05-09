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
    default:
      return state;
  }
};

export default recipeDetailsReducer;
