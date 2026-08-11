import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Grid } from '@/components/layout/Grid';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Target, Compass, ShieldCheck } from 'lucide-react';

export function AboutPage() {
  return (
    <Section>
      <PageContainer className="space-y-12">
        <div className="max-w-3xl space-y-4">
          <Badge variant="info">About CMRL</Badge>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
            Laboratory Overview & Mission
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            The Crystalline Material Research Lab (CMRL) is dedicated to first-principles theoretical and computational physics for advanced functional materials.
          </p>
        </div>

        <Grid cols={3} gap="lg">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-cmrl-blue-600 mb-2" />
              <CardTitle>Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              Accelerate the discovery of hydrogen storage materials and novel hydrides through Density Functional Theory (DFT) calculations.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Compass className="h-8 w-8 text-cmrl-blue-600 mb-2" />
              <CardTitle>Philosophy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              Scientific precision, verifiable calculations, traceable material ownership, and open academic rigor.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <ShieldCheck className="h-8 w-8 text-cmrl-blue-600 mb-2" />
              <CardTitle>Data Integrity</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              Maintaining persistent research records and strict verification standards across all calculated electronic and structural properties.
            </CardContent>
          </Card>
        </Grid>

        <div className="rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Computational Infrastructure</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Our researchers utilize high-performance computing clusters running standard quantum mechanical packages (such as VASP, Quantum ESPRESSO, and WIEN2k) to evaluate phonon dispersion, band gaps, density of states (DOS), and thermodynamic phase stability.
          </p>
        </div>
      </PageContainer>
    </Section>
  );
}
