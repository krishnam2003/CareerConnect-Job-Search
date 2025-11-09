






import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

const Description = () => {
  const params = useParams();
  const jobId = params.id;

  const { singleJob } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        console.log(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data);
        if (res.data.status) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);
  console.log("single jobs", singleJob);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto my-10">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="h-6 bg-gray-200 rounded w-24"></div>
            <div className="h-6 bg-gray-200 rounded w-28"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
          <div className="space-y-3">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-1/2"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!singleJob) {
    return (
      <div className="max-w-7xl mx-auto my-10 text-center py-20">
        <div className="text-gray-500 text-lg">No job details found</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto my-10 text-center py-20">
        <div className="text-red-500 text-lg">{error}</div>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-[#6B3AC2] hover:bg-[#552d9b]"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="font-bold text-3xl text-gray-900 mb-2">
                {singleJob?.title}
              </h1>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {singleJob?.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-semibold px-3 py-1.5">
                  {singleJob?.position} Open Positions
                </Badge>
                <Badge className="bg-orange-50 text-[#FA4F09] border-orange-200 font-semibold px-3 py-1.5">
                  {singleJob?.salary} LPA
                </Badge>
                <Badge className="bg-purple-50 text-[#6B3AC2] border-purple-200 font-semibold px-3 py-1.5">
                  {singleJob?.location}
                </Badge>
                <Badge className="bg-gray-50 text-gray-800 border-gray-200 font-semibold px-3 py-1.5">
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>
            <div className="lg:text-right">
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-xl px-8 py-2.5 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isApplied
                    ? "bg-gray-100 text-gray-600 border border-gray-300 cursor-not-allowed hover:scale-100"
                    : "bg-gradient-to-r from-[#6B3AC2] to-[#8B5CF6] hover:from-[#552d9b] hover:to-[#7C3AED] text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {isApplied ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Already Applied
                  </span>
                ) : (
                  "Apply Now"
                )}
              </Button>
              {!isApplied && (
                <p className="text-sm text-gray-500 mt-2">
                  {singleJob?.applications?.length} people already applied
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Job Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6B3AC2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Job Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Role</span>
                  <span className="text-gray-900 font-medium">{singleJob?.position}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Location</span>
                  <span className="text-gray-900 font-medium">{singleJob?.location}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Salary</span>
                  <span className="text-green-600 font-bold">{singleJob?.salary} LPA</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Experience</span>
                  <span className="text-gray-900 font-medium">{singleJob?.experienceLevel} Year</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Total Applicants</span>
                  <span className="text-blue-600 font-bold">{singleJob?.applications?.length}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-semibold text-gray-700">Job Type</span>
                  <span className="text-gray-900 font-medium">{singleJob?.jobType}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-semibold text-gray-700">Post Date</span>
                  <span className="text-gray-900 font-medium">{singleJob?.createdAt?.split("T")[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#6B3AC2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Job Description
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg">
                {singleJob?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-gradient-to-r from-[#6B3AC2] to-[#8B5CF6] rounded-2xl shadow-lg p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Apply?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Don't miss this opportunity! Join our team and take the next step in your career journey.
            </p>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-xl px-10 py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                isApplied
                  ? "bg-white/20 text-purple-200 cursor-not-allowed hover:scale-100"
                  : "bg-white text-[#6B3AC2] hover:bg-gray-100 shadow-lg hover:shadow-xl"
              }`}
            >
              {isApplied ? "Application Submitted ✓" : "Apply for this Position"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;




































































































// import React, { useEffect, useState } from "react";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { useParams } from "react-router-dom";
// import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "@/redux/jobSlice";
// import { toast } from "sonner";

// const Description = () => {
//   const params = useParams();
//   const jobId = params.id;

//   const { singleJob } = useSelector((store) => store.job);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useSelector((store) => store.auth);

//   const isIntiallyApplied =
//     singleJob?.application?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true);
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob));
//         console.log(res.data);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJobs = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         console.log("API Response:", res.data);
//         if (res.data.status) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         } else {
//           setError("Failed to fetch jobs.");
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError(error.message || "An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSingleJobs();
//   }, [jobId, dispatch, user?._id]);
//   console.log("single jobs", singleJob);

//   if (!singleJob) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="max-w-7xl mx-auto my-10 ">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
//             <div className=" flex gap-2 items-center mt-4 ">
//               <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
//                 {singleJob?.position} Open Positions
//               </Badge>
//               <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
//                 {singleJob?.salary}LPA
//               </Badge>
//               <Badge className={" text-[#6B3AC2]  font-bold"} variant={"ghost"}>
//                 {singleJob?.location}
//               </Badge>
//               <Badge className={" text-black font-bold"} variant={"ghost"}>
//                 {singleJob?.jobType}
//               </Badge>
//             </div>
//           </div>
//           <div>
//             <Button
//               onClick={isApplied ? null : applyJobHandler}
//               disabled={isApplied}
//               className={`rounded-lg ${
//                 isApplied
//                   ? "bg-gray-600 cursor-not-allowed"
//                   : "bg-[#6B3AC2] hover:bg-[#552d9b]"
//               }`}
//             >
//               {isApplied ? "Already Applied" : "Apply"}
//             </Button>
//           </div>
//         </div>
//         <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
//           {singleJob?.description}
//         </h1>
//         <div className="my-4">
//           <h1 className="font-bold my-1 ">
//             Role:{" "}
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.position} Open Positions
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Location:{" "}
//             <span className=" pl-4 font-normal text-gray-800">
//               {" "}
//               {singleJob?.location}
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Salary:{" "}
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.salary} LPA
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Experience:{" "}
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.experienceLevel} Year
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Total Applicants:{" "}
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.applications?.length}
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Job Type:
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.jobType}
//             </span>
//           </h1>
//           <h1 className="font-bold my-1 ">
//             Post Date:
//             <span className=" pl-4 font-normal text-gray-800">
//               {singleJob?.createdAt.split("T")[0]}
//             </span>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Description;





















































// import React, { useEffect, useState } from "react";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { useParams } from "react-router-dom";
// import { JOB_API_ENDPOINT, APPLICATION_API_ENDPOINT } from "@/utils/data";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setSingleJob } from "@/redux/jobSlice";
// import { toast } from "sonner";
// import { 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   Briefcase, 
//   Users, 
//   Clock,
//   Building,
//   Award,
//   FileText
// } from "lucide-react";

// const Description = () => {
//   const params = useParams();
//   const jobId = params.id;

//   const { singleJob } = useSelector((store) => store.job);
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user } = useSelector((store) => store.auth);

//   const isIntiallyApplied =
//     singleJob?.application?.some(
//       (application) => application.applicant === user?._id
//     ) || false;
//   const [isApplied, setIsApplied] = useState(isIntiallyApplied);

//   const applyJobHandler = async () => {
//     try {
//       const res = await axios.get(
//         `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
//         { withCredentials: true }
//       );
//       if (res.data.success) {
//         setIsApplied(true);
//         const updateSingleJob = {
//           ...singleJob,
//           applications: [...singleJob.applications, { applicant: user?._id }],
//         };
//         dispatch(setSingleJob(updateSingleJob));
//         console.log(res.data);
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error.message);
//       toast.error(error.response.data.message);
//     }
//   };

