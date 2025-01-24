import React from 'react'
import DataAsset from './DataAsset'
import { FaTemperatureFull } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import Spinner from './Spinner';

const TodayContainer = ({ data }) => {
    if (!data || !data.currentConditions) {
        return Spinner({ loading: true })
    }

  return (
    <>
        <h2>Current Weather</h2>
        <div className='data-wrapper'>
            <DataAsset title={'Temperature'} value={`${data.currentConditions.temp} C°`} icon={FaTemperatureFull} />
            <DataAsset title={'Humidity'} value={`${data.currentConditions.humidity} %`} icon={WiHumidity} />
            <DataAsset title={'Wind speed'} value={data.currentConditions.windspeed} icon={FaWind} />
            <DataAsset title={'Conditions'} value={data.currentConditions.conditions} icon={IoIosSunny} />
        </div>
    </>
  )
}

export default TodayContainer