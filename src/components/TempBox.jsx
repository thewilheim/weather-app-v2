import React from 'react'

function TempBox(props) {
    const {time, image, temp} = props

  return (
    <div className="tempBox">
    <p>{time}</p>
    <div>
        <img src={image} alt="" />
        <p>{temp}&#176;</p>
    </div>
    </div>
  )
}

export default TempBox