//   useEffect(() => {
//     const fetchSingleJobs = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
//           withCredentials: true,
//         });
//         console.log("API Response:", res.data);
//         if (res.data.status) {
//           dispatch(setSingleJob(res.data.job));
//           setIsApplied(
//             res.data.job.applications.some(
//               (application) => application.applicant === user?._id
//             )
//           );
//         } else {
//           setError("Failed to fetch jobs.");
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError(error.message || "An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSingleJobs();
//   }, [jobId, dispatch, user?._id]);
//   console.log("single jobs", singleJob);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FileText className="w-8 h-8 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Job</h3>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!singleJob) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <div className="text-center">
//           <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Briefcase className="w-8 h-8 text-gray-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Job Not Found</h3>
//           <p className="text-gray-600">The job you're looking for doesn't exist.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-6 py-8 text-white">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-3">
//                   <Building className="w-6 h-6 text-purple-200" />
//                   <span className="text-purple-200 font-medium">{singleJob?.company?.name}</span>
//                 </div>
//                 <h1 className="font-bold text-2xl lg:text-3xl mb-4">{singleJob?.title}</h1>
//                 <div className="flex flex-wrap gap-2">
//                   <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
//                     {singleJob?.position} Open Positions
//                   </Badge>
//                   <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0">
//                     {singleJob?.salary} LPA
//                   </Badge>
//                   <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0">
//                     {singleJob?.location}
//                   </Badge>
//                   <Badge className="bg-gray-800 hover:bg-gray-900 text-white border-0">
//                     {singleJob?.jobType}
//                   </Badge>
//                 </div>
//               </div>
//               <div className="lg:text-right">
//                 <Button
//                   onClick={isApplied ? null : applyJobHandler}
//                   disabled={isApplied}
//                   className={`rounded-xl px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200 ${
//                     isApplied
//                       ? "bg-gray-400 cursor-not-allowed transform scale-100"
//                       : "bg-white text-purple-700 hover:bg-gray-100 hover:scale-105 hover:shadow-xl"
//                   }`}
//                   size="lg"
//                 >
//                   {isApplied ? (
//                     <div className="flex items-center gap-2">
//                       <Award className="w-5 h-5" />
//                       Already Applied
//                     </div>
//                   ) : (
//                     "Apply Now"
//                   )}
//                 </Button>
//                 {isApplied && (
//                   <p className="text-purple-200 text-sm mt-2">
//                     Application submitted successfully!
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Content Section */}
//           <div className="p-6 lg:p-8">
//             {/* Job Description */}
//             <section className="mb-8">
//               <div className="flex items-center gap-3 mb-4">
//                 <FileText className="w-6 h-6 text-purple-600" />
//                 <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
//               </div>
//               <p className="text-gray-700 leading-relaxed text-lg border-l-4 border-purple-500 pl-4 bg-purple-50 py-3 rounded-r-lg">
//                 {singleJob?.description}
//               </p>
//             </section>

