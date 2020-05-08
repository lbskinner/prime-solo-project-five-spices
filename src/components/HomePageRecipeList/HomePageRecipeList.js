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
});

class HomePageRecipeList extends Component {
  state = {
    heading: "Class Component",
  };
  render() {
    const { classes } = this.props;
    console.log(classes);
    const recipesArray = this.props.allRecipes.map((recipe) => {
      return (
        <Grid item>
          <Card key={recipe.recipe_id} className={classes.card}>
            <div className={classes.display}>
              <CardHeader title={recipe.recipe_name} />
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
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
