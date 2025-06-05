import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">By using our services, you agree to these terms. Please read them carefully.</p>
      <h2 className="text-2xl font-semibold mb-4">Use of Services</h2>
      <p className="mb-4">You must follow all policies made available to you within the services. Do not misuse our services.</p>
      <h2 className="text-2xl font-semibold mb-4">Termination</h2>
      <p className="mb-4">We may suspend or terminate your access if you violate these terms or our policies.</p>
      <h2 className="text-2xl font-semibold mb-4">Liability</h2>
      <p className="mb-4">Our services are provided "as is" without warranties. We are not liable for damages arising from use of our services.</p>
    </div>
  );
};

export default TermsOfService;
