import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader
        title="Contact Us"
        description="We'd love to hear from you. Reach out with any questions, feedback, or suggestions."
      />
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              For all inquiries, please send us an email. We'll do our best to get back to you as soon as possible.
            </p>
            <div className="flex items-center gap-4 p-3 rounded-lg bg-secondary">
              <span className="font-mono text-sm break-all">onekit69@gmail.com</span>
              <Button asChild>
                <a href="mailto:onekit69@gmail.com">
                  <Send className="h-4 w-4 mr-2"/> Email Us
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
