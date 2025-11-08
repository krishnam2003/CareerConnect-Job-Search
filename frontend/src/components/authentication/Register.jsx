import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    pancard: "",
    adharcard: "",
    file: null,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    setIsVisible(true);
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const ChangeFilehandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateStep1 = () => {
    return input.fullname && input.email && input.password && input.role;
  };

  const validateStep2 = () => {
    return input.phoneNumber && input.pancard && input.adharcard;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("pancard", input.pancard);
    formData.append("adharcard", input.adharcard);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
      }
    }
  };

  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  // Progress steps
  const steps = ["Basic Info", "Additional Details"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex items-center justify-center min-h-[90vh] px-4 py-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="w-full max-w-2xl">
              <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Create Account
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Join us today and get started
                  </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    {steps.map((step, index) => (
                      <div key={step} className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          currentStep > index + 1 
                            ? "bg-green-500 text-white" 
                            : currentStep === index + 1
                            ? "bg-blue-600 text-white"
                            : "bg-gray-300 text-gray-600"
                        } font-semibold text-sm transition-all duration-300`}>
                          {currentStep > index + 1 ? "✓" : index + 1}
                        </div>
                        <span className={`ml-2 text-sm font-medium ${
                          currentStep === index + 1 ? "text-blue-600" : "text-gray-500"
                        }`}>
                          {step}
                        </span>
                        {index < steps.length - 1 && (
                          <div className={`w-12 h-0.5 mx-4 ${
                            currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={submitHandler}>
                  <AnimatePresence mode="wait">
                    {/* Step 1: Basic Information */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Full Name */}
                        <div>
                          <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-2 block">
                            Full Name *
                          </Label>
                          <Input
                            id="fullname"
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="johndoe@gmail.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* Password */}
                        <div>
                          <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                            Password *
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* Role Selection */}
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">
                            I am a *
                          </Label>
                          <RadioGroup className="flex gap-6">
                            <div className="flex items-center">
                              <Input
                                id="student"
                                type="radio"
                                name="role"
                                value="Student"
                                checked={input.role === "Student"}
                                onChange={changeEventHandler}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                required
                              />
                              <Label htmlFor="student" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Student
                              </Label>
                            </div>
                            <div className="flex items-center">
                              <Input
                                id="recruiter"
                                type="radio"
                                name="role"
                                value="Recruiter"
                                checked={input.role === "Recruiter"}
                                onChange={changeEventHandler}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                required
                              />
                              <Label htmlFor="recruiter" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                                Recruiter
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Next Button */}
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Continue
                        </motion.button>
                      </motion.div>
                    )}

                    {/* Step 2: Additional Details */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        {/* Phone Number */}
                        <div>
                          <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                            Phone Number *
                          </Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+1234567890"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* PAN Card */}
                        <div>
                          <Label htmlFor="pancard" className="text-sm font-medium text-gray-700 mb-2 block">
                            PAN Card Number *
                          </Label>
                          <Input
                            id="pancard"
                            type="text"
                            value={input.pancard}
                            name="pancard"
                            onChange={changeEventHandler}
                            placeholder="ABCDE1234F"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 uppercase"
                            required
                          />
                        </div>

                        {/* Aadhar Card */}
                        <div>
                          <Label htmlFor="adharcard" className="text-sm font-medium text-gray-700 mb-2 block">
                            Aadhar Card Number *
                          </Label>
                          <Input
                            id="adharcard"
                            type="text"
                            value={input.adharcard}
                            name="adharcard"
                            onChange={changeEventHandler}
                            placeholder="1234 5678 9012"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        {/* Profile Photo */}
                        <div>
                          <Label htmlFor="file" className="text-sm font-medium text-gray-700 mb-2 block">
                            Profile Photo
                          </Label>
                          <Input
                            id="file"
                            type="file"
                            accept="image/*"
                            onChange={ChangeFilehandler}
                            className="w-full px-4 py-0 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <motion.button
                            type="button"
                            onClick={prevStep}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
                          >
                            Back
                          </motion.button>
                          
                          {loading ? (
                            <div className="flex-1 py-3 bg-blue-500 rounded-lg flex items-center justify-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
                              />
                            </div>
                          ) : (
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                            >
                              Create Account
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Login Link */}
                <div className="text-center mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login">
                      <span className="text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-2 cursor-pointer">
                        Sign in
                      </span>
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;







// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "@/utils/data";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";

// const Register = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     role: "",
//     phoneNumber: "",
//     pancard: "",
//     adharcard: "",
//     file: "",
//   });

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { loading, user } = useSelector((store) => store.auth);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const ChangeFilehandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("password", input.password);
//     formData.append("pancard", input.pancard);
//     formData.append("adharcard", input.adharcard);
//     formData.append("role", input.role);
//     formData.append("phoneNumber", input.phoneNumber);
//     if (input.file) {
//       formData.append("file", input.file);
//     }

//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       const errorMessage = error.response
//         ? error.response.data.message
//         : "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
//       <Navbar />
      
//       <div className="flex items-center justify-center min-h-[90vh] px-4 py-8">
//         <motion.div
//           className="w-full max-w-2xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <motion.div
//             className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8"
//             whileHover={{ y: -5 }}
//             transition={{ duration: 0.3 }}
//           >
//             {/* Header */}
//             <div className="text-center mb-8">
//               <motion.h1 
//                 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 Create Account
//               </motion.h1>
//               <motion.p 
//                 className="text-gray-600 mt-2"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 Join us today and get started
//               </motion.p>
//             </div>

//             <form onSubmit={submitHandler} className="space-y-6">
//               {/* Full Name */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <Label htmlFor="fullname" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Full Name
//                 </Label>
//                 <Input
//                   id="fullname"
//                   type="text"
//                   value={input.fullname}
//                   name="fullname"
//                   onChange={changeEventHandler}
//                   placeholder="John Doe"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* Email */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.5 }}
//               >
//                 <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Email Address
//                 </Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   value={input.email}
//                   name="email"
//                   onChange={changeEventHandler}
//                   placeholder="johndoe@gmail.com"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* Password */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.6 }}
//               >
//                 <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Password
//                 </Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   value={input.password}
//                   name="password"
//                   onChange={changeEventHandler}
//                   placeholder="••••••••"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* Phone Number */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.7 }}
//               >
//                 <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Phone Number
//                 </Label>
//                 <Input
//                   id="phoneNumber"
//                   type="tel"
//                   value={input.phoneNumber}
//                   name="phoneNumber"
//                   onChange={changeEventHandler}
//                   placeholder="+1234567890"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* PAN Card */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.8 }}
//               >
//                 <Label htmlFor="pancard" className="text-sm font-medium text-gray-700 mb-2 block">
//                   PAN Card Number
//                 </Label>
//                 <Input
//                   id="pancard"
//                   type="text"
//                   value={input.pancard}
//                   name="pancard"
//                   onChange={changeEventHandler}
//                   placeholder="ABCDE1234F"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* Aadhar Card */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.9 }}
//               >
//                 <Label htmlFor="adharcard" className="text-sm font-medium text-gray-700 mb-2 block">
//                   Aadhar Card Number
//                 </Label>
//                 <Input
//                   id="adharcard"
//                   type="text"
//                   value={input.adharcard}
//                   name="adharcard"
//                   onChange={changeEventHandler}
//                   placeholder="1234 5678 9012"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   required
//                 />
//               </motion.div>

//               {/* Role Selection */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.0 }}
//               >
//                 <Label className="text-sm font-medium text-gray-700 mb-3 block">
//                   I am a
//                 </Label>
//                 <RadioGroup className="flex gap-6">
//                   <div className="flex items-center">
//                     <Input
//                       id="student"
//                       type="radio"
//                       name="role"
//                       value="Student"
//                       checked={input.role === "Student"}
//                       onChange={changeEventHandler}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
//                       required
//                     />
//                     <Label htmlFor="student" className="ml-2 block text-sm text-gray-700 cursor-pointer">
//                       Student
//                     </Label>
//                   </div>
//                   <div className="flex items-center">
//                     <Input
//                       id="recruiter"
//                       type="radio"
//                       name="role"
//                       value="Recruiter"
//                       checked={input.role === "Recruiter"}
//                       onChange={changeEventHandler}
//                       className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 cursor-pointer"
//                       required
//                     />
//                     <Label htmlFor="recruiter" className="ml-2 block text-sm text-gray-700 cursor-pointer">
//                       Recruiter
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </motion.div>

//               {/* Profile Photo - Original working version */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 1.1 }}
//                 className="flex items-center gap-4"
//               >
//                 <Label htmlFor="file" className="text-sm font-medium text-gray-700">
//                   Profile Photo
//                 </Label>
//                 <Input
//                   id="file"
//                   type="file"
//                   accept="image/*"
//                   onChange={ChangeFilehandler}
//                   className="cursor-pointer"
//                 />
//               </motion.div>

//               {/* Submit Button */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.2 }}
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center w-full py-3 bg-blue-600 rounded-lg">
//                     <motion.div
//                       animate={{ rotate: 360 }}
//                       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                       className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"
//                     />
//                   </div>
//                 ) : (
//                   <motion.button
//                     type="submit"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
//                   >
//                     Create Account
//                   </motion.button>
//                 )}
//               </motion.div>
//             </form>

//             {/* Login Link */}
//             <motion.div
//               className="text-center mt-6 pt-6 border-t border-gray-200"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1.3 }}
//             >
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link to="/login">
//                   <motion.span
//                     className="text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-2 cursor-pointer"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Log in
//                   </motion.span>
//                 </Link>
//               </p>
//             </motion.div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Register;




































// import React, { useEffect, useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "@/utils/data";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";

// const Register = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     role: "",
//     phoneNumber: "",
//     pancard: "",
//     adharcard: "",
//     file: "",
//   });

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const { loading } = useSelector((store) => store.auth);
//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const ChangeFilehandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("password", input.password);
//     formData.append("pancard", input.pancard);
//     formData.append("adharcard", input.adharcard);
//     formData.append("role", input.role);
//     formData.append("phoneNumber", input.phoneNumber);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       const errorMessage = error.response
//         ? error.response.data.message
//         : "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const { user } = useSelector((store) => store.auth);
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5 text-center text-blue-600">
//             Register
//           </h1>
//           <div className="my-2">
//             <Label>Fullname</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="John Doe"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="johndoe@gmail.com"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="********"
//             ></Input>
//           </div>
//           <div>
//             <Label>PAN Card Number</Label>
//             <Input
//               type="text"
//               value={input.pancard}
//               name="pancard"
//               onChange={changeEventHandler}
//               placeholder="ABCDEF1234G"
//             ></Input>
//           </div>
//           <div>
//             <Label>Adhar Card Number</Label>
//             <Input
//               type="text"
//               value={input.adharcard}
//               name="adharcard"
//               onChange={changeEventHandler}
//               placeholder="123456789012"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Phone Number</Label>
//             <Input
//               type="tel"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="+1234567890"
//             ></Input>
//           </div>
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5 ">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Student"
//                   checked={input.role === "Student"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Recruiter"
//                   checked={input.role === "Recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>
//           <div className="flex items-center gap-2">
//             <Label>Profile Photo</Label>
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={ChangeFilehandler}
//               className="cursor-pointer"
//             />
//           </div>
//           {loading ? (
//             <div className="flex items-center justify-center my-10">
//               <div className="spinner-border text-blue-600" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="block w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md"
//             >
//               Register
//             </button>
//           )}

//           <p className="text-gray-500 text-md my-2">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-700 font-semibold">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;




































// import React, { useEffect, useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { RadioGroup } from "../ui/radio-group";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { USER_API_ENDPOINT } from "@/utils/data";
// import { toast } from "sonner";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading } from "@/redux/authSlice";

// const Register = () => {
//   const [input, setInput] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//     role: "",
//     phoneNumber: "",
//     pancard: "",
//     adharcard: "",
//     file: "",
//   });

//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   const { loading } = useSelector((store) => store.auth);
//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const ChangeFilehandler = (e) => {
//     setInput({ ...input, file: e.target.files?.[0] });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("password", input.password);
//     formData.append("pancard", input.pancard);
//     formData.append("adharcard", input.adharcard);
//     formData.append("role", input.role);
//     formData.append("phoneNumber", input.phoneNumber);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         navigate("/login");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       const errorMessage = error.response
//         ? error.response.data.message
//         : "An unexpected error occurred.";
//       toast.error(errorMessage);
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const { user } = useSelector((store) => store.auth);
//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar></Navbar>
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           onSubmit={submitHandler}
//           className="w-1/2 border border-gray-500 rounded-md p-4 my-10"
//         >
//           <h1 className="font-bold text-xl mb-5 text-center text-blue-600">
//             Register
//           </h1>
//           <div className="my-2">
//             <Label>Fullname</Label>
//             <Input
//               type="text"
//               value={input.fullname}
//               name="fullname"
//               onChange={changeEventHandler}
//               placeholder="John Doe"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Email</Label>
//             <Input
//               type="email"
//               value={input.email}
//               name="email"
//               onChange={changeEventHandler}
//               placeholder="johndoe@gmail.com"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changeEventHandler}
//               placeholder="********"
//             ></Input>
//           </div>
//           <div>
//             <Label>PAN Card Number</Label>
//             <Input
//               type="text"
//               value={input.pancard}
//               name="pancard"
//               onChange={changeEventHandler}
//               placeholder="ABCDEF1234G"
//             ></Input>
//           </div>
//           <div>
//             <Label>Adhar Card Number</Label>
//             <Input
//               type="text"
//               value={input.adharcard}
//               name="adharcard"
//               onChange={changeEventHandler}
//               placeholder="123456789012"
//             ></Input>
//           </div>
//           <div className="my-2">
//             <Label>Phone Number</Label>
//             <Input
//               type="tel"
//               value={input.phoneNumber}
//               name="phoneNumber"
//               onChange={changeEventHandler}
//               placeholder="+1234567890"
//             ></Input>
//           </div>
//           <div className="flex items-center justify-between">
//             <RadioGroup className="flex items-center gap-4 my-5 ">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Student"
//                   checked={input.role === "Student"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r1">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   name="role"
//                   value="Recruiter"
//                   checked={input.role === "Recruiter"}
//                   onChange={changeEventHandler}
//                   className="cursor-pointer"
//                 />
//                 <Label htmlFor="r2">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>
//           <div className="flex items-center gap-2">
//             <Label>Profile Photo</Label>
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={ChangeFilehandler}
//               className="cursor-pointer"
//             />
//           </div>
//           {loading ? (
//             <div className="flex items-center justify-center my-10">
//               <div className="spinner-border text-blue-600" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="block w-full py-3 my-3 text-white bg-primary hover:bg-primary/90 rounded-md"
//             >
//               Register
//             </button>
//           )}

//           <p className="text-gray-500 text-md my-2">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-700 font-semibold">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;