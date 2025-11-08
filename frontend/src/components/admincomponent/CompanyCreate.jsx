import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/data";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companyslice";
import axios from "axios";
import { Building2, ArrowLeft, Loader2, Rocket, Users, Target } from "lucide-react";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    } else if (companyName.trim().length > 50) {
      newErrors.companyName = "Company name must be less than 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerNewCompany = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/register`,
        { companyName: companyName.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Failed to create company. Please try again.";
      toast.error(errorMessage);
      
      // Set specific error if company name might be taken
      if (error.response?.status === 409) {
        setErrors({ companyName: "A company with this name already exists" });
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && companyName.trim()) {
      registerNewCompany();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-4 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-600 font-semibold border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200/50 p-8"
          >
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Create New Company</h1>
                  <p className="text-gray-600 mt-2">Start by giving your company a name</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Company Name *
                </Label>
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                    if (errors.companyName) {
                      setErrors({ ...errors, companyName: "" });
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    errors.companyName ? "border-red-300" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                <AnimatePresence>
                  {errors.companyName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-600 text-sm font-medium"
                    >
                      {errors.companyName}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="text-xs text-gray-500 mt-1">
                  This will be the official name of your company on the platform
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin/companies")}
                    disabled={loading}
                    className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="flex-1"
                >
                  <Button
                    onClick={registerNewCompany}
                    disabled={loading || !companyName.trim()}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Rocket className="h-4 w-4" />
                        Create Company
                      </div>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket className="h-5 w-5" />
                Why Create a Company?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-lg mt-1">
                    <Building2 className="h-3 w-3" />
                  </div>
                  <span>Establish your brand presence on our platform</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-lg mt-1">
                    <Users className="h-3 w-3" />
                  </div>
                  <span>Attract top talent with your company profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-white/20 rounded-lg mt-1">
                    <Target className="h-3 w-3" />
                  </div>
                  <span>Post jobs and manage applications efficiently</span>
                </li>
              </ul>
            </div>

            {/* Next Steps Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                What's Next?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Company Profile</h4>
                    <p className="text-sm text-gray-600">Add logo, description, and details</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Post Jobs</h4>
                    <p className="text-sm text-gray-600">Create and manage job listings</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Manage Applications</h4>
                    <p className="text-sm text-gray-600">Review and connect with candidates</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyCreate;








// import { useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useNavigate } from "react-router-dom";
// import { COMPANY_API_ENDPOINT } from "@/utils/data";
// import { toast } from "sonner";
// import { useDispatch } from "react-redux";
// import { setSingleCompany } from "@/redux/companyslice";
// import axios from "axios";

// const CompanyCreate = () => {
//   const navigate = useNavigate();
//   const [companyName, setCompanyName] = useState();
//   const dispatch = useDispatch();
//   const registerNewCompany = async () => {
//     try {
//       const res = await axios.post(
//         `${COMPANY_API_ENDPOINT}/register`,
//         { companyName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res?.data?.success) {
//         dispatch(setSingleCompany(res.data.company));
//         toast.success(res.data.message);
//         const companyId = res?.data?.company?._id;
//         navigate(`/admin/companies/${companyId}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-4xl mx-auto">
//         <div className="my-10">
//           <h1 className="font-bold text-2xl ">Company Name</h1>
//           <p className="text-gray-600">Company Description</p>
//         </div>
//         <Label>Company Name</Label>
//         <Input
//           type="text"
//           placeholder="Company Name"
//           className="my-2"
//           onChange={(e) => setCompanyName(e.target.value)}
//         />

//         <div className="flex items-center gap-2 my-10">
//           <Button
//             variant="outline"
//             onClick={() => navigate("/admin/companies")}
//           >
//             Cancel
//           </Button>
//           <Button onClick={registerNewCompany}>Continue</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyCreate;