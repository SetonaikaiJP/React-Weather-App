import React from "react";
import Spinner from "./Spinner";
import DataAssetThreeDays from "./DataAssetThreeDays";

const WeekContainer = ({ data }) => {
  const days = ["Today", "Tomorrow", "in 2 days", "in 3 days", "in 4 days", "in 5 days", "in 6 days"];

  if (!data || !data.days) {
    return Spinner({ loading: true });
  }

  return (
    <>
      <h2 className='container-title'>Week Weather</h2>
      <div className='data-wrapper week-wrapper'>
        {data.days.slice(0,7).map((day, index) => {
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
  );
};

export default WeekContainer;
