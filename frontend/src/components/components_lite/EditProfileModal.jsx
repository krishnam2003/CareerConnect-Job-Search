import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data";
import { setUser } from "@/redux/authSlice";
import { Loader2, Upload, User, Mail, Phone, FileText, Award } from "lucide-react";

const EditProfileModal = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser({ ...res.data.user, skills: input.skills.split(", ") }));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const FileChangehandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[550px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl font-bold flex items-center gap-2">
              <User className="h-6 w-6" />
              Edit Profile
            </DialogTitle>
            <p className="text-blue-100 text-sm mt-1">
              Update your personal information and professional details
            </p>
          </DialogHeader>
        </div>

        {/* Form Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <form onSubmit={handleFileChange} className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Personal Information
              </h3>
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <input
                  type="text"
                  id="fullname"
                  value={input.fullname}
                  name="fullname"
                  onChange={changeEventHandler}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <input
                  type="email"
                  id="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={input.phoneNumber}
                  name="phoneNumber"
                  onChange={changeEventHandler}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Professional Details
              </h3>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Bio
                </Label>
                <textarea
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Skills
                </Label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50"
                  placeholder="React, Node.js, TypeScript, etc."
                />
                <p className="text-xs text-gray-500">
                  Separate multiple skills with commas
                </p>
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Resume
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/50">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept="application/pdf"
                    onChange={FileChangehandler}
                    className="hidden"
                  />
                  <label
                    htmlFor="file"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-600">
                      {input.file ? input.file.name : "Click to upload resume"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PDF files only (Max: 5MB)
                    </span>
                  </label>
                </div>
                {input.file && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Selected: {input.file.name}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 bg-gray-50/80 border-t">
          <div className="flex gap-3 w-full">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleFileChange}
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;


















// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "../ui/dialog";
// import { Label } from "../ui/label";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { toast } from "sonner";
// import { USER_API_ENDPOINT } from "@/utils/data";
// import { setUser } from "@/redux/authSlice";
// import { Loader2 } from "lucide-react";

// const EditProfileModal = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     fullname: user?.fullname, // Corrected from fullnamename to fullname
//     email: user?.email,
//     phoneNumber: user?.phoneNumber,
//     bio: user?.profile?.bio,
//     skills: user?.profile?.skills?.map((skill) => skill),
//     file: user?.profile?.resume,
//   });
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);

//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${USER_API_ENDPOINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         // dispatch(setUser(res.data.user));
//         dispatch(setUser({ ...res.data.user, skills: input.skills }));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);

//     console.log(input);
//   };

//   const FileChangehandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent
//           className="sm:max-w-[500px]"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Edit Profile</DialogTitle>
//           </DialogHeader>
//           {/* Form for editing profile */}
//           <form onSubmit={handleFileChange}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={input.fullname}
//                   name="name"
//                   onChange={changeEventHandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={input.email}
//                   name="email"
//                   onChange={changeEventHandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="phone" className="text-right">
//                   Phone
//                 </Label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={input.phoneNumber} // Ensure this is correctly set
//                   name="phoneNumber" // Ensure this matches the expected key
//                   onChange={changeEventHandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <input
//                   type="bio"
//                   id="bio"
//                   value={input.bio}
//                   name="bio"
//                   onChange={changeEventHandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               {/* skills */}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <input
//                   id="skills"
//                   name="skills"
//                   value={input.skills}
//                   onChange={changeEventHandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//               {/* Resume file upload */}
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">
//                   Resume
//                 </Label>
//                 <input
//                   type="file"
//                   id="file"
//                   name="file"
//                   accept="application/pdf"
//                   onChange={FileChangehandler}
//                   className="col-span-3 border border-gray-300 rounded-md p-2"
//                 />
//               </div>
//             </div>

//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   {" "}
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full my-4">
//                   Save
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default EditProfileModal;