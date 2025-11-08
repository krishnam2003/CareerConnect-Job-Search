// import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../ui/carousel";
// import { Button } from "../ui/button";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSearchedQuery } from "@/redux/jobSlice";
 

 
// const Category = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Full Stack Developer",
//   "Mern Developer",
//   "Data Scientist",
//   "DevOps Engineer",
//   "Machine Learning Engineer",
//   "Artificial Intelligence Engineer",
//   "Cybersecurity Engineer",
//   "Product Manager",
//   "UX/UI Designer",
//   "Graphics Engineer",
//   "Graphics Designer",
//   "Video Editor",
// ];


// const Categories = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const searchjobHandler = (query) => {
//       dispatch(setSearchedQuery(query));
//       navigate("/browse");
//   }
//   return (
//     <div>
//       <div>
//         <h1 className="text-2xl font-bold text-center text-blue-600 mt-5 px-4 mx-auto ">
//           Explore Job Categories
//         </h1>
//         <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto px-4">
//           Browse through our most popular job categories and find opportunities that match your skills
//         </p>
//       </div>
//       <Carousel className="w-full   max-w-xl  mx-auto my-10">
//         <CarouselContent>
//           {Category.map((category, index) => {
//             return (
//               <CarouselItem className="md:basis-1/2 lg-basis-1/3 ">
//                 <Button onClick={() => searchjobHandler(category)}>
//                   {category}
//                 </Button>
//               </CarouselItem>
//             );
//           })}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default Categories;




import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Color variants for different categories
  const getCategoryColor = (index) => {
    const colors = [
      "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      "from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
      "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
      "from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700",
      "from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700",
      "from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700",
    ];
    return colors[index % colors.length];
  };

  // Icons for different categories
  const getCategoryIcon = (category) => {
    const icons = {
      "Frontend Developer": "💻",
      "Backend Developer": "⚙️",
      "Full Stack Developer": "🔧",
      "Mern Developer": "📱",
      "Data Scientist": "📊",
      "DevOps Engineer": "🔄",
      "Machine Learning Engineer": "🤖",
      "Artificial Intelligence Engineer": "🧠",
      "Cybersecurity Engineer": "🛡️",
      "Product Manager": "📈",
      "UX/UI Designer": "🎨",
      "Graphics Engineer": "🖥️",
      "Graphics Designer": "✏️",
      "Video Editor": "🎬",
    };
    return icons[category] || "💼";
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Job Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover opportunities that match your expertise. Browse through our most popular 
            job categories and find your perfect role in the tech industry.
          </p>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent className="-ml-2 md:-ml-4">
              {Category.map((category, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-2 h-full">
                    <button
                      onClick={() => searchjobHandler(category)}
                      className={`
                        w-full h-32 bg-gradient-to-r ${getCategoryColor(index)} 
                        text-white rounded-2xl shadow-lg hover:shadow-xl 
                        transform hover:scale-105 transition-all duration-300 
                        flex flex-col items-center justify-center p-6
                        group relative overflow-hidden
                      `}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                      
                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="text-2xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                          {getCategoryIcon(category)}
                        </div>
                        <h3 className="font-semibold text-sm md:text-base leading-tight">
                          {category}
                        </h3>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Styled Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <CarouselPrevious className="static transform-none bg-white border-2 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 w-12 h-12 rounded-full shadow-md" />
              <CarouselNext className="static transform-none bg-white border-2 border-gray-200 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 w-12 h-12 rounded-full shadow-md" />
            </div>
          </Carousel>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Active Jobs</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-2">50+</div>
            <div className="text-gray-600">Top Companies</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-2">14</div>
            <div className="text-gray-600">Job Categories</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Button
            onClick={() => {
              dispatch(setSearchedQuery(""));
              navigate("/browse");
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Browse All Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;