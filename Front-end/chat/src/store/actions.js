import * as actionType from './actionType'

export const LoggedIn=(name)=>{

  return dispatch=>{
    dispatch({type:actionType.LoggedIn,name:name});
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
