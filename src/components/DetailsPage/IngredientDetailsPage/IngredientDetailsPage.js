import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  margin: {
    marginBottom: 10,
  },
});

class IngredientDetailsPage extends Component {
  clickDeleteButton = (ingredient_id) => (event) => {
    console.log(ingredient_id);
  };

  clickEditButton = (ingredient_id) => (event) => {
    console.log(ingredient_id);
  };
  render() {
    const { classes } = this.props;
    const ingredientsArray = this.props.recipeIngredients.map((ingredient) => {
      return (
        <ListItem
          key={ingredient.ingredient_id}
          classes={{ root: classes.listItem }}
        >
          <ListItemIcon>
            <Checkbox disableRipple />
          </ListItemIcon>
          <ListItemText primary={ingredient.ingredient_item} />
          <IconButton classes={{ root: classes.listItem }}>
            <EditIcon
              fontSize="small"
              onClick={this.clickEditButton(ingredient.ingredient_id)}
            />{" "}
          </IconButton>
          <IconButton classes={{ root: classes.listItem }}>
            <DeleteIcon
              fontSize="small"
              onClick={this.clickDeleteButton(ingredient.ingredient_id)}
            />
          </IconButton>
        </ListItem>
      );
    });
    return (
      <div>
        <Typography variant="h5" classes={{ root: classes.margin }}>
          Ingredients
        </Typography>
        <List disablePadding={true}>{ingredientsArray}</List>
      </div>
    );
  }
}

export default withStyles(styles)(
  connect(mapStoreToProps)(IngredientDetailsPage)
);
