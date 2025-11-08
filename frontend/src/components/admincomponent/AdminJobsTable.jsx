import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Briefcase, Building2, Calendar, Users, FileText, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

const AdminJobsTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, searchJobByText, loading } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job.jobType?.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

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
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const loadingVariants = {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getJobTypeColor = (jobType) => {
    const type = jobType?.toLowerCase();
    if (type?.includes('full')) return 'bg-blue-100 text-blue-800';
    if (type?.includes('part')) return 'bg-green-100 text-green-800';
    if (type?.includes('contract')) return 'bg-purple-100 text-purple-800';
    if (type?.includes('remote')) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center"
      >
        <motion.div
          variants={loadingVariants}
          animate="animate"
          className="flex flex-col items-center justify-center py-8"
        >
          <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Jobs
          </h3>
          <p className="text-gray-600">Please wait while we fetch your posted jobs...</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      {/* Summary Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Jobs</p>
              <p className="text-2xl font-bold text-blue-900">{allAdminJobs.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-green-600 font-medium">Companies</p>
              <p className="text-2xl font-bold text-green-900">
                {[...new Set(allAdminJobs.map(job => job.company?._id))].length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Search className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">Filtered</p>
              <p className="text-2xl font-bold text-purple-900">{filterJobs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-orange-600 font-medium">Active</p>
              <p className="text-2xl font-bold text-orange-900">{allAdminJobs.length}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="border-b border-gray-200 hover:bg-transparent">
              <TableHead className="font-semibold text-gray-900 py-4">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Details
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Posted
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900 py-4">Type</TableHead>
              <TableHead className="text-right font-semibold text-gray-900 py-4">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <AnimatePresence>
              {filterJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-gray-500"
                    >
                      <Briefcase className="h-16 w-16 mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Jobs Found
                      </h3>
                      <p className="text-gray-600 max-w-sm text-center">
                        {searchJobByText 
                          ? `No jobs found matching "${searchJobByText}"`
                          : "No jobs have been posted yet."
                        }
                      </p>
                    </motion.div>
                  </TableCell>
                </TableRow>
              ) : (
                filterJobs.map((job, index) => (
                  <motion.tr
                    key={job._id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200 group"
                  >
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {job?.company?.name || "Unknown Company"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {job.location || "Location not specified"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="h-3 w-3" />
                          <span>{job.position || 0} positions</span>
                          {job.salary && (
                            <>
                              <span>•</span>
                              <span>${job.salary}LPA</span>
                            </>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        {formatDate(job.createdAt)}
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-4">
                      <Badge className={`${getJobTypeColor(job.jobType)} border-0 text-xs font-medium`}>
                        {job.jobType || "Not specified"}
                      </Badge>
                    </TableCell>
                    
                    <TableCell className="py-4 text-right">
                      <Popover>
                        <PopoverTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                          </motion.button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2" align="end">
                          <div className="space-y-1">
                            <motion.button
                              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                              onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-200"
                            >
                              <Edit2 className="h-4 w-4" />
                              Edit Job
                            </motion.button>
                            <motion.button
                              whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-200"
                            >
                              <Eye className="h-4 w-4" />
                              View Applicants
                            </motion.button>
                            <motion.button
                              whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                              onClick={() => navigate(`/description/${job._id}`)}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg transition-colors duration-200"
                            >
                              <FileText className="h-4 w-4" />
                              View Details
                            </motion.button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </motion.div>
    </motion.div>
  );
};

export default AdminJobsTable;


















// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";

// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Edit2, Eye, MoreHorizontal } from "lucide-react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AdminJobsTable = () => {
//   const { companies, searchCompanyByText } = useSelector(
//     (store) => store.company
//   );
//   const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
//   const navigate = useNavigate();

//   const [filterJobs, setFilterJobs] = useState(allAdminJobs);

//   useEffect(() => {
//     const filteredJobs =
//       allAdminJobs.length >= 0 &&
//       allAdminJobs.filter((job) => {
//         if (!searchJobByText) {
//           return true;
//         }
//         return (
//           job.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
//           job?.company?.name
//             .toLowerCase()
//             .includes(searchJobByText.toLowerCase())
//         );
//       });
//     setFilterJobs(filteredJobs);
//   }, [allAdminJobs, searchJobByText]);

//   console.log("COMPANIES", companies);
//   if (!companies) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <Table>
//         <TableCaption>Your recent Posted Jobs</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Company Name</TableHead>
//             <TableHead>Role</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {filterJobs.length === 0 ? (
//             <span>No Job Added</span>
//           ) : (
//             filterJobs?.map((job) => (
//               <TableRow key={job.id}>
//                 <TableCell>{job?.company?.name}</TableCell>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>{job.createdAt.split("T")[0]}</TableCell>
//                 <TableCell className="text-right cursor-pointer">
//                   <Popover>
//                     <PopoverTrigger>
//                       <MoreHorizontal />
//                     </PopoverTrigger>
//                     <PopoverContent className="w-32">
//                       <div
//                         onClick={() => navigate(`/admin/companies/${job._id}`)}
//                         className="flex items-center gap-2 w-fit cursor-pointer mb-1"
//                       >
//                         <Edit2 className="w-4" />
//                         <span>Edit</span>
//                       </div>
//                       <hr />
//                       <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-1">
//                         <Eye className="w-4"></Eye>
//                         <span>Applicants</span>
//                       </div>
//                     </PopoverContent>
//                   </Popover>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default AdminJobsTable;