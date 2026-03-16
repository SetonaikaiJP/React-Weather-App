import { useNavigate } from "react-router-dom";
import { useFeatureFlags } from "../context/FeatureFlagsContext";
import "../css/AdminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const { flags, setFlag, resetFlags } = useFeatureFlags();

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1 className="admin-title">Feature Toggles</h1>
        <p className="admin-subtitle">
          Changes are applied instantly and saved in localStorage.
        </p>

        <label className="toggle-row">
          <span>Show DEBUG ribbon</span>
          <input
            type="checkbox"
            checked={flags.showDebugRibbon}
            onChange={(e) => setFlag("showDebugRibbon", e.target.checked)}
          />
        </label>

        <label className="toggle-row">
          <span>Show city weather icon</span>
          <input
            type="checkbox"
            checked={flags.showCityWeatherIcon}
            onChange={(e) => setFlag("showCityWeatherIcon", e.target.checked)}
          />
        </label>

        <div className="admin-actions">
          <button className="admin-btn reset-btn" onClick={resetFlags} type="button">
            Reset defaults
          </button>
          <button
            className="admin-btn back-btn"
            onClick={() => navigate("/")}
            type="button"
          >
            Back to app
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
