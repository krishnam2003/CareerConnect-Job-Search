
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Effective Date: December 2024
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                    <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
                    Introduction
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Welcome to <strong className="text-blue-600">CareerConnect</strong>. These Terms and Conditions govern your
                    use of our job portal website. By accessing or using our website, you agree to comply with these terms.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
                Acceptance of Terms
              </h2>
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      By using our website, you confirm that you accept these Terms and
                      Conditions and that you agree to comply with them. If you do not agree with any part of these terms, 
                      <strong className="text-green-700"> you must not use our website</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Changes to Terms
              </h2>
              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      We reserve the right to modify these Terms and Conditions at any time.
                      Any changes will be effective immediately upon posting on this page.
                    </p>
                    <p className="text-gray-700 leading-relaxed font-semibold">
                      Your continued use of the website after any changes constitutes your
                      acceptance of the new Terms and Conditions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                User Responsibilities
              </h2>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to use the website only for lawful purposes and in a way that
                  does not infringe the rights of, restrict, or inhibit anyone else's use
                  and enjoyment of the website.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    "Provide accurate information in your profile",
                    "Maintain the confidentiality of your account",
                    "Not engage in fraudulent activities",
                    "Respect other users' privacy and rights",
                    "Not upload malicious content",
                    "Comply with all applicable laws"
                  ].map((responsibility, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {responsibility}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">5</span>
                Intellectual Property
              </h2>
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-red-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      All content, trademarks, and other intellectual property on the website
                      are owned by or licensed to <strong className="text-red-700">CareerConnect</strong>. You may not reproduce,
                      distribute, or create derivative works from any content without our
                      express written permission.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">6</span>
                Limitation of Liability
              </h2>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-orange-600 mt-1 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      To the fullest extent permitted by law, <strong>CareerConnect</strong> shall not be
                      liable for any direct, indirect, incidental, special, consequential, or
                      punitive damages arising from your use of the website.
                    </p>
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600 italic">
                        This includes but is not limited to: data loss, service interruptions, 
                        or any damages resulting from reliance on website content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Governing Law */}
            <section className="mb-12 pb-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">7</span>
                Governing Law
              </h2>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                <p className="text-gray-700 leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in
                  accordance with the laws of <strong className="text-indigo-700">India</strong>. Any disputes arising in
                  connection with these terms shall be subject to the exclusive
                  jurisdiction of the courts of <strong className="text-indigo-700">India</strong>.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="bg-teal-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">8</span>
                Contact Information
              </h2>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms and Conditions, please
                  contact us:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="tel:+918945678488"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200 p-3 bg-white rounded-lg border border-teal-100"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +91-8945678488
                  </a>
                  <a 
                    href="mailto:singhkrishnam2003@gmail.com"
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-200 p-3 bg-white rounded-lg border border-teal-100"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    singhkrishnam2003@gmail.com
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Acceptance Footer */}
        <div className="text-center">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <p className="text-gray-600 mb-4">
              By using CareerConnect, you acknowledge that you have read and understood these Terms of Service.
            </p>
            <div className="flex items-center justify-center text-green-600 font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Thank you for choosing CareerConnect
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

































// import React from "react";

// const TermsOfService = () => {
//   return (
//     <div>
//       <h1>Terms and Conditions</h1>

//       <h2>1. Introduction</h2>
//       <p>
//         Welcome to [Your Website Name]. These Terms and Conditions govern your
//         use of our website located at [Your Website URL]. By accessing or using
//         our website, you agree to comply with these terms.
//       </p>

//       <h2>2. Acceptance of Terms</h2>
//       <p>
//         By using our website, you confirm that you accept these Terms and
//         Conditions and that you agree to comply with them. If you do not agree
//         with any part of these terms, you must not use our website.
//       </p>

//       <h2>3. Changes to Terms</h2>
//       <p>
//         We reserve the right to modify these Terms and Conditions at any time.
//         Any changes will be effective immediately upon posting on this page.
//         Your continued use of the website after any changes constitutes your
//         acceptance of the new Terms and Conditions.
//       </p>

//       <h2>4. User Responsibilities</h2>
//       <p>
//         You agree to use the website only for lawful purposes and in a way that
//         does not infringe the rights of, restrict, or inhibit anyone else's use
//         and enjoyment of the website.
//       </p>

//       <h2>5. Intellectual Property</h2>
//       <p>
//         All content, trademarks, and other intellectual property on the website
//         are owned by or licensed to [Your Website Name]. You may not reproduce,
//         distribute, or create derivative works from any content without our
//         express written permission.
//       </p>

//       <h2>6. Limitation of Liability</h2>
//       <p>
//         To the fullest extent permitted by law, [Your Website Name] shall not be
//         liable for any direct, indirect, incidental, special, consequential, or
//         punitive damages arising from your use of the website.
//       </p>

//       <h2>7. Governing Law</h2>
//       <p>
//         These Terms and Conditions shall be governed by and construed in
//         accordance with the laws of [Your Jurisdiction]. Any disputes arising in
//         connection with these terms shall be subject to the exclusive
//         jurisdiction of the courts of [Your Jurisdiction].
//       </p>

//       <h2>8. Contact Information</h2>
//       <p>
//         If you have any questions about these Terms and Conditions, please
//         contact us at +91-8945678488.
//       </p>
//     </div>
//   );
// };

// export default TermsOfService;