//             {/* Job Details Grid */}
//             <section className="mb-8">
//               <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
//                 <Briefcase className="w-6 h-6 text-purple-600" />
//                 Job Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-blue-100 rounded-lg">
//                     <Briefcase className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Role</p>
//                     <p className="text-gray-700">{singleJob?.position}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-green-100 rounded-lg">
//                     <MapPin className="w-5 h-5 text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Location</p>
//                     <p className="text-gray-700">{singleJob?.location}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-amber-100 rounded-lg">
//                     <DollarSign className="w-5 h-5 text-amber-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Salary</p>
//                     <p className="text-gray-700">{singleJob?.salary} LPA</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-purple-100 rounded-lg">
//                     <Award className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Experience</p>
//                     <p className="text-gray-700">{singleJob?.experienceLevel} Year</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-indigo-100 rounded-lg">
//                     <Users className="w-5 h-5 text-indigo-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Total Applicants</p>
//                     <p className="text-gray-700">{singleJob?.applications?.length}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-gray-100 rounded-lg">
//                     <Clock className="w-5 h-5 text-gray-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Job Type</p>
//                     <p className="text-gray-700">{singleJob?.jobType}</p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
//                   <div className="p-3 bg-red-100 rounded-lg">
//                     <Calendar className="w-5 h-5 text-red-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-900">Post Date</p>
//                     <p className="text-gray-700">{singleJob?.createdAt.split("T")[0]}</p>
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Application CTA */}
//             <section className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
//               <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-900 mb-2">
//                     Ready to apply for this position?
//                   </h3>
//                   <p className="text-gray-600">
//                     Join {singleJob?.applications?.length || 0} other applicants
//                   </p>
//                 </div>
//                 <Button
//                   onClick={isApplied ? null : applyJobHandler}
//                   disabled={isApplied}
//                   className={`rounded-xl px-8 py-3 font-semibold shadow-lg transition-all duration-200 ${
//                     isApplied
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-purple-600 hover:bg-purple-700 hover:scale-105 hover:shadow-xl text-white"
//                   }`}
//                   size="lg"
//                 >
//                   {isApplied ? "Application Submitted" : "Apply Now"}
//                 </Button>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Description;








