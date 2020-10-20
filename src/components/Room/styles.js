const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => ({


  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px 10px 20px",
  },

  cardHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  cardFooter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",

    marginTop: "10px",
  },

  actionBtn: {},
  createBtn:{
    color:"rgb(101,110,119)",
    fontWeight:'800',
  }
}));
