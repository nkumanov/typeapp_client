import React from "react";
import { Audio } from "react-loader-spinner";
export const LoadingComponent = () => {
  return (
    <div className="spinner">
      <Audio height="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};
