import React from "react";
import Spinner from "./Spinner";

const FifteenDaysContainer = ({ data }) => {
  const handleHorizontalWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }
    event.preventDefault();
    event.currentTarget.scrollBy({
      left: event.deltaY,
      behavior: "smooth",
    });
  };

  const formatForecastDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);
    const localDate = new Date(year, month - 1, day, 12);
    return localDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (!data || !data.days) {
    return Spinner({ loading: true });
  }

  const forecastDays = data.days.slice(0, 15);

  return (
    <>
      <h2 className="container-title">15 Days Forecast</h2>
      <div className="data-wrapper forecast-wrapper" onWheel={handleHorizontalWheel}>
        {forecastDays.map((day) => (
          <div className="data-asset-forecast" key={day.datetime}>
            <p className="forecast-date">{formatForecastDate(day.datetime)}</p>
            <p className="data-value">{Math.round(day.temp)} °C</p>
            <p className="forecast-range">
              {Math.round(day.tempmin)} / {Math.round(day.tempmax)} °C
            </p>
            <p className="forecast-conditions">{day.conditions}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FifteenDaysContainer;
