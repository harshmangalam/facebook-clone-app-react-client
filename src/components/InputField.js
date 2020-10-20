import React from 'react'
import { makeStyles, InputBase } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: '50px 50px 50px 50px',
    backgroundColor: '#F0F2F5',
    width:'100%',
    marginLeft:'8px'
  },

  searchIcon: {
    color: '#606770;',
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right:0,
    marginLeft:'16px',
    cursor:"pointer"
  },
  inputRoot: {
    color: 'black',
    width:'70%',
    
  },
  inputInput: {
    flexGrow: 1,
    paddingLeft: '8px',
    width:'100%'
    

  },
}))
function Search({ placeholder,children }) {
  const classes = useStyles()
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
       {children}
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  )
}

export default Search
