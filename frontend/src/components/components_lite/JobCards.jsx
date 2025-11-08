import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  Building
} from "lucide-react";

const JobCards = ({ job, index }) => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: index * 0.1
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const iconVariants = {
    hover: {
      x: 4,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  // Format salary display
  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return `${salary} LPA`;
  };

  // Truncate description
  const truncateDescription = (text, maxLength = 120) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative p-6 rounded-2xl bg-white border border-gray-200/80 cursor-pointer overflow-hidden"
    >
      {/* Gradient Border Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Company Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-200">
                {job.name || "Company Name"}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin className="h-3 w-3" />
                <span>{job.location || "Location not specified"}</span>
              </div>
            </div>
          </div>
          
          {/* View Details Arrow */}
          <motion.div
            variants={iconVariants}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-100 p-2 rounded-lg"
          >
            <ArrowRight className="h-4 w-4 text-blue-600" />
          </motion.div>
        </div>

        {/* Job Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-800 transition-colors duration-200">
          {job.title || "Job Title"}
        </h2>

        {/* Job Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {truncateDescription(job.description)}
        </p>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Positions */}
          <Badge 
            variant="secondary" 
            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors duration-200 flex items-center gap-1 justify-center py-1.5"
          >
            <Users className="h-3 w-3" />
            <span className="font-semibold">{job.position || 0} Open</span>
          </Badge>

          {/* Salary */}
          <Badge 
            variant="secondary" 
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 transition-colors duration-200 flex items-center gap-1 justify-center py-1.5"
          >
            <DollarSign className="h-3 w-3" />
            <span className="font-semibold">{formatSalary(job.salary)}</span>
          </Badge>

          {/* Location */}
          <Badge 
            variant="secondary" 
            className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 transition-colors duration-200 flex items-center gap-1 justify-center py-1.5"
          >
            <MapPin className="h-3 w-3" />
            <span className="font-semibold truncate">{job.location || "Remote"}</span>
          </Badge>

          {/* Job Type */}
          <Badge 
            variant="secondary" 
            className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 transition-colors duration-200 flex items-center gap-1 justify-center py-1.5"
          >
            <Clock className="h-3 w-3" />
            <span className="font-semibold">{job.jobType || "Full-time"}</span>
          </Badge>
        </div>

        {/* Experience Level (if available) */}
        {job.experience && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Briefcase className="h-3 w-3" />
            <span>{job.experience}</span>
          </div>
        )}

        {/* Posted Date (if available) */}
        {job.createdAt && (
          <div className="text-xs text-gray-400 text-right">
            Posted {new Date(job.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
};

export default JobCards;



















// import React from "react";
// import { Badge } from "../ui/badge";
// import { useNavigate } from "react-router-dom";


// const JobCards = ({job}) => {
//   console.log(job);
//   const navigate = useNavigate();
 
//   return (
//     <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white  border border-gray-200 cursor-pointer hover:shadow-2xl hover:shadow-blue-200 hover:p-3 ">
//       <div>

//         <h1 className="text-lg font-medium"> {job.name} </h1>
       
//         <p className="text-sm text-gray-600">India</p>
//       </div>
//       <div>
//         <h2 className="font-bold text-lg my-2">{job.title}</h2>
//         <p className="text-sm text-gray-600">
//           {
//             job.description
//           }
//         </p>
//       </div>
//       <div className=" flex gap-2 items-center mt-4 ">
//         <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
//           {job.position} Open Positions
//         </Badge>
//         <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
//           {job.salary}LPA
//         </Badge>
//         <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>
//           {job.location}
//         </Badge>
//         <Badge className={" text-black font-bold"} variant={"ghost"}>
//           {job.jobType}
//         </Badge>
//       </div>
//     </div>
//   );
// };

// export default JobCards;