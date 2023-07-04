/* eslint-disable no-plusplus */
import React from 'react';

interface MasonryLayoutProps {
  columns?: number;
  gap?: number;
  className?: string;
  children: React.ReactNode[];
}

const MasonryLayout = (props: MasonryLayoutProps) => {
  const { columns = 2, gap = 20, className, children } = props;

  const columnWrapper: any = {};
  const result: any = [];

  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={i} style={{ marginBottom: `${gap}px` }}>
        {children[i]}
      </div>
    );
  }

  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: `${i > 0 ? gap : 0}px`,
          flex: 1,
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div className={className} style={{ display: 'flex' }}>
      {result}
    </div>
  );
};

export default MasonryLayout;
