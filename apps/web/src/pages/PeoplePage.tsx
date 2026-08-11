import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { UserCheck, GraduationCap } from 'lucide-react';

export function PeoplePage() {
  const students = [
    { name: '[Placeholder Student 1]', role: 'Graduate Researcher', rank: 'INTERMEDIATE', focus: 'Hydrogen Storage Hydrides' },
    { name: '[Placeholder Student 2]', role: 'Research Fellow', rank: 'ADVANCED', focus: 'Electronic Properties & Band Gaps' },
    { name: '[Placeholder Student 3]', role: 'Undergraduate Researcher', rank: 'BEGINNER', focus: 'Mechanical & Elastic Stability' }
  ];

  return (
    <Section>
      <PageContainer className="space-y-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Lab Team</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Researchers & Personnel
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Meet the supervisor and student researchers driving computational materials studies at CMRL.
          </p>
        </div>

        {/* Supervisor Section */}
        <div className="rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="w-32 h-32 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
            <UserCheck className="h-16 w-16 text-cmrl-blue-600 dark:text-cmrl-blue-400" />
          </div>
          <div className="space-y-2">
            <Badge variant="special">Laboratory Director / Supervisor</Badge>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">[Placeholder Lab Director]</h2>
            <p className="text-sm text-gray-500">PhD in Computational Condensed Matter Physics</p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Supervises DFT modeling, student research projects, and material property verification workflows across the research portal.
            </p>
          </div>
        </div>

        {/* Student Researchers */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100 mb-6">Student Researchers</h2>
          <Grid cols={3} gap="lg">
            {students.map((st, idx) => (
              <Card key={idx}>
                <CardHeader className="flex flex-row items-center space-x-3 space-y-0">
                  <div className="p-2 rounded-full bg-cmrl-blue-50 dark:bg-slate-800">
                    <GraduationCap className="h-5 w-5 text-cmrl-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{st.name}</CardTitle>
                    <p className="text-xs text-gray-500">{st.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-between">
                    <span>Rank:</span>
                    <Badge variant="info">{st.rank}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Focus Area:</span>
                    <span className="font-medium text-slate-800 dark:text-gray-200">{st.focus}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </div>
      </PageContainer>
    </Section>
  );
}
