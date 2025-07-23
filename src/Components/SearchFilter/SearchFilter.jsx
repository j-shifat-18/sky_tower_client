import React from "react";

const SearchFilter = ({ minRent, maxRent, setMinRent, setMaxRent }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const min = Number(form.min.value);
    const max = Number(form.max.value);
    setMinRent(min);
    setMaxRent(max);
    // Parent will refetch apartments based on updated min/max rent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 mb-6"
    >
      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Min Rent:</label>
        <input
          type="number"
          name="min"
          defaultValue={minRent}
          placeholder="1000"
          className="input input-bordered w-28"
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="text-gray-700 font-medium">Max Rent:</label>
        <input
          type="number"
          name="max"
          defaultValue={maxRent}
          placeholder="5000"
          className="input input-bordered w-28"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 sm:mt-0">
        Search
      </button>
    </form>
  );
};

export default SearchFilter;
