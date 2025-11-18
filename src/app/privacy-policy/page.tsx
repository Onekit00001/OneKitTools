import { PageHeader } from "@/components/page-header";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Privacy Policy" description="Last updated: July 29, 2024" />
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <p>
          Welcome to OneKit. We are committed to protecting your privacy. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          OneKit is designed to be a privacy-first application. All tools on
          this website function entirely within your browser. We do not
          collect, save, or transmit any personal data you input into our tools.
        </p>
        <ul>
          <li>
            <strong>Personal Data:</strong> We do not collect any personal data
            like names, email addresses, or files. Any data you process using
            our tools (e.g., text, images) stays on your device.
          </li>
          <li>
            <strong>Usage Data:</strong> We may collect anonymous usage data
            using privacy-respecting analytics to understand how our website is
            used and to improve our services. This data is aggregated and
            cannot be used to identify you personally.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>
          Since we do not collect personal information, we do not use it.
          Anonymous usage data is used solely for website improvement and
          analytics.
        </p>

        <h2>3. Third-Party Services</h2>
        <p>
          Some tools may use third-party APIs (e.g., currency converter). We
          are not responsible for the privacy practices of these third parties.
          We encourage you to read their privacy policies.
        </p>
        
        <h2>4. Cookies</h2>
        <p>
          We may use cookies for essential site functionality and for anonymous analytics. You can choose to disable cookies through your browser settings, but this may affect the functionality of the site.
        </p>

        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact
          us at onekit69@gmail.com.
        </p>
      </div>
    </div>
  );
}
