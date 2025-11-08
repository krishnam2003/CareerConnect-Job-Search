// import React, { useEffect } from "react";
// import Navbar from "./Navbar";
// import Job1 from "./Job1";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import useGetAllJobs from "@/hooks/useGetAllJobs";

// const Browse = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector((store) => store.job);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     return () => {
//       dispatch(setSearchedQuery(""));
//     };
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto my-10">
//         <h1 className="font-bold text-xl my-10 ">
//           Search Results {allJobs.length}
//         </h1>
//         <div className="grid grid-cols-3 gap-4  ">
//           {allJobs.map((job) => {
//             return <Job1 key={job._id} job={job} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Browse;



import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Job1 from "./Job1";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { Search, Briefcase, Loader2 } from "lucide-react";

const Browse = () => {
  const { allJobs, loading } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  
  useGetAllJobs();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Search className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Browse All Jobs</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Discover your next career opportunity from our curated list of jobs
          </p>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              {allJobs.length} Job{allJobs.length !== 1 ? 's' : ''} Available
            </div>
          </div>
          
          {/* Sort/Filters could go here */}
          <div className="text-sm text-gray-500">
            Sorted by: <span className="font-semibold text-gray-700">Latest</span>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Loader2 className="h-12 w-12 text-blue-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Loading Jobs
            </h3>
            <p className="text-gray-600">Finding the best opportunities for you...</p>
          </motion.div>
        ) : (
          /* Jobs Grid */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {allJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  variants={itemVariants}
                  layout
                  whileHover={{ 
                    y: -6,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer"
                >
                  <Job1 job={job} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && allJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Briefcase className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Jobs Available
            </h3>
            <p className="text-gray-600 max-w-md text-lg mb-6">
              There are currently no job openings. Please check back later for new opportunities.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              onClick={() => window.location.reload()}
            >
              Refresh Jobs
            </motion.button>
          </motion.div>
        )}

        {/* Load More Button (Optional) */}
        {allJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Load More Jobs
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Browse;