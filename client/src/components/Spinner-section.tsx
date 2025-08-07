import React from "react";

const SectionSpinner = () => {
  return (
     <div className="flex justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default SectionSpinner;