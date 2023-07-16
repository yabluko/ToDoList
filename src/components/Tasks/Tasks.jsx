import React from 'react'
import svgIcon from '../../assets/img/pencil.svg'
// import vikeIcon from '../../assets/img/V.svg'
import './Tasks.scss'

function Tasks({ list }) {
    return (
        <div className='tasks'>
            <h2 className='tasks__title'>
                {list.name}
                <img src={svgIcon} alt="img" />
            </h2>
            <div className='tasks__items'>
                {list.tasks.map(element => (
                    <div key={element.id} className="tasks__items-row">

                        <div className='checkbox'>

                            <input id={`task-${element.id}`} type='checkbox' />
                            <label htmlFor={`task-${element.id}`}>
                                <svg
                                    width="11"
                                    height="8"
                                    viewBox="0 0 11 8"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                        stroke="#000"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </label>

                        </div>
                        <input readOnly value={element.text} />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Tasks