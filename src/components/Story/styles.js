import { makeStyles } from "@material-ui/core";

export default makeStyles({
  container: {
    marginTop: "100px",
  },
  cardContainer: {
    position: "relative",
  },
  card: {
    borderRadius: "10px 10px 10px 10px",
    width: "100%",
    height: "189px",
    transition: "0.7s",
    "&:hover": {
      opacity: "0.97",
    },
  },
  cardTitle: {
    position: "absolute",
    color: "white",
    top: "88%",
    padding: "0px 5px 0px 5px",
  },

  cardAvatar: {
    position: "absolute",
    color: "white",
    top: "5%",
    padding: "0px 5px 0px 5px",
  },

  cardImg: {
    width: "100%",
    height: "189px",
    transition: "0.8s",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },

  avatarImg: {
    border: "4px solid #3578E5",
  },


  arrowRight: {
    position: "absolute",
    color: "tomato",
    top: "40%",
    padding: "0px 5px 0px 5px",
    left:'95%'
  },
});
