import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from "@material-ui/core/styles";
import { w3cwebsocket  as WebSocket } from "websocket";
import {connect} from 'react-redux';
import * as actionCreator from './store/index'
import {Redirect} from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    boxShadow: 'none',
  },
  message:{
    margin: theme.spacing(3, 0, 2),
  }
});

class App extends Component {

  state = {
    value: '',
    name: '',
    room:''
  }


  client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/')

  componentDidMount() {
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    }

  };

  loginHandler = ()=>{
    console.log(this.state.name)
    this.client.send(JSON.stringify({
      join:'Joined',
      way:'message',
      message:this.state.value,
      username:this.state.name,
    }));

    this.props.LoggedIn(this.state.name,this.state.room);
    console.log(this.state.room)
  }


  render() {

    const { classes } = this.props;
    let chat = (
      <Container component="main" maxWidth="xs">
          <div>
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                ChattyRooms
              </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Chatroom Name"
                  name="Chatroom Name"
                  autoFocus
                  value={this.props.room}
                  onChange={e => {
                    this.setState({ room: e.target.value });
                    this.value = this.state.room;
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="Username"
                  label="Username"
                  type="Username"
                  id="Username"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                    this.value = this.state.name;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.loginHandler}
                >
                  Start Chatting
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </div>
      </Container>
    );

    if(this.props.isLoggedIn){
      const url = '/' + this.state.room
      chat = <Redirect to={url}/>
    }


    return (
      <div>
        {chat}
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    isLoggedIn : state.isLoggedIn,
    join : state.join
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    LoggedIn : (name,room) => dispatch(actionCreator.LoggedIn(name,room)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(App))
