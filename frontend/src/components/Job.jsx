import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

function Job() {
  return (
    <div className="border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-6 bg-white transition-all flex flex-col justify-between h-full">
      {/* Header Row */}
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://cdn-icons-png.flaticon.com/512/2504/2504799.png"
            alt="Company Logo"
          />
        </Avatar>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 transition">
            Frontend Developer
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
            <span>JobWorld Inc.</span>
            <span>• Remote</span>
            <span>• ₹6–10 LPA</span>
            <span>• 2 days ago</span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            Join a fast-paced team to build beautiful, performant web apps using React, Tailwind CSS, and cutting-edge frameworks.
          </p>
        </div>
      </div>

      {/* Footer Row */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">3 Positions</span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Full-time</span>
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-5 h-5 text-gray-500 hover:text-teal-600" />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-wrap gap-3">
        <Button className="px-4 py-2 text-sm font-medium rounded-md">
          View Details
        </Button>
        <Button variant="secondary" className="px-4 py-2 text-sm font-medium rounded-md">
          Save for Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
