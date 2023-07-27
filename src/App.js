import './index.scss'
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';


import { List, AddButtonList, Tasks } from './components/point'



function App() {

  const navigate = useNavigate();

  const [lists, updateLists] = useState(null);
  const [colors, updateColors] = useState(null);
  const [activeItem, activateItem] = useState(null);

  const newList = obj => {
    const newArray = [...lists, obj];
    updateLists(newArray);
    fetch('http://localhost:3001/lists?_expand=color&_embed=tasks').then(res => res.json()).then(response => {
      updateLists(response);
    });
  }

  useEffect(() => {
    fetch('http://localhost:3001/lists?_expand=color&_embed=tasks').then(res => res.json()).then(response => {
      updateLists(response);
    });

    fetch('http://localhost:3001/colors').then(res => res.json()).then(response => {
      updateColors(response);
    });

  }, []);



  const editListTitle = (id, title) => {
    const newList = lists.map(element => {
      if (element.id === id) {
        element.name = title
      }
      return element
    })
    updateLists(newList);
  }


  const newTask = (listId, obj) => {
    const array = lists.map(element => {
      if (element.id === listId) {
        element.tasks = [...element.tasks, obj]
      }
      return element
    })
    updateLists(array);
  }

  const onRemoveTask = (onTaskId , listId) => {
    const newList = lists.map(element => {
      if(element.id === listId){ 
        element.tasks = element.tasks.filter(item => item.id !== onTaskId)
      }
      return element
    })
    updateLists(newList)
    fetch('http://localhost:3001/tasks/' + onTaskId , {method: 'DELETE'})
    
  }

  const onEditTask = (listId, taskObj) => {

    const newText = window.prompt("Write new task", taskObj.text)

    if (!newText){
      return
    }

    const newList = lists.map(list => {
      if (list.id === listId) {
          list.tasks = list.tasks.map(task => {
            if(task.id === taskObj.id){
              task.text = newText;
            }
            return task
          })
      }
    return list
    })

    console.log(newList)
    updateLists(newList);

    fetch('http://localhost:3001/tasks/'+ taskObj.id,{ method: 'PATCH', headers:{'Content-Type': 'application/json' }, body: JSON.stringify({
      text: newText
    })})

  }

  useEffect (() => {
    const listId = window.location.pathname.split('lists/')[1];
    if (lists){
      const list = lists.find(item => item.id === Number(listId) )
      activateItem(list)
    }
  }, [lists , window.location.pathname]);

  return (

    <div className="todo">
      <div className="todo__sidebar">
        <div className="todo__list">
          <List items={[
            {
              active: !activeItem,
              icon: <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.96 5.10001H5.74001C5.24321 5.10001 5.20001 5.50231 5.20001 6.00001C5.20001 6.49771 5.24321 6.90001 5.74001 6.90001H10.96C11.4568 6.90001 11.5 6.49771 11.5 6.00001C11.5 5.50231 11.4568 5.10001 10.96 5.10001V5.10001ZM12.76 9.60001H5.74001C5.24321 9.60001 5.20001 10.0023 5.20001 10.5C5.20001 10.9977 5.24321 11.4 5.74001 11.4H12.76C13.2568 11.4 13.3 10.9977 13.3 10.5C13.3 10.0023 13.2568 9.60001 12.76 9.60001ZM5.74001 2.40001H12.76C13.2568 2.40001 13.3 1.99771 13.3 1.50001C13.3 1.00231 13.2568 0.600006 12.76 0.600006H5.74001C5.24321 0.600006 5.20001 1.00231 5.20001 1.50001C5.20001 1.99771 5.24321 2.40001 5.74001 2.40001ZM2.86001 5.10001H1.24001C0.743212 5.10001 0.700012 5.50231 0.700012 6.00001C0.700012 6.49771 0.743212 6.90001 1.24001 6.90001H2.86001C3.35681 6.90001 3.40001 6.49771 3.40001 6.00001C3.40001 5.50231 3.35681 5.10001 2.86001 5.10001ZM2.86001 9.60001H1.24001C0.743212 9.60001 0.700012 10.0023 0.700012 10.5C0.700012 10.9977 0.743212 11.4 1.24001 11.4H2.86001C3.35681 11.4 3.40001 10.9977 3.40001 10.5C3.40001 10.0023 3.35681 9.60001 2.86001 9.60001ZM2.86001 0.600006H1.24001C0.743212 0.600006 0.700012 1.00231 0.700012 1.50001C0.700012 1.99771 0.743212 2.40001 1.24001 2.40001H2.86001C3.35681 2.40001 3.40001 1.99771 3.40001 1.50001C3.40001 1.00231 3.35681 0.600006 2.86001 0.600006Z" fill="#7C7C7C" />
              </svg>
              ,
              name: 'All Tasks',
            }

          ]} onClickItem={() => { navigate(`/`) }}
          />
          {lists ? (
            <List items={lists} onClickItem={list => { navigate(`lists/${list.id}`) }} activeItem={activeItem} isRemovable onRemove={id => {
              const newList = lists.filter(item => item.id !== id)
              updateLists(newList)
            }} />) :
            ('Loading...')}
          <AddButtonList newCreatedList={newList} colors={colors} />
        </div>
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route path='/' element={lists && lists.map(list => <Tasks list={list} onItem={editListTitle} newTask={newTask} withoutEmpty key={list.id} onEditTask={onEditTask} /> )} />
        </Routes>

        {activeItem && lists && (<Tasks list={activeItem} onItem={editListTitle} newTask={newTask} removeTask={onRemoveTask} onEditTask={onEditTask}/> )}
      </div>
    </div>
  );
}

export default App;
