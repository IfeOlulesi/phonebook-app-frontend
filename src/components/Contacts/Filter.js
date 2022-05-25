import React from "react";

const Filter = ({ filterQuery, filterHandler }) => {
  return (
    <div className="filterRoot">
      <h2>Search</h2>
      <input
        type="text" value={filterQuery} onChange={filterHandler} 
        className="filterSearch" placeholder="Type here... "
      />
    </div>
  );
};

export default Filter;