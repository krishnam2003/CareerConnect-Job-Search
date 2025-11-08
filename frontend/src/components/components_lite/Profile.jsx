import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen, Download, User, Award, FileText, MapPin, Briefcase } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJob from "./AppliedJob";
import EditProfileModal from "./EditProfileModal";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

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
        duration: 0.5
      }
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />

      <motion.div
        className="max-w-6xl mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Profile Header Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8"
        >
          {/* Header Background */}
          <div className="h-32 bg-gradient-to-r from-blue-300 to-blue-600 relative">
            <div className="absolute -bottom-16 left-8">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt={user?.fullname}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                  {getInitials(user?.fullname)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user?.fullname}
                  </h1>
                  <Badge variant="secondary" className="text-sm px-3 py-1">
                    {user?.role}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl">
                  {user?.profile?.bio || "No bio added yet. Click edit to add a bio."}
                </p>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <a 
                      href={`mailto:${user?.email}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {user?.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Contact className="h-5 w-5 text-blue-600" />
                    <a 
                      href={`tel:${user?.phoneNumber}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {user?.phoneNumber || "No phone number"}
                    </a>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Skills & Expertise</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user?.profile?.skills?.length > 0 ? (
                      user.profile.skills.map((skill, index) => (
                        <Badge 
                          key={index}
                          className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 px-3 py-1 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No skills added yet</p>
                    )}
                  </div>
                </div>

                {/* Resume Section */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Resume</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    {user?.profile?.resume ? (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={user?.profile?.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Download className="h-4 w-4" />
                        Download Resume
                        {user?.profile?.resumeOriginalName && (
                          <span className="text-green-100 text-sm">
                            ({user.profile.resumeOriginalName})
                          </span>
                        )}
                      </motion.a>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <FileText className="h-5 w-5" />
                        <span>No resume uploaded</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2 rounded-xl flex items-center gap-2"
                >
                  <Pen className="h-4 w-4" />
                  Edit Profile
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Applied Jobs</h2>
          </div>
          
          <AppliedJob />
        </motion.div>
      </motion.div>

      {/* Edit Profile Modal */}
      <EditProfileModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;






























// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { Contact, Mail, Pen } from "lucide-react";
// import { Badge } from "../ui/badge";
// import AppliedJob from "./AppliedJob";
// import EditProfileModal from "./EditProfileModal";
// import { useSelector } from "react-redux";
// import useGetAppliedJobs from "@/hooks/useGetAllAppliedJobs";

 
// const isResume = true;
// const Profile = () => {
//   useGetAppliedJobs();
//   const [open, setOpen] = useState(false);
//   const { user } = useSelector((store) => store.auth);
//   return (
//     <div>
//       <Navbar />

//       <div className="max-w-4xl mx-auto  bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow shadow-gray-400 hover:shadow-yellow-400">
//         <div className="flex justify-between">
//           <div className="flex items-center gap-5">
//             <Avatar className="cursor-pointer h-24 w-24">
//               <AvatarImage
//                 src={user?.profile?.profilePhoto}
//                 alt="@shadcn"
//               />
//             </Avatar>
//             <div>
//               <h1 className=" font-medium text-xl">{user?.fullname}</h1>
//               <p>{user?.profile?.bio}</p>
//             </div>
//           </div>
//           <Button
//             onClick={() => setOpen(true)}
//             className="text-right"
//             variant="outline"
//           >
//             <Pen />
//           </Button>
//         </div>
//         <div className="my-5">
//           <div className="flex items-center gap-3 my-2">
//             <Mail />
//             <span className="">
//               <a href={`mailto:${user?.email}`}>{user?.email}</a>
//             </span>
//           </div>
//           <div className="flex items-center gap-3 my-2">
//             <Contact />
//             <span className="">
//               <a href={`tel:${user?.phoneNumber}`}>{user?.phoneNumber}</a>
//             </span>
//           </div>
//         </div>

//         <div>
//           <div className="my-5">
//             <h1>Skills</h1>
//             <div className="flex items-center gap-1">
//               {user?.profile?.skills.length !== 0 ? (
//                 user?.profile?.skills.map((item, index) => (
//                   <Badge key={index}>{item}</Badge>
//                 ))
//               ) : (
//                 <span>NA</span>
//               )}
//             </div>
//           </div>
//         </div>

//         <div>
//           <div className="grid w-full max-w-sm items-center gap-1.5">
//             <label className="text-md font-bold"> Resume</label>
//             <div>
//               {isResume ? (
//                 <a
//                   target="_blank"
//                   href={user?.profile?.resume}
//                   className="text-blue-600 hover:underline cursor-pointer"
//                 >
//                   Download
//                   {user?.profile?.resumeOriginalName}
//                 </a>
//               ) : (
//                 <span>No Resume Found</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl">
//         <h1 className="text-lg my-5 font-bold">Applied Jobs</h1>

//         {/* Add Application Table */}
//         <AppliedJob />
//       </div>

//       {/* Edit Profile Modal */}
//       <EditProfileModal open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default Profile;
