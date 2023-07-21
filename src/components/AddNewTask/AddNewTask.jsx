import React, {useState} from 'react'
import imgSvg from '../../assets/img/bigPlus.svg'
import '../Tasks/Tasks.scss'


function AddNewTask({list, newTask}) {
    const [visibleInput , setInput] = useState(false);
    const [valueInput, setInputValue] = useState('')

    const switcherTask = () => {
        setInput(!visibleInput)
        setInputValue('')
    }
  
    const addTask = () => {
        fetch('http://localhost:3001/tasks', {method: 'POST',headers: {'Content-Type': 'application/json' } , body: JSON.stringify({
            listId : list.id ,
            text : valueInput,
            completed : false
          })}).then(data =>  data.json()).then(
            response => {
  
                newTask(list.id, response)
                switcherTask() 
            }
          )

        }
    return (
        <div className='tasks__form'>
            {  !visibleInput ? 
            
            <div onClick={switcherTask} className='tasks__form-new'>
                <img src={imgSvg} alt="" />
                <span>New task</span>
            </div>
            :
            <div  className='tasks__form-block'>
                <input className='field' type="text" placeholder='New task' value={valueInput} onChange={event => {
                    setInputValue(event.target.value)
                }} />
                <button className='button' onClick={addTask}>
                    Add task
                </button>
                <button onClick={switcherTask} className='button button--cancel'>
                    Cancel
                </button>
            </div>
            }
        </div>
    )
}

export default AddNewTask