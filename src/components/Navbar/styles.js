import { makeStyles, fade } from '@material-ui/core'

const drawerWidth = 380
export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },

  leftMenu: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoImg: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  middleMenu: {
    flexGrow: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonItemMiddle: {
    width: 'auto',
    height: 'auto',
    padding: '10px 50px 10px 50px',
    borderRadius: '10px 10px 10px 10px',
  },

  activeBtn: {
    borderBottom: '4px solid #3578E5',
    borderRadius: '0px',
    background: 'transparent',
  },

  rightMenu: {
    flexGrow: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  profile_chip: {
    paddingTop: '16px',
    paddingBottom: '16px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}))
