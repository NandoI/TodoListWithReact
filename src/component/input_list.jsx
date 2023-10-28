import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editTodo, getTodo, removeTodo, togleTodo } from "../Redux/reducer/reducer"

function InputList(){
    const dispatch = useDispatch()
    const { isLoading, todos } = useSelector((state) => state.todo) 
    const [ editedTodo, setEditedTodo ] = useState({ id: null, value: "" }); 
    const [filter, setFilter] = useState('all')
    const [buttonColor, setButtonColor] = useState({
        all: 'bg-blue-400',
        active: 'bg-blue-400',
        completed: 'bg-blue-400',
      });
    
    
    useEffect(() => {
        dispatch(getTodo)
    }, [])

    const handleClickRemove = (e, todoId) => {
        e.preventDefault();
        dispatch(removeTodo(todoId));
    }
    
    const handleClickEdit = (todoId) => {
        const todoToEdit = todos.find((todo) => todo.id === todoId);
        if (todoToEdit) {
          setEditedTodo({ id: todoId, value: todoToEdit.value });
        }
      };

    const handleSaveEdit = () => {
        dispatch(editTodo(editedTodo.id, editedTodo));
        setEditedTodo({ id: null, value: "" });
    };

    const HandleClickToggle = (id) => {
        dispatch(togleTodo(id));
      };

    const filterTodos = todos.filter((todo) =>{
        if (filter === 'active') {
            return !todo.status
        } else if (filter === 'completed') {
            return todo.status
        }

        return true
    })

    const handleFilterClick = (selectedFilter) => {
        setFilter(selectedFilter);

        setButtonColor({
          all: selectedFilter === 'all' ? 'bg-blue-400' : 'bg-gray-300',
          active: selectedFilter === 'active' ? 'bg-blue-400' : 'bg-gray-300',
          completed: selectedFilter === 'completed' ? 'bg-blue-400' : 'bg-gray-300',
        });
      };
      

    return (
        <div>
<div>
        <ul className="flex mt-10 justify-start gap-10">
          <li className={`px-4 py-1 rounded-2xl ${buttonColor.all}`}>
            <button
              className="text-sm font-semibold"
              onClick={() => handleFilterClick('all')}
            >
              ALL
            </button>
          </li>
          <li className={`px-4 py-1 rounded-2xl ${buttonColor.active}`}>
            <button
              className="text-sm font-semibold"
              onClick={() => handleFilterClick('active')}
            >
              Active
            </button>
          </li>
          <li className={`px-4 py-1 rounded-2xl ${buttonColor.completed}`}>
            <button
              className="text-sm font-semibold"
              onClick={() => handleFilterClick('completed')}
            >
              Complete
            </button>
          </li>
        </ul>
      </div>
            <div>
            {isLoading ? (
        <div className="m-6">Bentar ya Bang Loading</div>
      ) : (
            filterTodos.map((todo) => (
            <div key={todo.id} className="flex justify-between text-left items-center">
                <div className="flex items-center justify-between border-2 mt-4 w-full py-3 px-2">
                <div>
                    <input type="checkbox"
                    key={todo.id}
                    checked={todo.status}
                    onChange={() => HandleClickToggle(todo.id)}
                    className="mr-2" />
                    {todo.id === editedTodo.id ? (
                    <input
                        type="text"
                        value={editedTodo.value}
                        onChange={(e) => setEditedTodo({ ...editedTodo, value: e.target.value })}
                    />
                    ) : (
                    <span style={{textDecoration: todo.status ? 'line-through' : 'none'}}>{todo.value}</span>
                    )}
                </div>
                <div className="gap-4 flex">
                    {todo.id === editedTodo.id ? (
                    <button onClick={handleSaveEdit}>✅</button>
                    ) : (
                    <button onClick={() => handleClickEdit(todo.id)}>🖋️</button>
                    )}
                    <button onClick={(e) => handleClickRemove(e, todo.id)}>🗑️</button>
                </div>
                </div>
                <div></div>
            </div>
            ))
      )}
            </div>
        </div>
    )
}

export default InputList