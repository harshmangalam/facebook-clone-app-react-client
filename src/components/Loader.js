import React from 'react'
import { Paper, CircularProgress, Backdrop, LinearProgress } from "@material-ui/core";
function Loader() {
    return (
        <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

            <Backdrop open={true}>
                <Paper style={{ padding: '16px' }} elevation={14}>
                    <CircularProgress />
                    
                </Paper>
            </Backdrop>
        </div>
    )
}

export default Loader