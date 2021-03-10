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
  }

  client = new WebSocket('ws://127.0.0.1:8000/ws/chat/' + this.props.room + '/')

  componentDidUpdate() {
    this.client.onmessage = (message)=>{
      const dataFromServer = JSON.parse(message.data);
      console.log("reply recieved",dataFromServer.way);
      if(dataFromServer){
        this.props.MessageRecieve(dataFromServer);
      }
      console.log(this.props.messages)
    }
    this.client.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };
  }

  leaveHandler = ()=>{
    this.client.send(JSON.stringify({
      way:'message',
      message:this.state.value,
      username:this.props.name,
      join:'left'
    }));

    this.props.LeaveGroup();
    this.setState({value:'',name:''});
    this.props.history.push('/');
  }

  onButtonClicked = (e)=>{
    this.client.send(JSON.stringify({
      way:'message',
      message:this.state.value,
      username:this.props.name,
      join:null
    }));

    // this.props.sendMessage();
    this.setState({value:''});
  }

  sendHandler =(event)=>{
      // Number 13 is the "Enter" key on the keyboard
      if (event.key === 'Enter') {
        document.getElementById("myBtn").click();
      }
  }

  render() {

    const { classes } = this.props;

    const msg = this.props.messages.map(message => <>
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
          <div style={{ marginTop: 50, }}>
            <Typography component="h1" variant="h5">Room Name: {this.props.room}</Typography>
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
                onKeyPress = {this.sendHandler}
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
          </div>
        </Container>
      )
    }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    // sendMessage:()=>dispatch(actionCreator.sendMessage()),
    LeaveGroup:()=>dispatch(actionCreator.LeaveGroup()),
    MessageRecieve:(data)=>dispatch(actionCreator.MessageRecieve(data))
  }
}

const mapStateToProps = (state)=>{
  return {
    messages:state.messages,
    room:state.room,
    join:state.join,
    name:state.name
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(useStyles)(App))
