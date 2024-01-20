import React from 'react';
import './List.scss';
import Badge from '../Badge/Badge'
import classNames from 'classnames';
import remove from '../../assets/img/remove.svg'

function List({ items, onClick, isRemovable, onRemove, onClickItem, activeItem }) {
// Resolve conflict
    const removeElement = (item) => {
        fetch('http://localhost:3001/lists/' + item.id, {
            method: 'DELETE'
        }).then(() => {
            onRemove(item.id)
        })
    }
    return (

        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    <li onClick={onClickItem ? () => onClickItem(item) : null} key={index} className={classNames(item.className, { active: item.active ? item.active : activeItem && activeItem.id === item.id })}>
                        <div>
                            <i>
                                {item.icon ? item.icon : <Badge color={item.color.name} />}
                            </i>
                            <span>{item.name} {item.tasks && `(${item.tasks.length})`}</span>
                        </div>
                        {isRemovable && <img onClick={() => removeElement(item)} className="list__remove-icon" src={remove} alt="x" />}
                    </li>
                ))
            }
        </ul>
    )
}

export default List;