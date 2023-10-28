import axios from "axios"
import { berhasil, fetching } from "./action"

const initialState = {
    todos:[],
    isLoading:false,
    error:''

}


function todoReducer(state = initialState, action){
    switch (action.type){
        case'START_FETCHING':
        return{
            ...state,
            isLoading: true
        }
        case 'EDIT':
            return{
                ...state,
                isLoading:true,
                todos:state.todos.map((todo) =>
                    todo.id === action.payload.id ? action.payload : todo
                     ) 
            }
        case 'SUCCESS_GET_TODO':
            return{
                ...state,
                isLoading:false,
                todos: action.payload
            }
            default:
                return state
        }

}

export function getTodo(){
    return async function(dispatch){

        dispatch(fetching()) 
            const { data } = await axios("https://652d303bf9afa8ef4b26f119.mockapi.io/redux")

            dispatch(berhasil(data))
        
    }
}

export const addTodo = (newTodo) => async (dispatch) => {

    dispatch(fetching())
        await axios.post("https://652d303bf9afa8ef4b26f119.mockapi.io/redux",newTodo)

        dispatch(getTodo())

}

export const removeTodo = (todoId) => async (dispatch) => {
    dispatch(fetching());
        await axios.delete(`https://652d303bf9afa8ef4b26f119.mockapi.io/redux/${todoId}`);

    dispatch(getTodo());
}

export const editTodo = (todoId, editTodo) => async (dispatch) =>{
    dispatch(fetching())
        await axios.put(`https://652d303bf9afa8ef4b26f119.mockapi.io/redux/${todoId}`, editTodo)

        dispatch(getTodo())
}

export const togleTodo = (todoId) => async (dispatch) => {
    dispatch(fetching());
  
      const updateData = await axios.get(`https://652d303bf9afa8ef4b26f119.mockapi.io/redux/${todoId}`);
      const updatedTodo = { ...updateData.data, status: !updateData.data.status };
  
      await axios.put(`https://652d303bf9afa8ef4b26f119.mockapi.io/redux/${todoId}`, updatedTodo);
      const { data } = await axios.get("https://652d303bf9afa8ef4b26f119.mockapi.io/redux");
  
      dispatch(berhasil(data));
  };


export default todoReducer