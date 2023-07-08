import React from 'react';
import './List.scss';
import Badge from '../Badge/Badge'
import classNames from 'classnames';

function List({items , onClick}){
    return(
        <ul onClick={onClick}  className="list"> 
            { 
            items.map((item , index) => (
                    <li key={index} className={classNames(item.className, {'active': item.active})}>
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color} /> }
                        </i>
                        <span>{item.name}</span>
                    </li>
            ))
            }
        </ul>
    )
}

export default List;