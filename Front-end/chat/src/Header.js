import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

 const useStyles =  makeStyles((theme) => ({
  Header:{
    backgroundColor:'#f4f0ec',
    height:'100%',
  }
}));
export default function(props){
  const classes = useStyles();

  return (
    <div className={classes.Header}>
      {props.children}
    </div>
  )
}
