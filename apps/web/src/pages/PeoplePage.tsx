import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { UserCheck, GraduationCap, ArrowRight, Building2, BookOpen } from 'lucide-react';

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
            Faculty Supervisor & Researchers
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Meet the faculty supervisor and student researchers driving computational materials science at CMRL.
          </p>
        </div>

        {/* Official Faculty Supervisor Card */}
        <div className="rounded-2xl border border-cmrl-blue-200 dark:border-slate-800 bg-gradient-to-r from-cmrl-blue-50/80 to-white dark:from-slate-900 dark:to-slate-950 p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8 shadow-sm">
          <img
            src="https://i.ibb.co.com/tT147GSf/473670611-28433548622925526-6640702621247633687-n.jpg"
            alt="Dr. Md. Lokman Ali"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
            className="w-32 h-32 rounded-2xl object-cover border-2 border-cmrl-blue-400 flex-shrink-0 shadow"
          />
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
              <Badge variant="special">
                <UserCheck size={12} className="mr-1 inline" /> CMRL SUPERVISOR
              </Badge>
              <Badge variant="info">
                <Building2 size={12} className="mr-1 inline" /> DIRECTOR, RTTC PUST
              </Badge>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100">
              Dr. Md. Lokman Ali
            </h2>
            <p className="text-sm font-semibold text-cmrl-blue-700 dark:text-cmrl-blue-300">
              Associate Professor • Department of Physics • Pabna University of Science and Technology
            </p>
            <p className="text-xs font-mono text-gray-500">
              Ph.D. in Engineering (Osaka University, Japan) • M.S. & B.Sc. (University of Chittagong)
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Supervises Density Functional Theory (DFT) modeling, first-principles calculations, multiscale mechanics, and multi-principal element alloy research workflows across CMRL.
            </p>
            <div className="pt-2 flex justify-center md:justify-start space-x-3">
              <Button size="sm">
                <Link to="/people/dr-lokman-ali" className="flex items-center">
                  View Full Academic Profile <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <a
                href="https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <BookOpen className="mr-1.5 h-3.5 w-3.5" /> Google Scholar
                </Button>
              </a>
            </div>
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
