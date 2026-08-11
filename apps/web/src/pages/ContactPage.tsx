import { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Section>
      <PageContainer className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Get in Touch</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Contact CMRL
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Have questions about our research, material database, or prospective student opportunities? Contact our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="text-cmrl-blue-600" />
                  <span>Laboratory Address</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p className="font-semibold text-slate-900 dark:text-gray-100">Crystalline Material Research Lab (CMRL)</p>
                <p>Department of Physics / Computational Science</p>
                <p>University Science Complex, Room 402</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="text-cmrl-blue-600" />
                  <span>Email & Inquiries</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p>General Inquiries: <span className="text-slate-800 dark:text-gray-200 font-mono">cmrl-lab@university.edu</span></p>
                <p>Director: <span className="text-slate-800 dark:text-gray-200 font-mono">supervisor@university.edu</span></p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form UI */}
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <CheckCircle2 className="h-12 w-12 text-semantic-success" />
                  <h3 className="font-semibold text-lg">Message Received</h3>
                  <p className="text-xs text-gray-500">Thank you for reaching out to CMRL. (UI Demonstration)</p>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <Input required placeholder="Dr. Jane Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <Input required type="email" placeholder="jane@example.com" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                    <Input required placeholder="Research Inquiry / Collaboration" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                      required
                      rows={4}
                      className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cmrl-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-cmrl-blue-300"
                      placeholder="Write your inquiry here..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </Section>
  );
}
