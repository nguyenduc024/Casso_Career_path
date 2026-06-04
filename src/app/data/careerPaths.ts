export type Track = 'trainee' | 'intern' | 'professional' | 'management' | 'leadership';

export interface Role {
  id: string;
  title: string;
  level: number;
  track: Track;
}

export interface Connection {
  from: string;
  to: string;
  type: 'vertical' | 'horizontal' | 'bidirectional';
}

export interface CareerPath {
  expertiseId: string;
  roles: Role[];
  connections: Connection[];
}

export const careerPaths: CareerPath[] = [
  // Product Management Career Path
  {
    expertiseId: 'product-management',
    roles: [
      { id: 'pm-trainee', title: 'Product Trainee', level: 1, track: 'trainee' },
      { id: 'pm-intern', title: 'Product Intern', level: 1, track: 'intern' },
      { id: 'pm-apo', title: 'Ass. Product Owner', level: 2, track: 'professional' },
      { id: 'pm-po', title: 'Product Owner', level: 3, track: 'professional' },
      { id: 'pm-spo', title: 'Sr. Product Owner', level: 4, track: 'professional' },
      { id: 'pm-stpo', title: 'Staff Product Owner', level: 5, track: 'professional' },
      { id: 'pm-ppo', title: 'Principal Product Owner', level: 6, track: 'professional' },
      { id: 'pm-ptl', title: 'Product Team Lead', level: 4, track: 'management' },
      { id: 'pm-hpm', title: 'Head of PM', level: 5, track: 'management' },
      { id: 'pm-cpo', title: 'CPO', level: 6, track: 'management' },
      { id: 'pm-ph', title: 'Product Head', level: 5, track: 'leadership' },
      { id: 'pm-hod', title: 'Head of Division', level: 6, track: 'leadership' },
      { id: 'pm-ceo', title: 'CEO', level: 7, track: 'leadership' },
    ],
    connections: [
      { from: 'pm-trainee', to: 'pm-intern', type: 'vertical' },
      { from: 'pm-intern', to: 'pm-apo', type: 'vertical' },
      { from: 'pm-apo', to: 'pm-po', type: 'vertical' },
      { from: 'pm-po', to: 'pm-spo', type: 'vertical' },
      { from: 'pm-spo', to: 'pm-stpo', type: 'vertical' },
      { from: 'pm-stpo', to: 'pm-ppo', type: 'vertical' },
      { from: 'pm-spo', to: 'pm-ptl', type: 'horizontal' },
      { from: 'pm-ptl', to: 'pm-hpm', type: 'vertical' },
      { from: 'pm-hpm', to: 'pm-cpo', type: 'vertical' },
      { from: 'pm-hpm', to: 'pm-ph', type: 'horizontal' },
      { from: 'pm-ph', to: 'pm-hod', type: 'vertical' },
      { from: 'pm-hod', to: 'pm-ceo', type: 'vertical' },
      { from: 'pm-cpo', to: 'pm-ceo', type: 'bidirectional' },
    ],
  },

  // Engineering Career Path
  {
    expertiseId: 'engineering',
    roles: [
      { id: 'eng-trainee', title: 'Engineering Trainee', level: 1, track: 'trainee' },
      { id: 'eng-intern', title: 'Engineering Intern', level: 1, track: 'intern' },
      { id: 'eng-jr', title: 'Junior Engineer', level: 2, track: 'professional' },
      { id: 'eng-mid', title: 'Software Engineer', level: 3, track: 'professional' },
      { id: 'eng-sr', title: 'Senior Engineer', level: 4, track: 'professional' },
      { id: 'eng-staff', title: 'Staff Engineer', level: 5, track: 'professional' },
      { id: 'eng-principal', title: 'Principal Engineer', level: 6, track: 'professional' },
      { id: 'eng-tl', title: 'Tech Lead', level: 4, track: 'management' },
      { id: 'eng-em', title: 'Engineering Manager', level: 5, track: 'management' },
      { id: 'eng-cto', title: 'CTO', level: 6, track: 'management' },
      { id: 'eng-head', title: 'Engineering Head', level: 5, track: 'leadership' },
      { id: 'eng-vpe', title: 'VP Engineering', level: 6, track: 'leadership' },
    ],
    connections: [
      { from: 'eng-trainee', to: 'eng-intern', type: 'vertical' },
      { from: 'eng-intern', to: 'eng-jr', type: 'vertical' },
      { from: 'eng-jr', to: 'eng-mid', type: 'vertical' },
      { from: 'eng-mid', to: 'eng-sr', type: 'vertical' },
      { from: 'eng-sr', to: 'eng-staff', type: 'vertical' },
      { from: 'eng-staff', to: 'eng-principal', type: 'vertical' },
      { from: 'eng-sr', to: 'eng-tl', type: 'horizontal' },
      { from: 'eng-tl', to: 'eng-em', type: 'vertical' },
      { from: 'eng-em', to: 'eng-cto', type: 'vertical' },
      { from: 'eng-em', to: 'eng-head', type: 'horizontal' },
      { from: 'eng-head', to: 'eng-vpe', type: 'vertical' },
    ],
  },

  // Design Career Path
  {
    expertiseId: 'design',
    roles: [
      { id: 'des-trainee', title: 'Design Trainee', level: 1, track: 'trainee' },
      { id: 'des-intern', title: 'Design Intern', level: 1, track: 'intern' },
      { id: 'des-jr', title: 'Junior Designer', level: 2, track: 'professional' },
      { id: 'des-mid', title: 'Product Designer', level: 3, track: 'professional' },
      { id: 'des-sr', title: 'Senior Designer', level: 4, track: 'professional' },
      { id: 'des-staff', title: 'Staff Designer', level: 5, track: 'professional' },
      { id: 'des-lead', title: 'Design Lead', level: 4, track: 'management' },
      { id: 'des-head', title: 'Head of Design', level: 5, track: 'management' },
      { id: 'des-director', title: 'Design Director', level: 5, track: 'leadership' },
    ],
    connections: [
      { from: 'des-trainee', to: 'des-intern', type: 'vertical' },
      { from: 'des-intern', to: 'des-jr', type: 'vertical' },
      { from: 'des-jr', to: 'des-mid', type: 'vertical' },
      { from: 'des-mid', to: 'des-sr', type: 'vertical' },
      { from: 'des-sr', to: 'des-staff', type: 'vertical' },
      { from: 'des-sr', to: 'des-lead', type: 'horizontal' },
      { from: 'des-lead', to: 'des-head', type: 'vertical' },
      { from: 'des-head', to: 'des-director', type: 'horizontal' },
    ],
  },

  // Customer Success Career Path
  {
    expertiseId: 'customer-success',
    roles: [
      { id: 'cs-trainee', title: 'CS Trainee', level: 1, track: 'trainee' },
      { id: 'cs-intern', title: 'CS Intern', level: 1, track: 'intern' },
      { id: 'cs-acs', title: 'Ass. CS Specialist', level: 2, track: 'professional' },
      { id: 'cs-spec', title: 'CS Specialist', level: 3, track: 'professional' },
      { id: 'cs-sr', title: 'Sr. CS Specialist', level: 4, track: 'professional' },
      { id: 'cs-lead', title: 'CS Team Lead', level: 4, track: 'management' },
      { id: 'cs-head', title: 'Head of CS', level: 5, track: 'management' },
      { id: 'cs-director', title: 'CS Director', level: 5, track: 'leadership' },
    ],
    connections: [
      { from: 'cs-trainee', to: 'cs-intern', type: 'vertical' },
      { from: 'cs-intern', to: 'cs-acs', type: 'vertical' },
      { from: 'cs-acs', to: 'cs-spec', type: 'vertical' },
      { from: 'cs-spec', to: 'cs-sr', type: 'vertical' },
      { from: 'cs-sr', to: 'cs-lead', type: 'horizontal' },
      { from: 'cs-lead', to: 'cs-head', type: 'vertical' },
      { from: 'cs-head', to: 'cs-director', type: 'horizontal' },
    ],
  },
];
