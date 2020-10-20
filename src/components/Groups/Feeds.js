import React from 'react'
import { Typography, Paper, Avatar, Button, Grid } from '@material-ui/core'

function Feeds() {
    return (
        <Grid container justify="center" alignContent="center">
        <Grid item xs={10} sm={10} md={6} style={{marginTop:'90px'}}>
            <Typography style={{color:'#65676B',fontSize:'14px',fontWeight:'800',padding:'8px 16px'}}>
                RESCENT ACTIVITY
            </Typography>

            <Paper style={{width:'100%',marginTop:'24px',padding:'16px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                <Avatar variant="square" style={{background:'white',width:'112px',height:'112px'}}>
                    <img src={require("../../assets/no_feed.svg")}/>
                </Avatar>
                <Typography style={{marginTop:'16px',color:'#65676B',fontSize:'20px',fontWeight:'800'}}>
                You're All Caught Up
                </Typography>
                <Typography style={{color:'#65676B',fontSize:'16px'}}>
                Check back later for more updates
                </Typography>
                <Button  style={{marginTop:'16px',background:'rgb(24,119,242)',color:'white',fontWeight:'700'}}>
                    Discover more Groups
                </Button>
            </Paper>
        </Grid>
        </Grid>
    )
}

export default Feeds
