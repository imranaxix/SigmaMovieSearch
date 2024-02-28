
import React from 'react';

const SkeletonBox = () => {
  return (
    <div className="animate-pulse bg-gray-800 border min-h-[400px] border-gray-700 rounded-md overflow-hidden">
      <div className="aspect-w-2 aspect-h-3">
        <div className="w-full h-full bg-gray-700"></div>
      </div>
      <div className="p-4">
        <div className="h-4 bg-gray-700 w-3/4 mb-2 px-[135px] rounded-md lg:px-[115px] py-40"></div>
        <div className="h-4 bg-gray-700 w-1/2 py- rounded-md"></div>
        
      </div>
    </div>
  );
};

export default SkeletonBox;