import React from 'react'
import { Mail, Users, Target, Heart, ArrowRight } from 'lucide-react'
import Navbar from './Navbar' // Import your Navbar component

const About = () => {
  const teamMembers = [
    { name: "Krishnam Singh", role: "Lead Developer", email: "singhkrishnam2003@gmail.com" },
    { name: "Anubhav", role: "Designer", email: "anubhav@gmail.com" },
    { name: "Sarah", role: "UI/UX Designer", email: "sarah@gmail.com" }
  ]

  const stats = [
    { number: "5K+", label: "Jobs Posted" },
    { number: "1K+", label: "Companies" },
    { number: "5K+", label: "Users" },
    { number: "95%", label: "Success Rate" }
  ]

  const values = [
    { icon: Target, title: "Our Mission", description: "Connecting talent with opportunity through innovative technology." },
    { icon: Heart, title: "Our Vision", description: "A world where everyone finds meaningful work that matches their skills." },
    { icon: Users, title: "Our Team", description: "Passionate professionals dedicated to transforming the job market." }
  ]

  return (
    <div>
      {/* Add Navbar here */}
      <Navbar />
      
      {/* Your existing About content */}
      <div className="max-w-6xl mx-auto my-16 px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">CareerConnect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the way people find jobs and companies discover talent through our intelligent matching platform.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 ml-4">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>

        {/* Story Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Founded in 2025, CareerConnect emerged from a simple observation: the job search process was broken. 
                Candidates were spending hours applying to irrelevant positions, while employers struggled to find the right talent.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                We built an intelligent platform that uses advanced algorithms to match candidates with opportunities 
                that truly align with their skills, experience, and career aspirations.
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium flex items-center">
                Learn More About Our Journey
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                {[
                  "AI-powered job matching",
                  "Real-time application tracking",
                  "Personalized career recommendations",
                  "Direct communication with employers",
                  "Career growth insights and analytics"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <a 
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Join millions of job seekers who have found their dream jobs through CareerConnect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-semibold">
              Start Your Job Search
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-300 font-semibold">
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;

















// import React from 'react'

// const About = () => {
//   return (
//     <div className="max-w-4xl mx-auto my-10 p-5 border border-gray-300 rounded shadow">
//       <h1 className="text-2xl font-bold mb-4">About Us</h1>
//       <p className="mb-2">We are a team of passionate individuals...</p>
//       <p className="mb-2">Our mission is to connect job seekers with their dream jobs.</p>
//       <p className="mb-2">We believe in the power of technology to transform the job market.</p>
//       <p>Contact us at <a href="mailto:singhkrishnam2003@gmail.com">singhkrishnam2003@gmail.com</a></p>
//     </div>
//   )
// }

// export default About



