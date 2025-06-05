import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.</p>
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">We collect information you provide directly to us, such as when you create an account, and information collected automatically, such as usage data.</p>
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p className="mb-4">We use your information to provide and improve our services, communicate with you, and comply with legal obligations.</p>
      <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
      <p className="mb-4">You have the right to access, update, or delete your information. Contact us for assistance.</p>
    </div>
  );
};

export default PrivacyPolicy;
