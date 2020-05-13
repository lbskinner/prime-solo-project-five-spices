import { combineReducers } from "redux";
import errors from "./errors.reducer";
import loginMode from "./loginMode.reducer";
import user from "./user.reducer";
import allRecipesReducer from "./recipes.reducer";
import categoryListReducer from "./category.reducer";
import allFavoriteRecipeReducer from "./favorite.reducer";
import recipeDetailsReducer from "./recipeDetails.reducer";
import recipeIngredientsReducer from "./ingredient.reducer";
import recipeInstructionsReducer from "./instruction.reducer";
import recipeCategoryReducer from "./recipeCategory.reducer";
import savedRecipeIdReducer from "./savedRecipeId.reducer";

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  allRecipesReducer,
  categoryListReducer,
  allFavoriteRecipeReducer,
  recipeDetailsReducer,
  recipeIngredientsReducer,
  recipeInstructionsReducer,
  recipeCategoryReducer,
  savedRecipeIdReducer,
});

export default rootReducer;
