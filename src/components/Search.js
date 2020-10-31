import React, { useContext } from 'react'
import { makeStyles, InputBase } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import { UIContext } from '../App'
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '50px 50px 50px 50px',
    width: '100%',
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    padding: '3px 10px 3px 0px',
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
}))
function Search({ placeholder }) {
  const classes = useStyles()
  const { uiState } = useContext(UIContext)
  return (
    <div
      className={classes.search}
      style={{ backgroundColor: !uiState.darkMode ? '#F0F2F5' : null }}
    >
      <div
        className={classes.searchIcon}
        style={{ color: !uiState.darkMode ? '#606770' : null }}
      >
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        style={{
          width: '100%',
        }}
      />
    </div>
  )
}

export default Search
