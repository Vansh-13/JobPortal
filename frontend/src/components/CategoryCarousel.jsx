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
    <section className="py-16 px-4 bg-gradient-to-t from-white via-gray-50 to-teal-50">
      <h2 className="text-4xl font-bold text-center text-teal-700 mb-12">
        🔍 Explore Career Categories
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {categories.map(({ name, icon: Icon }, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-3 px-6 py-8 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-md hover:shadow-lg hover:bg-white transition duration-200 transform hover:scale-105"
          >
            <Icon size={28} className="text-cyan-600" />
            <span className="text-center text-gray-800 font-medium text-sm">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryCarousel;
