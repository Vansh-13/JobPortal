import React from 'react';

const filterData = [
  {
    filterType: "Location",
    arrays: ["Delhi NCR", "Pune", "Mumbai", "Hyderabad"],
  },
  {
    filterType: "Industry",
    arrays: ["IT", "Finance", "Marketing", "Healthcare"],
  },
  {
    filterType: "Salary",
    arrays: ["0–40K", "40K–80K", "80K–120K", "120K+"],
  },
];

function FilterCard() {
  return (
    <div className="bg-white/90 backdrop-blur rounded-xl border border-gray-100 shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Filter Jobs</h2>

      {filterData.map((filter, index) => (
        <div key={index} className="space-y-3">
          {/* Section Header */}
          <h3 className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-md inline-block">
            {filter.filterType}
          </h3>

          {/* Filter Options */}
          <div className="space-y-2">
            {filter.arrays.map((item, i) => (
              <label
                key={i}
                htmlFor={`${filter.filterType}-${item}`}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name={filter.filterType}
                  id={`${filter.filterType}-${item}`}
                  value={item}
                  className="accent-teal-600 w-4 h-4 group-hover:scale-110 transition-transform duration-150"
                />
                <span className="text-sm text-gray-700 group-hover:text-teal-700 transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
