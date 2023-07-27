import List from '../List/List'
import Badge from '../Badge/Badge'

import React, { useState, useEffect } from 'react';

import './AddButtonList.scss'

import close from '../../assets/img/close.svg'

function AddButtonList({ colors , newCreatedList }) {
  
  const [visiblePopup, showPopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const generateFunction = () => {
    if (!inputValue) {
      alert('Write something');
      return;
    }
    else {
      const colorSelected = colors.filter((color) => color.id === selectedColor)[0].name;
      fetch('http://localhost:3001/lists', {method: 'POST',headers: {'Content-Type': 'application/json' } , body: JSON.stringify({
        name: inputValue,
        colorId: selectedColor,
      })}).then(response => response.json()).then(res =>  {
        const listObj = { ...res , color : { name: colorSelected } }
        newCreatedList(listObj)
        showPopup();
        setInputValue('')
      })
      
    }

  }

  return (
    <div className='add-list'>
      <List onClick={() => showPopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            ,
            name: 'Add Folder',
          }
        ]} />

      { visiblePopup && (
        <div className='add-list__popup'>
          <img onClick={() => showPopup(false)}  src={close} alt="close button" className='add-list__popup-close-btn'/>
          <input value={inputValue} onChange={event =>{
            setInputValue(event.target.value);
          }} className='field' type='text' placeholder='Name of list' />
          <div className='palitra'>
            {
              colors.map(color => (
                <Badge onClick={() => selectColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && 'active'}/>
              ))
            }
          </div>
          <button onClick={generateFunction} className='button'>Add</button>
        </div>)
      }

    </div>
  )
}

export default AddButtonList;