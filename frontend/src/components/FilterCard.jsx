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
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Filter Jobs</h2>
      <hr className="border-gray-200" />

      {filterData.map((filter, index) => (
        <div key={index}>
          <h3 className="text-sm font-medium text-gray-700 mb-2">{filter.filterType}</h3>
          <div className="space-y-2">
            {filter.arrays.map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={filter.filterType}
                  id={`${filter.filterType}-${item}`}
                  value={item}
                  className="accent-teal-600"
                />
                <label htmlFor={`${filter.filterType}-${item}`} className="text-sm text-gray-600">
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
