

import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Last updated: December 2024
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    This Privacy Policy outlines how CareerConnect collects, uses, and protects your
                    information when you visit our job portal website. Your privacy is important to us.
                  </p>
                </div>
              </div>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Information We Collect
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal Information
                  </h3>
                  <ul className="space-y-2">
                    {['Name', 'Email address', 'Phone number', 'Resume/CV', 'Work experience', 'Education history'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-semibold text-green-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Usage Data
                  </h3>
                  <ul className="space-y-2">
                    {['IP address', 'Browser type', 'Pages visited', 'Time spent on pages', 'Device information', 'Cookies and tracking'].map((item, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                How We Use Your Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Provide and maintain our services",
                  "Notify you about changes to our services",
                  "Allow participation in interactive features",
                  "Provide customer support",
                  "Gather analysis to improve our services",
                  "Monitor usage of our services",
                  "Detect, prevent, and address technical issues",
                  "Send job recommendations and alerts"
                ].map((use, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{use}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                Data Security
              </h2>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  We take the security of your personal information seriously and implement 
                  <strong className="text-yellow-700"> appropriate technical and organizational measures</strong> to protect it, 
                  including encryption, secure servers, and regular security assessments.
                </p>
              </div>
            </section>

            {/* Sharing Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                Sharing Your Information
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Service providers who assist us in operating our website
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Law enforcement agencies if required by law
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Potential employers (only with your explicit consent)
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                Your Rights
              </h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Access your personal information",
                  "Request correction of your personal information",
                  "Request deletion of your personal information",
                  "Object to processing of your personal information",
                  "Request data portability",
                  "Withdraw consent at any time"
                ].map((right, index) => (
                  <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <svg className="w-4 h-4 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{right}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">7</span>
                Changes to This Privacy Policy
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  Significant changes will be communicated via email or prominent website notice.
                </p>
              </div>
            </section>

            {/* Contact Us */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">8</span>
                Contact Us
              </h2>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <a 
                  href="mailto:singhkrishnam2003@gmail.com"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  singhkrishnam2003@gmail.com
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-500 text-sm">
          <p>Thank you for trusting CareerConnect with your personal information.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;















// import React from "react";

// const PrivacyPolicy = () => {
//   return (
//     <div>
//       <h1>Privacy Policy for Job Portal</h1>

//       <h2>1. Introduction</h2>
//       <p>
//         This Privacy Policy outlines how we collect, use, and protect your
//         information when you visit our job portal website.
//       </p>

//       <h2>2. Information We Collect</h2>
//       <ul>
//         <li>
//           <strong>Personal Information:</strong>
//           <ul>
//             <li>Name</li>
//             <li>Email address</li>
//             <li>Phone number</li>
//             <li>Resume/CV</li>
//           </ul>
//         </li>
//         <li>
//           <strong>Usage Data:</strong>
//           <ul>
//             <li>IP address</li>
//             <li>Browser type</li>
//             <li>Pages visited</li>
//             <li>Time spent on pages</li>
//           </ul>
//         </li>
//       </ul>

//       <h2>3. How We Use Your Information</h2>
//       <ul>
//         <li>To provide and maintain our services</li>
//         <li>To notify you about changes to our services</li>
//         <li>To allow you to participate in interactive features</li>
//         <li>To provide customer support</li>
//         <li>
//           To gather analysis or valuable information so that we can improve our
//           services
//         </li>
//         <li>To monitor the usage of our services</li>
//         <li>To detect, prevent, and address technical issues</li>
//       </ul>

//       <h2>4. Data Security</h2>
//       <p>
//         We take the security of your personal information seriously and
//         implement appropriate technical and organizational measures to protect
//         it.
//       </p>

//       <h2>5. Sharing Your Information</h2>
//       <p>
//         We do not sell or rent your personal information to third parties. We
//         may share your information with:
//       </p>
//       <ul>
//         <li>Service providers who assist us in operating our website</li>
//         <li>Law enforcement agencies if required by law</li>
//       </ul>

//       <h2>6. Your Rights</h2>
//       <p>You have the right to:</p>
//       <ul>
//         <li>Access your personal information</li>
//         <li>Request correction of your personal information</li>
//         <li>Request deletion of your personal information</li>
//       </ul>

//       <h2>7. Changes to This Privacy Policy</h2>
//       <p>
//         We may update our Privacy Policy from time to time. We will notify you
//         of any changes by posting the new Privacy Policy on this page.
//       </p>

//       <h2>8. Contact Us</h2>
//       <p>
//         If you have any questions about this Privacy Policy, please contact us
//         at singhkrishnam2003@gmail.com
//       </p>
//     </div>
//   );
// };

// export default PrivacyPolicy;