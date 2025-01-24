import React from 'react'
import DataAssetThreeDays from './DataAssetThreeDays'
import Spinner from './Spinner'


const ThreeDaysContainer = ({ data }) => {
  const days = ['Today', 'Tomorrow', 'Day after tomorrow']

  if (!data || !data.days) {
    return Spinner({ loading: true })
  }

  return (
    <>
      <h2 className='container-title'>3 Days Weather</h2>
      <div className='data-wrapper three-days-wrapper'>
        {data.days.slice(0,3).map((day, index) => {
          return (
            <DataAssetThreeDays 
              key={index}
              title={days[index]}
              value={day.temp}
              icon={day.icon}
            />
          )
        })}
      </div>
    </>
  )
}

export default ThreeDaysContainer