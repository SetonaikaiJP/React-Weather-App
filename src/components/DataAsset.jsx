import React from 'react'

const DataAsset = ({ title, value, icon: Icon }) => {
  return (
    <>
        <div className='data-asset'>
            <Icon/>
            <p className='data-value'>{value}</p>
            <h3 className='data-title'>{title}</h3>
        </div>
    </>
  )
}

export default DataAsset