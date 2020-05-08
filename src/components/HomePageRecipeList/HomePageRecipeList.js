import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  card: {
    width: 250,
    height: 250,
  },
  display: {
    display: "flex",
  },
  media: {
    height: 154,
    width: 250,
  },
  color: {
    color: "red",
  },
});

class HomePageRecipeList extends Component {
  state = {
    heading: "Class Component",
  };

  clickFavorite = (recipe_id, favorite) => (event) => {
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
  render() {
    const { classes } = this.props;
    const recipesArray = this.props.allRecipes.map((recipe) => {
      return (
        <Grid item key={recipe.recipe_id}>
          <Card className={classes.card}>
            <div className={classes.display}>
              <CardHeader title={recipe.recipe_name} />
              <IconButton
                aria-label="add to favorites"
                onClick={this.clickFavorite(recipe.recipe_id, recipe.favorite)}
              >
                {recipe.favorite === true ? (
                  <FavoriteIcon className={classes.color} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </div>
            {recipe.image_url ? (
              <CardMedia
                className={classes.media}
                component="img"
                src={recipe.image_url}
              ></CardMedia>
            ) : (
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {recipe.description}
                </Typography>
              </CardContent>
            )}
          </Card>
        </Grid>
      );
    });
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {recipesArray}
      </Grid>
    );
  }
}

export default withStyles(styles)(connect(mapStoreToProps)(HomePageRecipeList));
