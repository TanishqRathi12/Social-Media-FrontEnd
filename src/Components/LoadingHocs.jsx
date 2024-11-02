import React from "react";

const withLoading = (Wrapper) => {
  return (props) => {
    const { isLoading, ...otherProps } = props;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
  <div className="text-center">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-t-4 border-t-transparent border-blue-600 animate-spin"></div>
      <div className="absolute inset-0 rounded-full border-4 border-b-4 border-b-transparent border-blue-400 opacity-50 animate-spin-reverse"></div>
    </div>
    <h3 className="mt-6 text-2xl font-semibold text-gray-800 animate-pulse">
      Loading, please wait...
    </h3>
  </div>
</div>

      );
    }

    return <Wrapper {...otherProps} />;
  };
};

export default withLoading;
