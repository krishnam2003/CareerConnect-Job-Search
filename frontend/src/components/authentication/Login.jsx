import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Navigate, useNavigate } from "react-router-dom";
import { RadioGroup } from "../ui/radio-group";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/data.js";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  useEffect(() => {
    setIsVisible(true);
    if (user) {
      navigate("/");
    }
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="flex items-center justify-center min-h-[90vh] px-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="w-full max-w-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card */}
              <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  variants={itemVariants}
                >
                  <motion.h1 
                    className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Welcome Back
                  </motion.h1>
                  <motion.p 
                    className="text-gray-600 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Sign in to your account
                  </motion.p>
                </motion.div>

                <form onSubmit={submitHandler} className="space-y-6">
                  {/* Email Field */}
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                      Email Address
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
                  </motion.div>

                  {/* Password Field */}
                  <motion.div variants={itemVariants}>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                      Password
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
                  </motion.div>

                  {/* Role Selection */}
                  <motion.div variants={itemVariants}>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                      I am a
                    </Label>
                    <RadioGroup className="flex gap-4">
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
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={itemVariants}>
                    {loading ? (
                      <motion.div
                        className="w-full py-3 bg-blue-500 rounded-lg flex items-center justify-center"
                        variants={loadingVariants}
                        animate="animate"
                      >
                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full"></div>
                      </motion.div>
                    ) : (
                      <motion.button
                        type="submit"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Log In
                      </motion.button>
                    )}
                  </motion.div>
                </form>

                {/* Register Link */}
                <motion.div
                  className="text-center mt-6 pt-6 border-t border-gray-200"
                  variants={itemVariants}
                >
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register">
                      <motion.button
                        className="text-blue-600 font-semibold hover:text-blue-700 underline underline-offset-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Create account
                      </motion.button>
                    </Link>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;


































// import React, { useEffect, useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Navigate, useNavigate } from "react-router-dom";
// import { RadioGroup } from "../ui/radio-group";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";
// import { USER_API_ENDPOINT } from "@/utils/data.js";
// import { useDispatch, useSelector } from "react-redux";
// import { setLoading, setUser } from "@/redux/authSlice";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "", 
//     role: "",
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

//     try {
//       dispatch(setLoading(true)); // Start loading
//       const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       toast.error("Login failed");
//     } finally {
//       dispatch(setLoading(false)); // End loading
//     }
//   };

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
//             Login
//           </h1>
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

//           {loading ? (
//             <div className="flex items-center justify-center my-10">
//               <div className="spinner-border text-blue-600" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <button
//               type="submit"
//               className="w-3/4 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-blue-600 hover:bg-blue-800/90 rounded-md"
//             >
//               Login
//             </button>
//           )}

//           <div className=" ">
//             <p className="text-gray-700  text-center my-2">
//               Create new Account{" "}
//               <Link to="/register" className="text-blue-700">
//                 <button className=" w-1/2 py-3 my-3 text-white flex items-center justify-center max-w-7xl mx-auto bg-green-600 hover:bg-green-800/90 rounded-md">
//                   Register
//                 </button>
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;