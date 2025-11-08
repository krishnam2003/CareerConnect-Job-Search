import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  Loader2, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  FileText, 
  Award, 
  Clock,
  Building,
  AlertCircle
} from "lucide-react";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.companyId) {
      toast.error("Please select a company");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

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

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex items-center justify-center px-4 py-8"
      >
        <motion.div
          variants={itemVariants}
          className="w-full max-w-4xl"
        >
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <Briefcase className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
                <p className="text-gray-600 mt-2">
                  Fill in the details to create a new job posting
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.form
            onSubmit={submitHandler}
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Job Title */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={input.title}
                  placeholder="e.g., Senior Frontend Developer"
                  onChange={changeEventHandler}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Company Selection */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company *
                </Label>
                {companies.length > 0 ? (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Companies</SelectLabel>
                        {companies.map((company) => (
                          <SelectItem
                            key={company._id}
                            value={company.name.toLowerCase()}
                          >
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              {company.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    No companies registered
                  </div>
                )}
              </motion.div>

              {/* Location */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location *
                </Label>
                <Input
                  id="location"
                  type="text"
                  name="location"
                  value={input.location}
                  placeholder="e.g., Remote, New York, etc."
                  onChange={changeEventHandler}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Salary */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="salary" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Salary (LPA) *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  name="salary"
                  value={input.salary}
                  placeholder="e.g., 15"
                  onChange={changeEventHandler}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Open Positions */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="position" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Open Positions *
                </Label>
                <Input
                  id="position"
                  type="number"
                  name="position"
                  value={input.position}
                  placeholder="Number of vacancies"
                  onChange={changeEventHandler}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Experience */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="experience" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Experience (Years) *
                </Label>
                <Input
                  id="experience"
                  type="number"
                  name="experience"
                  value={input.experience}
                  placeholder="Years of experience required"
                  onChange={changeEventHandler}
                  required
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Job Type */}
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="jobType" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Job Type *
                </Label>
                <Input
                  id="jobType"
                  type="text"
                  name="jobType"
                  value={input.jobType}
                  placeholder="e.g., Full-time, Part-time, Contract"
                  onChange={changeEventHandler}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Requirements */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <Label htmlFor="requirements" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Requirements *
                </Label>
                <Input
                  id="requirements"
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  placeholder="Key skills and qualifications required"
                  onChange={changeEventHandler}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Job Description *
                </Label>
                <textarea
                  id="description"
                  name="description"
                  value={input.description}
                  placeholder="Detailed description of the job role, responsibilities, and what you're looking for in a candidate..."
                  onChange={changeEventHandler}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              {companies.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
                >
                  <p className="text-red-700 font-semibold flex items-center justify-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Please register a company before posting jobs
                  </p>
                </motion.div>
              )}

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  disabled={loading || companies.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Posting Job...
                    </div>
                  ) : (
                    "Post Job Opening"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostJob;





















// import React, { useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Input } from "../ui/input";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import { useSelector } from "react-redux";
// import store from "@/redux/store";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import axios from "axios";
// import { JOB_API_ENDPOINT } from "@/utils/data";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { Loader2 } from "lucide-react";

// const companyArray = [];

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     salary: "",
//     location: "",
//     jobType: "",
//     experience: "",
//     position: 0,
//     companyId: "",
//   });
//   const navigate = useNavigate();
//   const { companies } = useSelector((store) => store.company);
//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const [loading, setLoading] = useState(false);

//   const selectChangeHandler = (value) => {
//     const selectedCompany = companies.find(
//       (company) => company.name.toLowerCase() === value
//     );
//     setInput({ ...input, companyId: selectedCompany._id });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(`${JOB_API_ENDPOINT}/post`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/jobs");
//       } else {
//         toast.error(res.data.message);
//         navigate("/admin/jobs");
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message || "Something went wrong");
//       } else {
//         toast.error("An unexpected error occurred");
//       }
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center w-screen my-5">
//         <form
//           onSubmit={submitHandler}
//           className="p-8 max-w-4xl border border-gray-500 shadow-sm hover:shadow-xl hover:shadow-red-300 rounded-lg"
//         >
//           <div className="grid grid-cols-2 gap-5">
//             <div>
//               <Label>Title</Label>
//               <Input
//                 type="text"
//                 name="title"
//                 value={input.title}
//                 placeholder="Enter job title"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 name="description"
//                 value={input.description}
//                 placeholder="Enter job description"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400 "
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 placeholder="Enter job location"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Salary</Label>
//               <Input
//                 type="number"
//                 name="salary"
//                 value={input.salary}
//                 placeholder="Enter job salary"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Position</Label>
//               <Input
//                 type="number"
//                 name="position"
//                 value={input.position}
//                 placeholder="Enter job position"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Requirements</Label>
//               <Input
//                 type="text"
//                 name="requirements"
//                 value={input.requirements}
//                 placeholder="Enter job requirements"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               <Label>Experience</Label>
//               <Input
//                 type="number"
//                 name="experience"
//                 value={input.experience}
//                 placeholder="Enter job experience"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Job Type</Label>
//               <Input
//                 type="text"
//                 name="jobType"
//                 value={input.jobType}
//                 placeholder="Enter job type"
//                 className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1 hover:shadow-blue-400"
//                 onChange={changeEventHandler}
//               />
//             </div>

//             <div>
//               {companies.length > 0 && (
//                 <Select onValueChange={selectChangeHandler}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select a Company" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {companies.map((company) => (
//                         <SelectItem
//                           key={company._id}
//                           value={company.name.toLowerCase()}
//                         >
//                           {company.name}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center justify-center mt-5">
//             {loading ? (
//               <Button className="w-full px-4 py-2 text-sm text-white bg-black rounded-md ">
//                 {" "}
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//               </Button>
//             ) : (
//               <Button
//                 type="submit"
//                 className="w-full px-4 py-2 text-sm text-white bg-black rounded-md hover:bg-blue-600"
//               >
//                 Post Job
//               </Button>
//             )}
//           </div>
//           {companies.length === 0 && (
//             <p className="text-sm font-bold my-3 text-center text-red-600">
//               *Please register a company to post jobs.*
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostJob;