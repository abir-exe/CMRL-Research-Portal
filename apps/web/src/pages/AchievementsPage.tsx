import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Award, Trophy, Star } from 'lucide-react';

export function AchievementsPage() {
  const achievements = [
    {
      title: '[Placeholder Milestone: National Computational Physics Grant]',
      date: '2026',
      category: 'Research Grant',
      description: '[Placeholder details regarding HPC supercomputing resource allocation for DFT hydride modeling.]',
      icon: <Trophy className="h-6 w-6 text-amber-500" />
    },
    {
      title: '[Placeholder Award: Best Student Poster Award]',
      date: '2025',
      category: 'Student Award',
      description: '[Placeholder award given for exceptional crystal phase stability simulations at an academic conference.]',
      icon: <Award className="h-6 w-6 text-cmrl-blue-600" />
    },
    {
      title: '[Placeholder Milestone: 500+ DFT Material Calculations Completed]',
      date: '2025',
      category: 'Database Achievement',
      description: '[Placeholder achievement for reaching 500 standardized property calculation sets in the lab repository.]',
      icon: <Star className="h-6 w-6 text-purple-600" />
    }
  ];

  return (
    <Section>
      <PageContainer className="space-y-8">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Recognition</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Lab & Student Achievements
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Milestones, research grants, and student honors earned by CMRL.
          </p>
        </div>

        <Grid cols={3} gap="lg">
          {achievements.map((ach, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-md bg-gray-50 dark:bg-slate-900">
                    {ach.icon}
                  </div>
                  <Badge variant="warning">{ach.date}</Badge>
                </div>
                <CardTitle className="text-base">{ach.title}</CardTitle>
                <p className="text-xs font-medium text-cmrl-blue-600 dark:text-cmrl-blue-400">{ach.category}</p>
              </CardHeader>
              <CardContent className="text-xs text-gray-600 dark:text-gray-400">
                {ach.description}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}
