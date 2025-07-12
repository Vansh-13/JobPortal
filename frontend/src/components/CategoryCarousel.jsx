import React from 'react';
import {
  Briefcase, Code, BarChart2, PenTool, Layers,
  Smartphone, Settings, UserCheck, Globe, Database
} from 'lucide-react';

const categories = [
  { name: "Frontend Developer", icon: Code },
  { name: "Backend Developer", icon: Database },
  { name: "Data Scientist", icon: BarChart2 },
  { name: "Graphic Designer", icon: PenTool },
  { name: "Full Stack Developer", icon: Layers },
  { name: "Mobile App Developer", icon: Smartphone },
  { name: "DevOps Engineer", icon: Settings },
  { name: "UI/UX Designer", icon: UserCheck },
  { name: "Product Manager", icon: Briefcase },
  { name: "Web3 Developer", icon: Globe }
];

function CategoryCarousel() {
  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-semibold text-teal-700 mb-8 text-center">
        Explore Job Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {categories.map(({ name, icon: Icon }, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center gap-2 px-4 py-5 bg-white text-gray-700 text-sm font-normal border border-gray-200 rounded-lg shadow-sm hover:bg-teal-100 transition duration-200"
          >
            <Icon size={22} className="text-teal-600" />
            <span className="text-center">{name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryCarousel;
