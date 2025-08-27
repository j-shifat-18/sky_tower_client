import React from "react";

const SortByRent = ({sortOrder , setSortOrder ,setCurrentPage}) => {
    const handleSort = (e) =>{
        setSortOrder(e.target.value);
        setCurrentPage(1);
    }
  return (
    <div>
      <select name="sort" onChange={handleSort} value={sortOrder} className="select select-ghost border-primary">
        <option value="">Sort By</option>
        <option value="asc">Rent : Low to High</option>
        <option value="desc">Rent : High to Low</option>
      </select>
    </div>
  );
};

export default SortByRent;
