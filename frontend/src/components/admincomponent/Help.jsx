import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  Search, 
  Plus, 
  Users, 
  Filter, 
  BookOpen,
  MessageCircle,
  Video,
  Download,
  ArrowLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";
import Navbar from "../components_lite/Navbar";

const Help = () => {
  const navigate = useNavigate();

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

  const helpSections = [
    {
      icon: Building2,
      title: "Company Management",
      description: "Learn how to add, edit, and manage companies in the system",
      topics: [
        "Adding new companies",
        "Editing company information",
        "Searching and filtering companies",
        "Bulk operations"
      ]
    },
    {
      icon: Users,
      title: "User Management",
      description: "Manage user access and permissions for companies",
      topics: [
        "Assigning users to companies",
        "Setting user permissions",
        "Managing user roles",
        "Access control"
      ]
    },
    {
      icon: Search,
      title: "Search & Filters",
      description: "Master the search and filtering capabilities",
      topics: [
        "Real-time search by name, location, industry",
        "Advanced filtering options",
        "Search shortcuts and tips",
        "Saving search queries"
      ]
    },
    {
      icon: Plus,
      title: "Adding Companies",
      description: "Step-by-step guide to adding new companies",
      topics: [
        "Required fields and validation",
        "Company profile setup",
        "Adding company contacts",
        "Setting up company settings"
      ]
    }
  ];

  const quickActions = [
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      icon: Video,
      action: () => console.log("Open videos")
    },
    {
      title: "Contact Support",
      description: "Get help from our support team",
      icon: MessageCircle,
      action: () => console.log("Contact support")
    },
    {
      title: "Download Guide",
      description: "PDF documentation for offline use",
      icon: Download,
      action: () => console.log("Download guide")
    }
  ];

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
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/companies")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Companies
              </Button>
            </motion.div>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Help & Documentation</h1>
              <p className="text-gray-600 mt-1">
                Comprehensive guides for managing companies and users
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Articles & Guides</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Video className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Video Tutorials</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">24/7</p>
                <p className="text-sm text-gray-600">Support Available</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Help Sections */}
          <div className="lg:col-span-2">
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Documentation</h2>
              <p className="text-gray-600">
                Detailed guides for all features and functionalities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {helpSections.map((section, index) => (
                <motion.div
                  key={section.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-200 cursor-pointer"
                  onClick={() => console.log(`Open ${section.title}`)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {section.description}
                      </p>
                      <ul className="space-y-2">
                        {section.topics.map((topic) => (
                          <li key={topic} className="flex items-center text-sm text-gray-600">
                            <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div>
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
              
              <div className="space-y-4">
                {quickActions.map((action) => (
                  <motion.div
                    key={action.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all duration-200"
                    onClick={action.action}
                  >
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <action.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{action.title}</p>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Popular Articles */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Popular Articles</h4>
                <div className="space-y-3">
                  {[
                    "How to add a new company",
                    "Setting up user permissions",
                    "Advanced search techniques",
                    "Bulk import companies"
                  ].map((article) => (
                    <div
                      key={article}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    >
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{article}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I search for companies?",
                answer: "Use the search bar at the top of the companies page. You can search by company name, location, industry, or any other relevant field."
              },
              {
                question: "What information is required to add a company?",
                answer: "Minimum required fields are company name and email. Additional fields like phone, address, and industry are optional but recommended."
              },
              {
                question: "Can I export company data?",
                answer: "Yes, you can export company data in CSV format from the companies table using the export functionality."
              },
              {
                question: "How do user permissions work?",
                answer: "User permissions are managed per company. You can assign different access levels like view-only, edit, or admin for each user-company relationship."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors duration-200">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Help;