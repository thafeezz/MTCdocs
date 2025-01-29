import React, { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: number;
}

const Grid = ({ children, columns = 3 }: GridProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div 
        className={`
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-${columns} 
          gap-4 
          place-items-center
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default Grid;