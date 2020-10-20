const { makeStyles } = require("@material-ui/core");

const drawerWidth = 380;
export default makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "white",
    boxShadow:'1px 1px 3px rgba(0,0,0,0.1)'
  },
  drawerContainer: {
    overflow: "auto",
  },
}));
