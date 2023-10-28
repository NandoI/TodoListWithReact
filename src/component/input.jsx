import { useEffect, useState } from "react";
import InputList from "./input_list";
import { useDispatch } from "react-redux";
import { addTodo, getTodo } from "../Redux/reducer/reducer";

function Input_Input (){
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

    useEffect(() => {
        dispatch(getTodo())
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
            let newTodo = {
                value: input,
                status: false
            }
            dispatch(addTodo(newTodo));
        
    }
    
    return(
        <div className=" w-full h-screen flex items-center">
            <div className="w-[500px] mx-auto p-5 text-center">
                <h1 className="text-4xl mb-32 font-semibold"><span className="underline decoration-sky-500" >What's</span> the plan for today</h1>
                <form className="flex items-center">
                    <input type="text" 
                    value={input}
                    placeholder="Input List"
                    onChange={(e) => setInput(e.target.value)}
                    className="border-2 border-black w-full p-2 px-4 rounded-lg placeholder:font-semibold" />
                    <button 
                    onClick={handleClick}
                    className="ml-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-300">Add</button>
                </form>

                <InputList/>  
            </div>
        </div>
        
    )
}

export default Input_Input