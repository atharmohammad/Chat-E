import * as actionType from './actionType';

const initialState = {
  isLoggedIn: false,
  messages: [],
  room: 'Django',
  name:''
}

const reducer = (state=initialState,action)=>{
  switch(action.type){
    case(actionType.LoggedIn):{
      return {
        ...state,
        isLoggedIn:true,
        name:action.name
      }
    }
    case(actionType.LeaveGroup):{
      return {
        ...state,
        isLoggedIn: false,
        messages: [],
        name:''
      }
    }
    case(actionType.MessageRecieve):{
      return {
        ...state,
        messages: [...state.messages,{
              msg:action.data.message,
              name:action.data.username,
              join:action.data.join,
            }]
      }
    }
    default:return state
  }
}

export default reducer;
