import { Link } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Atom, Cpu, Database, Award, ArrowRight, BookOpen, Layers } from 'lucide-react';

export function HomePage() {
  const researchAreas = [
    {
      title: 'Density Functional Theory (DFT)',
      description: 'First-principles electronic structure calculations to predict electronic, optical, and structural properties of novel crystal lattices.',
      icon: <Atom className="h-6 w-6 text-cmrl-blue-600 dark:text-cmrl-blue-400" />
    },
    {
      title: 'Hydrogen Storage Materials',
      description: 'Computational design and screening of high-capacity metal hydrides and complex crystal storage frameworks.',
      icon: <Cpu className="h-6 w-6 text-cmrl-blue-600 dark:text-cmrl-blue-400" />
    },
    {
      title: 'Computational Materials Science',
      description: 'Simulating material behaviors under extreme pressure and thermodynamic conditions using high-performance computing.',
      icon: <Database className="h-6 w-6 text-cmrl-blue-600 dark:text-cmrl-blue-400" />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative border-b border-gray-200 dark:border-slate-800 bg-gradient-to-b from-cmrl-blue-50/50 to-transparent dark:from-slate-900/50 dark:to-transparent py-20 lg:py-28">
        <PageContainer>
          <div className="max-w-3xl space-y-6">
            <Badge variant="info" className="mb-2">
              Computational & Crystalline Materials Research
            </Badge>
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight sm:text-5xl lg:text-6xl">
              Crystalline Material Research Lab
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
              Exploring materials through computation, crystal structure, and quantum mechanical theory. Advancing clean energy and hydrogen storage solutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" onClick={() => alert("Material database browsing will be active in future milestones.")}>
                <Layers className="mr-2 h-5 w-5" /> Explore Material Database
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/research" className="flex items-center">
                  Research Overview <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Research Areas Section */}
      <Section className="bg-white dark:bg-slate-950">
        <PageContainer>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-gray-100">Core Research Areas</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">
              Our lab focuses on quantum computational approaches to discover and characterize advanced crystalline materials.
            </p>
          </div>
          <Grid cols={3} gap="lg">
            {researchAreas.map((area, idx) => (
              <Card key={idx} className="hover:border-cmrl-blue-300 dark:hover:border-cmrl-blue-700 transition-colors">
                <CardHeader>
                  <div className="mb-2 p-3 w-fit rounded-lg bg-cmrl-blue-50 dark:bg-slate-900">
                    {area.icon}
                  </div>
                  <CardTitle>{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </PageContainer>
      </Section>

      {/* Supervisor Highlight */}
      <Section className="bg-gray-50 dark:bg-slate-900/50 border-y border-gray-200 dark:border-slate-800">
        <PageContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1 flex justify-center">
              <div className="w-48 h-48 rounded-full bg-cmrl-blue-100 dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-700 shadow-md">
                <Atom className="h-20 w-20 text-cmrl-blue-600 dark:text-cmrl-blue-400" />
              </div>
            </div>
            <div className="md:col-span-2 space-y-4">
              <Badge variant="special">Research Leadership</Badge>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-gray-100">
                [Placeholder Lab Director]
              </h2>
              <p className="text-sm font-medium text-cmrl-blue-600 dark:text-cmrl-blue-400">
                Head of Crystalline Material Research Lab
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Leading fundamental research in computational materials physics, crystal structure stability, and novel hydrogen storage hydrides.
              </p>
              <div>
                <Button variant="outline" size="sm">
                  <Link to="/people">View Lab Profiles</Link>
                </Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* Quick Highlights / Achievements */}
      <Section className="bg-white dark:bg-slate-950">
        <PageContainer>
          <Grid cols={3} gap="md">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 flex items-start space-x-4">
              <BookOpen className="h-8 w-8 text-cmrl-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-gray-100">Publications</h3>
                <p className="text-xs text-gray-500 mt-1">[Placeholder count of peer-reviewed journal papers]</p>
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 flex items-start space-x-4">
              <Award className="h-8 w-8 text-cmrl-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-gray-100">Research Grants</h3>
                <p className="text-xs text-gray-500 mt-1">[Placeholder competitive research milestones]</p>
              </div>
            </div>
            <div className="p-6 rounded-lg border border-gray-200 dark:border-slate-800 flex items-start space-x-4">
              <Layers className="h-8 w-8 text-cmrl-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-gray-100">Material Database</h3>
                <p className="text-xs text-gray-500 mt-1">[Placeholder calculated DFT structures dataset]</p>
              </div>
            </div>
          </Grid>
        </PageContainer>
      </Section>
    </div>
  );
}
