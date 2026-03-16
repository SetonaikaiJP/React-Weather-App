import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "weather-app-feature-flags-v1";

const FeatureFlagsContext = createContext(null);

const isEnabled = (value, fallback = true) => {
  if (value === undefined) {
    return fallback;
  }
  return String(value).toLowerCase() === "true";
};

const getDebugRibbonDefault = () =>
  isEnabled(
    import.meta.env.VITE_SHOW_DEBUG_RIBBON ?? import.meta.env.VITE_SHOW_DEMO_RIBBON,
    true
  );

const getDefaultFlags = () => ({
  showDebugRibbon: getDebugRibbonDefault(),
  showCityWeatherIcon: isEnabled(import.meta.env.VITE_SHOW_CITY_WEATHER_ICON, true),
});

export const FeatureFlagsProvider = ({ children }) => {
  const [flags, setFlags] = useState(getDefaultFlags);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const rawValue = localStorage.getItem(STORAGE_KEY);
      if (rawValue) {
        const savedFlags = JSON.parse(rawValue);
        setFlags((prev) => ({
          ...prev,
          ...savedFlags,
          showDebugRibbon:
            savedFlags.showDebugRibbon ?? savedFlags.showDemoRibbon ?? prev.showDebugRibbon,
        }));
      }
    } catch (error) {
      console.error("Unable to read feature flags from localStorage", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
  }, [flags, isHydrated]);

  const setFlag = (name, value) => {
    setFlags((prev) => ({ ...prev, [name]: Boolean(value) }));
  };

  const resetFlags = () => {
    const defaults = getDefaultFlags();
    setFlags(defaults);
  };

  const contextValue = useMemo(
    () => ({
      flags,
      setFlag,
      resetFlags,
    }),
    [flags]
  );

  return (
    <FeatureFlagsContext.Provider value={contextValue}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used inside FeatureFlagsProvider");
  }
  return context;
};
