import { createMuiTheme } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'

export const Theme = createMuiTheme({
  active: {
    success: 'rgb(63,162,76)',
  },
  palette: {
    primary: {
      main: 'rgb(1,133,243)',
    },

    secondary: {
      main: 'rgb(63,162,76)',
    },
  },
})
