import React, { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  columns?: number;
}

const Grid = ({ children, columns = 3 }: GridProps) => {
  // Map number of columns to Tailwind classes
  const getGridColumns = (cols: number) => {
    const gridMap = {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
    };
    return gridMap[cols as keyof typeof gridMap] || 'lg:grid-cols-4';
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 my-1">
      <div 
        className={`
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          ${getGridColumns(columns)}
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