import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Atom, Cpu, Activity, Flame } from 'lucide-react';

export function ResearchPage() {
  const directions = [
    {
      title: 'Hydrogen Storage Hydrides',
      badge: 'High Priority',
      description: 'Investigating gravimetric and volumetric hydrogen capacities of lightweight ternary and quaternary metal hydrides.',
      icon: <Flame className="h-6 w-6 text-cmrl-blue-600" />
    },
    {
      title: 'Electronic & Band Structure Engineering',
      badge: 'Active',
      description: 'Analyzing electronic density of states (DOS/PDOS), band gaps, and charge density distributions in crystalline phases.',
      icon: <Atom className="h-6 w-6 text-cmrl-blue-600" />
    },
    {
      title: 'Phonon & Mechanical Stability',
      badge: 'Active',
      description: 'Calculating phonon dispersion curves, elastic constants, bulk modulus, and thermodynamic stability metrics.',
      icon: <Activity className="h-6 w-6 text-cmrl-blue-600" />
    },
    {
      title: 'Extreme Pressure Phases',
      badge: 'Exploratory',
      description: 'Simulating crystal structure transformations and phase transitions under high hydrostatic pressures.',
      icon: <Cpu className="h-6 w-6 text-cmrl-blue-600" />
    }
  ];

  return (
    <Section>
      <PageContainer className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">Research Areas</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Computational Research Focus
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            CMRL applies first-principles Density Functional Theory (DFT) calculations to explore and design novel crystalline compounds.
          </p>
        </div>

        <Grid cols={2} gap="lg">
          {directions.map((dir, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-cmrl-blue-50 dark:bg-slate-900">
                    {dir.icon}
                  </div>
                  <CardTitle>{dir.title}</CardTitle>
                </div>
                <Badge variant="neutral">{dir.badge}</Badge>
              </CardHeader>
              <CardContent className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {dir.description}
              </CardContent>
            </Card>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}
