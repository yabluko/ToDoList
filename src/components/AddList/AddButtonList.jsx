import List from '../List/List'
import './AddButtonList.scss'
import Badge from '../Badge/Badge'
import React, { useState } from 'react';
import close from '../../assets/img/close.svg'

function AddButtonList({ colors }) {
  const [visiblePopup, showPopup] = useState(false);
  const [selectedColor, selectColor] = useState(colors[0].id);
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
          <input className='field' type='text' placeholder='Name of list' />
          <div className='palitra'>
            {
              colors.map(color => (
                <Badge onClick={() => selectColor(color.id)} key={color.id} color={color.name} className={selectedColor === color.id && 'active'}/>
              ))
            }
          </div>
          <button className='button' >Add</button>
        </div>)
      }

    </div>
  )
}

export default AddButtonList;