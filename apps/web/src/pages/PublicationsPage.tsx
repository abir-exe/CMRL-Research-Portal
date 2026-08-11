import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { BookOpen } from 'lucide-react';

export function PublicationsPage() {
  const publications = [
    {
      id: 'PUB-2026-001',
      title: '[Placeholder Paper Title: First-Principles Study of Perovskite Hydrides]',
      authors: '[Placeholder Author A, Placeholder Author B]',
      journal: '[Placeholder Journal of Computational Physics]',
      year: '2026',
      status: 'PUBLISHED'
    },
    {
      id: 'PUB-2025-002',
      title: '[Placeholder Paper Title: Phonon Dispersion in High-Pressure Ternary Hydrides]',
      authors: '[Placeholder Author C, Lab Supervisor]',
      journal: '[Placeholder Physical Review B]',
      year: '2025',
      status: 'PUBLISHED'
    },
    {
      id: 'PUB-2025-001',
      title: '[Placeholder Paper Title: Electronic Properties and Band Structure of Li-based Compounds]',
      authors: '[Placeholder Author A, Lab Supervisor]',
      journal: '[Placeholder Computational Materials Science]',
      year: '2025',
      status: 'PUBLISHED'
    }
  ];

  return (
    <Section>
      <PageContainer className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Academic Output</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Peer-Reviewed Publications
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Research papers and computational findings published by CMRL lab members.
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">ID</TableHead>
                <TableHead>Publication Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead className="w-[80px]">Year</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((pub) => (
                <TableRow key={pub.id}>
                  <TableCell className="font-mono text-xs text-gray-500">{pub.id}</TableCell>
                  <TableCell className="font-medium text-slate-900 dark:text-gray-100 flex items-center space-x-2">
                    <BookOpen size={16} className="text-cmrl-blue-600 flex-shrink-0" />
                    <span>{pub.title}</span>
                  </TableCell>
                  <TableCell className="text-xs text-gray-600 dark:text-gray-400">{pub.authors}</TableCell>
                  <TableCell className="text-xs text-gray-600 dark:text-gray-400 italic">{pub.journal}</TableCell>
                  <TableCell className="text-xs">{pub.year}</TableCell>
                  <TableCell>
                    <Badge variant="special">{pub.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageContainer>
    </Section>
  );
}
