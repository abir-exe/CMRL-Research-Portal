import { PageContainer } from '@/components/layout/PageContainer';
import { Section } from '@/components/layout/Section';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  GraduationCap,
  Award,
  BookOpen,
  Mail,
  ExternalLink,
  Layers,
  Cpu,
  UserCheck,
  Building2,
  Atom,
  CheckCircle2,
} from 'lucide-react';

export function SupervisorProfilePage() {
  const supervisorData = {
    fullName: 'Dr. Md. Lokman Ali',
    designation: 'Associate Professor',
    department: 'Department of Physics',
    university: 'Pabna University of Science and Technology',
    administrativePosition: 'Director, Research and Technology Transfer Cell (RTTC), PUST',
    email: 'lokman.ali@pust.ac.bd',
    photoUrl: 'https://i.ibb.co.com/tT147GSf/473670611-28433548622925526-6640702621247633687-n.jpg',
    education: [
      { degree: 'Ph.D. in Engineering', institution: 'Osaka University, Japan' },
      { degree: 'M.S. in Physics', institution: 'University of Chittagong, Bangladesh' },
      { degree: 'B.Sc. (Hons.) in Physics', institution: 'University of Chittagong, Bangladesh' },
    ],
    researchInterests: [
      'Computational Materials Science',
      'Density Functional Theory',
      'First-Principles Calculations',
      'Multiscale Materials Modeling',
      'Computational Mechanics',
      'Molecular Dynamics',
      'Monte Carlo Simulation',
      'Materials Synthesis',
      'Optoelectronic Materials',
      'Sustainable Materials',
      'Lead-Free Materials',
      'Theoretical Solid Mechanics',
      'Multi-Principal-Element Alloys / High-Entropy Alloys',
    ],
    software: [
      'CASTEP',
      'VASP',
      'LAMMPS',
      'SCAPS-1D',
      'DFT',
      'First-Principles Calculations',
      'Molecular Dynamics',
    ],
    currentResearchProject:
      'Chemical short-range order (CSRO) formation on the grain boundary in multi-principal element alloys',
    externalProfiles: {
      googleScholar: 'https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en',
      researchGate: 'https://www.researchgate.net/profile/Md-Lokman-Ali',
      orcid: 'https://orcid.org/0000-0001-5750-9412',
      pustFacultyProfile: 'https://pust.ac.bd/academic/departments/dept_teachers/dept_teachers_profile/100091',
      facebook: 'https://www.facebook.com/lokman.ali.50/',
    },
    bio: 'Dr. Md. Lokman Ali is an Associate Professor in the Department of Physics at Pabna University of Science and Technology (PUST) and serves as the Director of the Research and Technology Transfer Cell (RTTC), PUST. He earned his Ph.D. in Engineering from Osaka University, Japan. His research focuses on first-principles Density Functional Theory (DFT) modeling, multiscale mechanics, computational materials science, and grain boundary short-range ordering in multi-principal-element alloys.',
  };

  return (
    <Section>
      <PageContainer className="space-y-8">
        {/* Header Hero Banner */}
        <div className="rounded-2xl border border-cmrl-blue-200 dark:border-slate-800 bg-gradient-to-r from-cmrl-blue-50/90 via-white to-cmrl-blue-50/30 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar Picture */}
            <div className="relative flex-shrink-0">
              <img
                src={supervisorData.photoUrl}
                alt={supervisorData.fullName}
                onError={(e) => {
                  // Fallback if image CORS/CDN fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-md"
              />
              <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-cmrl-blue-600 dark:bg-slate-800 flex items-center justify-center text-white text-3xl font-extrabold border-4 border-white dark:border-slate-800 shadow-md -mt-32 md:-mt-36 -z-10">
                LA
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                <Badge variant="special">
                  <UserCheck size={12} className="mr-1 inline" /> CMRL SUPERVISOR
                </Badge>
                <Badge variant="info">
                  <Building2 size={12} className="mr-1 inline" /> DIRECTOR, RTTC PUST
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-gray-50 tracking-tight">
                {supervisorData.fullName}
              </h1>

              <div className="text-sm font-semibold text-cmrl-blue-700 dark:text-cmrl-blue-300">
                {supervisorData.designation} • {supervisorData.department}
              </div>

              <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
                {supervisorData.university}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                <a href={`mailto:${supervisorData.email}`}>
                  <Button size="sm">
                    <Mail className="mr-2 h-4 w-4" /> Contact Supervisor
                  </Button>
                </a>
                <a href={supervisorData.externalProfiles.googleScholar} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    Google Scholar <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </a>
                <a href={supervisorData.externalProfiles.orcid} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">
                    ORCID Profile <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* About & Administrative Roles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Atom size={18} className="text-cmrl-blue-600" />
                  <span>About & Administrative Leadership</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 leading-relaxed text-xs text-gray-600 dark:text-gray-300">
                <p>{supervisorData.bio}</p>
                <div className="p-3 rounded-lg bg-cmrl-blue-50/60 dark:bg-slate-900 border border-cmrl-blue-100 dark:border-slate-800 space-y-1">
                  <span className="font-semibold text-slate-900 dark:text-gray-100 block">
                    Current Administrative Position:
                  </span>
                  <p className="text-cmrl-blue-700 dark:text-cmrl-blue-300 font-medium">
                    {supervisorData.administrativePosition}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Current Active Research Project */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Layers size={18} className="text-purple-600" />
                  <span>Active Lab Research Project</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-slate-900 border border-purple-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="special">IN_PROGRESS</Badge>
                    <span className="text-[10px] text-gray-400 font-mono">PRIMARY INVESTIGATOR</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-gray-100">
                    "{supervisorData.currentResearchProject}"
                  </h3>
                  <p className="text-xs text-gray-500">
                    Focuses on computational modeling of chemical short-range order (CSRO) dynamics across grain boundaries in high-entropy and multi-principal element alloy systems using DFT and MD.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Research Focus & Software Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Cpu size={18} className="text-emerald-600" />
                  <span>Research Focus & Computational Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Verified Research Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {supervisorData.researchInterests.map((interest, idx) => (
                      <Badge key={idx} variant="info">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Methods & Computational Software
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {supervisorData.software.map((tool, idx) => (
                      <Badge key={idx} variant="warning" className="font-mono">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <GraduationCap size={18} className="text-cmrl-blue-600" />
                  <span>Education & Credentials</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {supervisorData.education.map((edu, idx) => (
                  <div key={idx} className="space-y-1 border-l-2 border-cmrl-blue-500 pl-3">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-gray-100">{edu.degree}</h4>
                    <p className="text-[11px] text-gray-500">{edu.institution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Official Academic Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <BookOpen size={18} className="text-amber-500" />
                  <span>Academic Profiles & Networks</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a
                  href={supervisorData.externalProfiles.pustFacultyProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors text-xs font-medium text-slate-800 dark:text-gray-200"
                >
                  <span className="flex items-center">
                    <Building2 size={14} className="mr-2 text-cmrl-blue-600" /> PUST Faculty Profile
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>

                <a
                  href={supervisorData.externalProfiles.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors text-xs font-medium text-slate-800 dark:text-gray-200"
                >
                  <span className="flex items-center">
                    <BookOpen size={14} className="mr-2 text-blue-500" /> Google Scholar Profile
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>

                <a
                  href={supervisorData.externalProfiles.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors text-xs font-medium text-slate-800 dark:text-gray-200"
                >
                  <span className="flex items-center">
                    <Layers size={14} className="mr-2 text-emerald-500" /> ResearchGate Profile
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>

                <a
                  href={supervisorData.externalProfiles.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors text-xs font-medium text-slate-800 dark:text-gray-200"
                >
                  <span className="flex items-center">
                    <Award size={14} className="mr-2 text-lime-600" /> ORCID iD Profile
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>

                <a
                  href={supervisorData.externalProfiles.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900 flex items-center justify-between transition-colors text-xs font-medium text-slate-800 dark:text-gray-200"
                >
                  <span className="flex items-center">
                    <CheckCircle2 size={14} className="mr-2 text-blue-600" /> Professional Facebook Profile
                  </span>
                  <ExternalLink size={12} className="text-gray-400" />
                </a>
              </CardContent>
            </Card>

            {/* Official Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Mail size={18} className="text-cmrl-blue-600" />
                  <span>Institutional Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Primary Public Email</span>
                  <a
                    href={`mailto:${supervisorData.email}`}
                    className="font-mono text-cmrl-blue-600 dark:text-cmrl-blue-400 font-semibold hover:underline"
                  >
                    {supervisorData.email}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold block">Office Location</span>
                  <p className="text-gray-600 dark:text-gray-300">
                    Department of Physics, PUST / Research & Technology Transfer Cell (RTTC), PUST
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
