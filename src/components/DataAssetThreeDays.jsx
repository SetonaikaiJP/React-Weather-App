import React from "react";
import { FaCloudRain } from "react-icons/fa";

const DataAssetThreeDays = ({ title, value, icon }) => {
  return (
    <>
      <div className="data-asset-three-days">
        <FaCloudRain className="data-icon" />
        <p className="data-value">{value} C°</p>
        <h3 className="data-title">{title}</h3>
      </div>
    </>
  );
};

export default DataAssetThreeDays;
