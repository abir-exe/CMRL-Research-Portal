import { User, IUser } from '../models/User';

export const LOKMAN_ALI_SUPERVISOR_DATA = {
  userId: 'CMRL-SUPERVISOR-100091',
  firebaseUid: 'PROVISIONED_LOKMAN_ALI',
  role: 'SUPERVISOR' as const,
  accountStatus: 'ACTIVE' as const,
  rank: 'SENIOR_MEMBER' as const,
  profile: {
    fullName: 'Dr. Md. Lokman Ali',
    email: 'lokman.ali@pust.ac.bd',
    university: 'Pabna University of Science and Technology',
    department: 'Department of Physics',
    designation: 'Associate Professor',
    administrativePositions: ['Director, Research and Technology Transfer Cell, PUST'],
    education: [
      { degree: 'B.Sc. (Hons.) in Physics', institution: 'University of Chittagong' },
      { degree: 'M.S. in Physics', institution: 'University of Chittagong' },
      { degree: 'Ph.D. in Engineering', institution: 'Osaka University, Japan' },
    ],
    personalEmail: 'lokman.cu12@gmail.com', // Kept private
    photoUrl: 'https://i.ibb.co.com/tT147GSf/473670611-28433548622925526-6640702621247633687-n.jpg',
  },
  researchProfile: {
    bio: 'Associate Professor at the Department of Physics, Pabna University of Science and Technology (PUST), and Director of the Research and Technology Transfer Cell (RTTC), PUST. Specialized in computational materials science, first-principles DFT modeling, and multi-principal-element alloys.',
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
  },
  externalProfiles: {
    googleScholar: 'https://scholar.google.com/citations?user=agk7avEAAAAJ&hl=en',
    researchGate: 'https://www.researchgate.net/profile/Md-Lokman-Ali',
    orcid: 'https://orcid.org/0000-0001-5750-9412',
    facebook: 'https://www.facebook.com/lokman.ali.50/',
    pustFacultyProfile: 'https://pust.ac.bd/academic/departments/dept_teachers/dept_teachers_profile/100091',
  },
};

export async function seedSupervisorProfile(): Promise<IUser> {
  // Check if supervisor account exists by email or userId
  let supervisor = await User.findOne({
    $or: [{ 'profile.email': 'lokman.ali@pust.ac.bd' }, { userId: 'CMRL-SUPERVISOR-100091' }],
  });

  if (!supervisor) {
    supervisor = await User.create(LOKMAN_ALI_SUPERVISOR_DATA);
    console.log('Successfully seeded Dr. Md. Lokman Ali Supervisor Profile in MongoDB.');
  } else {
    // Idempotent update: preserve firebaseUid if already linked by login
    const currentFirebaseUid = supervisor.firebaseUid.startsWith('PROVISIONED_')
      ? LOKMAN_ALI_SUPERVISOR_DATA.firebaseUid
      : supervisor.firebaseUid;

    supervisor.role = 'SUPERVISOR';
    supervisor.accountStatus = 'ACTIVE';
    supervisor.firebaseUid = currentFirebaseUid;
    supervisor.profile.fullName = LOKMAN_ALI_SUPERVISOR_DATA.profile.fullName;
    supervisor.profile.university = LOKMAN_ALI_SUPERVISOR_DATA.profile.university;
    supervisor.profile.department = LOKMAN_ALI_SUPERVISOR_DATA.profile.department;
    supervisor.profile.designation = LOKMAN_ALI_SUPERVISOR_DATA.profile.designation;
    supervisor.profile.administrativePositions = LOKMAN_ALI_SUPERVISOR_DATA.profile.administrativePositions;
    supervisor.profile.education = LOKMAN_ALI_SUPERVISOR_DATA.profile.education;
    supervisor.profile.personalEmail = LOKMAN_ALI_SUPERVISOR_DATA.profile.personalEmail;
    supervisor.profile.photoUrl = LOKMAN_ALI_SUPERVISOR_DATA.profile.photoUrl;
    supervisor.researchProfile = LOKMAN_ALI_SUPERVISOR_DATA.researchProfile;
    supervisor.externalProfiles = LOKMAN_ALI_SUPERVISOR_DATA.externalProfiles;

    await supervisor.save();
    console.log('Successfully updated Dr. Md. Lokman Ali Supervisor Profile in MongoDB.');
  }

  return supervisor;
}
