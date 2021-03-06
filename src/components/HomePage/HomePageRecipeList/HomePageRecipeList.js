import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import noImage from "../../../images/noImage.jpg";

const styles = (theme) => ({
  card: {
    width: 250,
    height: 250,
    cursor: "pointer",
  },
  display: {
    display: "flex",
  },
  media: {
    height: 190,
    width: 250,
  },
  color: {
    color: "red",
  },
  titleSize: {
    height: 60,
    // width: 170,
    // overflow: "hidden",
    // textOverflow: "ellipsis",
    padding: 10,
  },
  height: {
    height: 60,
    padding: 10,
  },
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
});

class HomePageRecipeList extends Component {
  clickFavorite = (recipe_id, favorite) => (event) => {
    event.stopPropagation();
    console.log(recipe_id, favorite);
    const favoriteStatus = !favorite;
    this.props.dispatch({
      type: "UPDATE_FAVORITE",
      payload: {
        recipe_id: recipe_id,
        favorite: favoriteStatus,
      },
    });
  };

  clickRecipe = (recipe_id) => (event) => {
    this.props.dispatch({ type: "RESET_ALL_RECIPES_REDUCER" });
    this.props.history.push(`/details/${recipe_id}`);
  };

  render() {
    const { classes } = this.props;
    let recipesArray = "";
    if (this.props.allRecipes.length) {
      recipesArray = this.props.allRecipes.map((recipe) => {
        return (
          <Grid item key={recipe.recipe_id}>
            <Card
              className={classes.card}
              onClick={this.clickRecipe(recipe.recipe_id)}
            >
              <div className={classes.display}>
                <Tooltip
                  title={recipe.recipe_name}
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Typography
                    variant="h5"
                    classes={{ root: classes.titleSize }}
                  >
                    {recipe.recipe_name}
                  </Typography>
                </Tooltip>
                <Tooltip
                  title="favorite"
                  placement="top"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <IconButton
                    aria-label="add to favorites"
                    onClick={this.clickFavorite(
                      recipe.recipe_id,
                      recipe.favorite
                    )}
                    className={classes.height}
                  >
                    {recipe.favorite === true ? (
                      <FavoriteIcon className={classes.color} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
              {recipe.image_url ? (
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={recipe.image_url}
                ></CardMedia>
              ) : (
                <CardMedia
                  className={classes.media}
                  component="img"
                  src={noImage}
                ></CardMedia>
                // <CardContent>
                //   <Typography
                //     variant="body2"
                //     color="textSecondary"
                //     component="p"
                //   >
                //     {recipe.description}
                //   </Typography>
                // </CardContent>
              )}
            </Card>
          </Grid>
        );
      });
    }
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
      >
        {recipesArray}
      </Grid>
    );
  }
}

export default withRouter(
  withStyles(styles)(connect(mapStoreToProps)(HomePageRecipeList))
);
