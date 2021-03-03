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
    isLoggedIn: false,
    messages: [],
    value: '',
    name: '',
    room: 'Django',
    join : null
  }

  client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + this.state.room + '/')

  componentDidMount() {
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    this.client.onmessage = (message)=>{
      const dataFromServer = JSON.parse(message.data);
      console.log("reply recieved",dataFromServer.way);
      if(dataFromServer){
        this.setState({
          messages:[...this.state.messages,{
            msg:dataFromServer.message,
            name:dataFromServer.username,
            join:dataFromServer.join
          }]
        })
      }
    }
    this.client.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

  }


  onButtonClicked = (e)=>{

      this.client.send(JSON.stringify({
        way:'message',
        message:this.state.value,
        username:this.state.name,
        join:null
      }));

      this.setState({
        value:''
      })


  }

  LoggedIn=(e)=>{

    this.client.send(JSON.stringify({
      join:'Joined',
      way:'message',
      message:this.state.value,
      username:this.state.name,
    }));

    this.setState({isLoggedIn:true});
  }

  leaveHandler = (e)=>{
    this.client.send(JSON.stringify({
      join:'Left',
      way:'message',
      message:this.state.value,
      username:this.state.name,
    }));

    this.setState({
      isLoggedIn: false,
      messages: [],
      value: '',
      name: '',
      join : null
    });
  }

  sendHandler =(event)=>{
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        document.getElementById("myBtn").click();
      }
  }

  render() {

    const { classes } = this.props;

    const msg = this.state.messages.map(message => <>
      {message.join === null ? <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {message.name[0]}
            </Avatar>
          }
          title={message.name}
          subheader={message.msg}
        />
      </Card> : null }
      {message.join !== null ? <p>{message.name} has {message.join}</p> : null}
    </>)

    return (
      <Container component="main" maxWidth="xs">
        <div>
          {this.state.isLoggedIn ?
            <div style={{ marginTop: 50, }}>
              <Typography component="h1" variant="h5">Room Name: {this.state.room}</Typography>
              <Paper style={{ height: 500, maxHeight: 500, overflow: 'auto', boxShadow: '1px 1px #888888', }}>
                {msg}
              </Paper>

                <TextField
                  id="outlined-helperText"
                  label="Make a comment"
                  defaultValue="Default Value"
                  variant="outlined"
                  className={classes.message}
                  value={this.state.value}
                  fullWidth
                  onChange={e => {
                    this.setState({ value: e.target.value });
                    this.value = this.state.value;
                  }}
                  onKeyPress = {(e)=>this.sendHandler(e)}
                />
                <Button
                  id='myBtn'
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.onButtonClicked}
                >
                  Send
                </Button>
                <Button
                  id='myBtn'
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={this.leaveHandler}
                >
                  Leave
                </Button>
            </div>
            :
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
                    value={this.state.room}
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
                    onClick={this.LoggedIn}
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
          }
        </div>
      </Container>
    );
  }
}
export default withStyles(useStyles)(App)
