// import React, { useEffect, useState } from "react";
// import Navbar from "../components_lite/Navbar";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import CompaniesTable from "./CompaniesTable";
// import { useNavigate } from "react-router-dom";

// import useGetAllCompanies from "@/hooks/usegetAllCompanies";
// import { useDispatch } from "react-redux";
// import { setSearchCompanyByText } from "@/redux/companyslice";

// const Companies = () => {
//   const navigate = useNavigate();

//   useGetAllCompanies();
//   const [input, setInput] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(setSearchCompanyByText(input));
//   }, [input]);
//   return (
//     <div>
//       <Navbar />
//       <div className=" max-w-6xl mx-auto my-10">
//         <div className="flex items-center justify-between my-5">
//           <Input
//             className="w-fit"
//             placeholder="Filter by Name"
//             onChange={(e) => setInput(e.target.value)}
//           ></Input>
//           <Button onClick={() => navigate("/admin/companies/create")}>
//             Add Company
//           </Button>
//         </div>
//         <div>
//           <CompaniesTable />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Companies;


import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components_lite/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companyslice";
import { Search, Plus, Building2, Filter, Users } from "lucide-react";

const Companies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useGetAllCompanies();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchCompanyByText(input));
    }, 300); // Debounce search

    return () => clearTimeout(timer);
  }, [input, dispatch]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Navbar />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
              <p className="text-gray-600 mt-1">
                Manage and explore all registered companies
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Actions Bar */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies by name, location, or industry..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Stats */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-lg">
                <Users className="h-4 w-4" />
                <span>All Companies</span>
              </div>

              {/* Add Company Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/admin/companies/create")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-2 rounded-xl flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Company
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Additional Filters (Optional) */}
          <AnimatePresence>
            {input && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Filter className="h-4 w-4" />
                  <span>Filtering by: "{input}"</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Companies Table */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <CompaniesTable />
        </motion.div>

        {/* Quick Actions Footer */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 text-sm">
            Need help managing companies?{" "}
            <button 
              onClick={() => navigate("/admin/help")}
              className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors duration-200"
            >
              View documentation
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Companies;