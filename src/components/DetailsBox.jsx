import React from 'react'


function WeatherDetails(props) {
    const {title, data, image } = props
  return (
          <div className="detailsBox">
            <div>
              <p>{title.toUpperCase()}</p>
              <strong>{data}</strong>
            </div>
            <img src={image} alt={title} />
          </div>
  )
}

export default WeatherDetails