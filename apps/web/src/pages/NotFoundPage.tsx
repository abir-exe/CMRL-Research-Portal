import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { FileX } from 'lucide-react';

export function NotFoundPage() {
  return (
    <Section>
      <PageContainer className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-4">
        <div className="p-4 rounded-full bg-red-50 dark:bg-slate-900 text-semantic-danger">
          <FileX size={48} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100">404 - Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md text-sm">
          The research page or resource you requested does not exist or has been moved.
        </p>
        <Button>
          <Link to="/">Return to Homepage</Link>
        </Button>
      </PageContainer>
    </Section>
  );
}
