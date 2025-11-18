import { PageHeader } from "@/components/page-header";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Terms of Service" description="Last updated: July 29, 2024" />
      <div className="prose dark:prose-invert max-w-4xl mx-auto">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using OneKit (the "Website"), you accept and agree
          to be bound by the terms and provision of this agreement. If you do
          not agree to abide by these terms, please do not use this service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          OneKit provides a collection of online tools that operate within the
          user's web browser. These services are provided "AS IS" and we assume
          no responsibility for the timeliness, deletion, or failure to store
          any user data or personalization settings.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          You agree not to use the service for any illegal or unauthorized
          purpose. You are solely responsible for your conduct and any data,
          text, information, or files that you process through the service.
        </p>

        <h2>4. Disclaimer of Warranties</h2>
        <p>
          The Website is provided on an "as is" and "as available" basis.
          OneKit makes no warranties, expressed or implied, and hereby disclaims
          and negates all other warranties, including without limitation,
          implied warranties or conditions of merchantability, fitness for a
          particular purpose, or non-infringement of intellectual property or
          other violation of rights.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          In no event shall OneKit or its suppliers be liable for any damages
          (including, without limitation, damages for loss of data or profit,
          or due to business interruption) arising out of the use or inability
          to use the materials on the Website, even if OneKit has been notified
          orally or in writing of the possibility of such damage.
        </p>
        
        <h2>6. Modifications to the Service and Prices</h2>
        <p>
          OneKit reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. The service is currently free, but we reserve the right to introduce fees for any features in the future.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          Any claim relating to OneKit's website shall be governed by the laws
          of the website owner's jurisdiction without regard to its conflict of
          law provisions.
        </p>
      </div>
    </div>
  );
}
