import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { DiAtom } from "react-icons/di";
import { WiRain, WiDaySunny, WiCloudy, WiSnow } from "react-icons/wi";
import NavButton from "../components/NavButton";
import "../css/MainLayout.css";
import TodayContainer from "../components/TodayContainer";
import ThreeDaysContainer from "../components/ThreeDaysContainer";
import WeekContainer from "../components/WeekContainer";
import FifteenDaysContainer from "../components/FifteenDaysContainer";
import { useFeatureFlags } from "../context/FeatureFlagsContext";

const MainLayout = () => {
  const { flags } = useFeatureFlags();
  const [weatherData, setWeatherData] = useState(null);
  const [selectedMode, setSelectedMode] = useState("Today");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [logoSpinToken, setLogoSpinToken] = useState(0);

  useEffect(() => {
    if (!weatherData) {
      return;
    }
    setIsTableVisible(true);
  }, [weatherData]);

  const fetchData = async () => {
    if (!city.trim()) {
      return;
    }

    setLogoSpinToken((prev) => prev + 1);

    const apiUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const apiKey = "AT8BM3QEXYAMZH68R7E36LYTD";
    const requestUrl = `${apiUrl}${encodeURIComponent(
      city.trim()
    )}?unitGroup=metric&key=${apiKey}&contentType=json`;

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
        setCityName("City not found");
        setWeatherData(null);
        setIsTableVisible(false);
        return;
      }

      const data = await res.json();
      setCityName(data.address.charAt(0).toUpperCase() + data.address.slice(1));
      setWeatherData(data);
      setCity("");
    } catch (error) {
      console.error("Error fetching data", error);
      setCityName("Request failed");
      setWeatherData(null);
      setIsTableVisible(false);
    }
  };

  const onInputKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const renderContainer = () => {
    switch (selectedMode) {
      case "Today":
        return <TodayContainer data={weatherData} />;
      case "3 Days":
        return <ThreeDaysContainer data={weatherData} />;
      case "Week":
        return <WeekContainer data={weatherData} />;
      case "15 Days":
        return <FifteenDaysContainer data={weatherData} />;
      default:
        return null;
    }
  };

  const modeContentKey = `${selectedMode}-${cityName}`;

  const getCityWeatherIcon = () => {
    const current = weatherData?.currentConditions;
    if (!current) {
      return null;
    }

    const conditions = String(current.conditions || "").toLowerCase();
    const icon = String(current.icon || "").toLowerCase();
    const precipTypes = Array.isArray(current.preciptype)
      ? current.preciptype.map((item) => String(item).toLowerCase())
      : [];
    const cloudCover = Number(current.cloudcover || 0);
    const snowValue = Number(current.snow || 0);

    const hasRain = precipTypes.includes("rain") || conditions.includes("rain");
    const isClear =
      conditions.includes("clear") ||
      conditions.includes("sunny") ||
      icon.includes("clear");
    const isCloudy = cloudCover >= 30;
    const hasSnow =
      snowValue > 0 ||
      precipTypes.includes("snow") ||
      conditions.includes("snow");

    if (hasRain) {
      return <WiRain className="city-weather-icon" aria-label="Rain" />;
    }
    if (isClear) {
      return <WiDaySunny className="city-weather-icon" aria-label="Clear" />;
    }
    if (isCloudy) {
      return <WiCloudy className="city-weather-icon" aria-label="Cloudy" />;
    }
    if (hasSnow) {
      return <WiSnow className="city-weather-icon" aria-label="Snow" />;
    }

    return null;
  };

  return (
    <>
      <div className={`container-nav ${isTableVisible ? "with-results" : ""}`}>
        {flags.showDebugRibbon && (
          <div className="debug-ribbon" aria-hidden="true">
            <span>DEBUG</span>
          </div>
        )}
        <DiAtom
          key={logoSpinToken}
          className={`logo ${logoSpinToken > 0 ? "logo-spin-once" : ""}`}
        />
        <h1 className="main-title">Weather App</h1>
        <div
          key={cityName}
          className={`city-name-wrapper ${cityName ? "city-name-animate" : ""}`}
        >
          <p className="city-name">{cityName}</p>
          {flags.showCityWeatherIcon && cityName && getCityWeatherIcon()}
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            placeholder={"Enter your city"}
            className="search-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={onInputKeyDown}
          />
          <button className="search-btn" onClick={fetchData}>
            Search
          </button>
          <div className="onboarding-tooltip-wrapper">
            <span className="onboarding-btn" aria-hidden="true">?</span>
            <div className="onboarding-tooltip" role="tooltip">
              Enter your city in the input and press "Enter" to get the
              forecase for various periods
            </div>
          </div>
          <Link className="admin-link-btn" to="/admin">
            Admin
          </Link>
        </div>
        {isTableVisible && (
          <div className="nav-btn-wrapper">
            <NavButton title={"Today"} onClick={() => setSelectedMode("Today")} />
            <NavButton title={"3 Days"} onClick={() => setSelectedMode("3 Days")} />
            <NavButton title={"Week"} onClick={() => setSelectedMode("Week")} />
            <NavButton
              title={"15 Days"}
              onClick={() => setSelectedMode("15 Days")}
            />
          </div>
        )}
      </div>

      {isTableVisible && (
        <div className="container-table">
          <div key={modeContentKey} className="mode-content">
            {renderContainer()}
          </div>
        </div>
      )}

      <Outlet />
    </>
  );
};

export default MainLayout;
