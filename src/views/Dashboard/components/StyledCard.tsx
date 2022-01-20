import React, { useCallback, useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles, useMediaQuery } from '@material-ui/core';

interface StyledCardProps {
    children?: any,
}
const useStyles = makeStyles((theme) => ({
    deskRoot: {
        borderRadius: 10,
        width: '100%'
        // width: 300
    },
    root: {
        borderRadius: 10,
        minWidth: 300
    }
}));

const StyledCard: React.FC<StyledCardProps> = ({ children }) => {
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 960px)');
    return (
        <div className="bounce" style={{width: '100%'}}>
            <Paper elevation={3} classes={{ root: isMobile ? classes.root : classes.deskRoot }}>
                {children}
            </Paper>
        </div>
    )
}

export default StyledCard
