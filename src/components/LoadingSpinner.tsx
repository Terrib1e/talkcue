
import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center py-16 animate-fade-in">
    <span className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin"></span>
  </div>
);

export default LoadingSpinner;
