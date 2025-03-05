const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
          <h1 className="text-4xl font-bold text-blue-600 text-center">Privacy Policy</h1>
          <p className="text-gray-600 text-center">
            Effective Date: March 5, 2025
          </p>
          <p className="text-gray-700 leading-relaxed">
            Welcome to the Student Mentorship Platform. Your privacy is important to us, and this Privacy Policy
            explains how we collect, use, and protect your personal information when you use our platform.
          </p>
  
          <div className="space-y-5">
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">1. Information We Collect</h2>
              <p className="text-gray-700">
                We collect personal information such as your name, email address, profile picture, and any additional
                information you provide when creating your profile or interacting with mentors and mentees.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>To create and manage your account.</li>
                <li>To match students with suitable mentors.</li>
                <li>To improve platform features and user experience.</li>
                <li>To send important updates and notifications.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">3. Data Sharing and Disclosure</h2>
              <p className="text-gray-700">
                We do not sell your personal data. We may share it with service providers for platform improvements, or
                when required by law.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">4. Security Measures</h2>
              <p className="text-gray-700">
                We implement industry-standard security practices to protect your data, including encryption, access controls, and regular audits.
              </p>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">5. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access and update your personal information anytime.</li>
                <li>Request deletion of your account and data.</li>
                <li>Opt-out of non-essential communications.</li>
              </ul>
            </section>
  
            <section>
              <h2 className="text-2xl font-semibold text-blue-500">6. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. Significant changes will be communicated to you
                through the platform or via email.
              </p>
            </section>
  
            <section className="text-center">
              <p className="text-gray-700">
                If you have any questions or concerns about our Privacy Policy, feel free to contact us at:
                <a
                  href="mailto:support@studentmentorship.com"
                  className="text-blue-500 font-medium hover:underline ml-1"
                >
                  support@studentmentorship.com
                </a>
              </p>
            </section>
          </div>
  
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Student Mentorship Platform. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;
  