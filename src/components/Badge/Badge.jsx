import React from 'react'
import './Badge.scss'
import classNames from 'classnames'

// `badge badge--${color}`

function Badge({onClick , color, className}) {
  return (
    
      <i onClick={onClick} className={classNames('badge', {[`badge--${color}`] : color} , className)}></i>
   
  )
}

export default Badge