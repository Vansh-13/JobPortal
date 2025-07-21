import React from 'react';
import { Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

function Job({ job }) {
  
  const navigate = useNavigate();

  return (
    <div className="border border-gray-100 shadow-sm hover:shadow-lg rounded-2xl p-6 bg-white/80 backdrop-blur-md transition-all flex flex-col justify-between h-full space-y-5">
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo || "https://cdn-icons-png.flaticon.com/512/2504/2504799.png"}
            alt={`${job?.company?.name || 'Company'} Logo`}
          />
        </Avatar>

        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 hover:text-teal-600 transition">
            {job?.title || 'Job Title'}
          </h3>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mt-1">
            <span>{job?.company?.name || 'Company'}</span>
            <span>• {job?.location || 'Location'}</span>
            <span>• {job?.salary || '₹ Not Mentioned'}</span>
            <span>• {job?.posted || '2 days ago'}</span>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {job?.description || 'No description available.'}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {job?.positions ? `${job.positions} Positions` : 'N/A'}
          </span>
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
            {job?.jobType || 'Full-time'}
          </span>
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="w-5 h-5 text-gray-500 hover:text-teal-600 transition" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:scale-[1.02] transition"
          onClick={() => navigate(`/description/${job?._id}`, { state: { job } })}
        >
          View Details
        </Button>
        <Button
          variant="secondary"
          className="px-4 py-2 text-sm font-medium rounded-md text-teal-600 border-teal-300"
        >
          Save for Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
