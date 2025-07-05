import React from "react";
import Head from "next/head";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Head>
        <title>Privacy Policy - BotSub</title>
        <meta name="description" content="BotSub Privacy Policy" />
      </Head>

      <h1 className="text-3xl font-bold mb-6 text-center">
        BotSub Privacy Policy
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to BotSub {`("we", "our", or "us")`}. We are committed to
            protecting your privacy and ensuring the security of your personal
            information.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you use our WhatsApp automation
            services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Data Collection</h2>
          <p className="mb-4">
            BotSub is designed with privacy in mind. We want to be absolutely
            clear about what data we collect:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>User IDs:</strong> We store encrypted user IDs necessary
              for the operation of our service.
            </li>
            <li>
              <strong>No WhatsApp Data:</strong> We do not store any message
              content, contact information, media files, or any other data from
              WhatsApp conversations.
            </li>
            <li>
              <strong>Minimal Metadata:</strong> We may collect minimal metadata
              required for service operation (e.g., timestamps), but this is
              kept to the absolute minimum.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Data Encryption</h2>
          <p className="mb-4">
            All user IDs we store are encrypted using industry-standard
            encryption protocols. This ensures that even in the unlikely event
            of a data breach, your information remains protected.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Third-Party Sharing</h2>
          <p className="mb-4">
            We do not share, sell, rent, or trade your information with any
            third parties. This includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No data sharing with advertisers or marketers</li>
            <li>No data sharing with analytics companies</li>
            <li>No data sharing with other service providers</li>
          </ul>
          <p className="mt-4">
            The only exception would be if we are required by law to disclose
            information in response to valid legal process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Data Retention</h2>
          <p>
            We retain encrypted user IDs only for as long as necessary to
            provide our services. If you delete your account or stop using our
            services, we will delete your information within 30 days.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Security Measures</h2>
          <p className="mb-4">
            We implement robust security measures to protect your information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>End-to-end encryption for all stored data</li>
            <li>Regular security audits</li>
            <li>Access controls to limit internal access to data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            7. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the {`"effective date"`} at the bottom.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at thebotsubteam@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
