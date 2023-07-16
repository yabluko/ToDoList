import React from 'react';
import './List.scss';
import Badge from '../Badge/Badge'
import classNames from 'classnames';
import remove from '../../assets/img/remove.svg'

function List({items , onClick , isRemovable, onRemove}){

    const removeElement = (item) => {
        fetch('http://localhost:3001/lists/' + item.id ,{
            method: 'DELETE'
        }).then(() => {
            onRemove(item.id)
        }
        )
    }

    return(
        <ul onClick={onClick}  className="list"> 
        
            { 
            items.map((item , index) => (
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <div>
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name} /> }
                        </i>
                        <span>{item.name}</span>
                        </div>
                        {isRemovable && <img onClick={() =>  removeElement(item)} className="list__remove-icon" src={remove} alt="" />}
                    </li>
            ))
            }
        </ul>
    )
}

export default List;