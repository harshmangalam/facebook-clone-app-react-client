import { createMuiTheme } from '@material-ui/core/styles'
import { UIContext } from '../App'
import { useContext } from 'react'

const useTheme = (darkMode) => {
  return createMuiTheme({
    active: {
      success: 'rgb(63,162,76)',
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: 'rgb(1,133,243)',
      },

      secondary: {
        main: 'rgb(63,162,76)',
      },
    },
  })
}

export default useTheme
