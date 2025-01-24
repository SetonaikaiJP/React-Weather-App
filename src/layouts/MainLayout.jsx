import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DiAtom } from "react-icons/di";
import NavButton from "../components/NavButton";
import "../css/MainLayout.css";
import TodayContainer from "../components/TodayContainer";
import ThreeDaysContainer from "../components/ThreeDaysContainer";
import WeekContainer from "../components/WeekContainer";

const MainLayout = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedMode, setSelectedMode] = useState("Today");
  const navButtonTitles = ["Today", "3 Days", "Week"];

  useEffect(() => {
    const input = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");
    const containerTable = document.querySelector("#container-table");
    const containerNav = document.querySelector(".container-nav");

    const fetchData = async (city) => {
      if (!city) {
        console.error("City name is required");
        return;
      }

      input.value = "";

      const cityTitle = document.querySelector(".city-name");
      const apiUrl =
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
      const apiKey = "AT8BM3QEXYAMZH68R7E36LYTD";

      const requestUrl = `${apiUrl}${encodeURIComponent(
        city
      )}?unitGroup=metric&key=${apiKey}&contentType=json`;
      console.log("Request URL:", requestUrl);

      try {
        const res = await fetch(requestUrl);

        if (!res.ok) {
          const errorText = await res.text();
          console.error(
            "Error fetching data:",
            res.status,
            res.statusText,
            errorText
          );
          cityTitle.textContent = "City not found";
          return;
        }

        const data = await res.json();

        containerTable.style.display = "flex";
        containerNav.style.borderRadius = "15px 15px 0 0";
        containerTable.style.borderRadius = "0 0  15px 15px";

        cityTitle.textContent =
          data.address.charAt(0).toUpperCase() + data.address.slice(1);
        console.log(data);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    searchBtn.addEventListener("click", () => {
      fetchData(input.value);
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        fetchData(input.value);
      }
    });
  }, [setWeatherData]);

  const renderContainer = () => {
    switch (selectedMode) {
      case "Today":
        return <TodayContainer data={weatherData} />;
      case "3 Days":
        return <ThreeDaysContainer data={weatherData} />;
      case "Week":
        return <WeekContainer data={weatherData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="container-nav">
        <DiAtom className="logo" />
        <h1 className="main-title">Weahter App</h1>
        <p className="city-name"></p>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={"Enter your city"}
            className="search-input"
          />
          <button className="search-btn">Search</button>
        </div>
        <div className="nav-btn-wrapper">
          <NavButton title={"Today"} onClick={() => setSelectedMode("Today")} />
          <NavButton title={"3 Days"} onClick={() => setSelectedMode("3 Days")} />
          <NavButton title={"Week"} onClick={() => setSelectedMode("Week")} />
        </div>
      </div>

      <div className="container-table" id="container-table">
        {renderContainer()}
      </div>

      <Outlet />
    </>
  );
};

export default MainLayout;
