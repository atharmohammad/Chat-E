import * as actionType from './actionType'

export const LoggedIn=(name,room)=>{

  return dispatch=>{
    dispatch({type:actionType.LoggedIn,name:name,room:room});
  }
}


// export const sendMessage=()=>{
//
//   return dispatch=>{
//
//     dispatch({type:actionType.SentMessage}) //value:""
//   }
// }

export const LeaveGroup = ()=>{
  return dispatch=>{
    dispatch({type:actionType.LeaveGroup})
  }

}

export const MessageRecieve = (data)=>{
  return dispatch=>{
    dispatch({type:actionType.MessageRecieve,data:data})
  }
}
