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
  {
    expertiseId: "software",
    roles: [
      {
        id: "software-software-trainee",
        title: "Software Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "software-software-intern",
        title: "Software Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "software-associate-software-engineer",
        title: "Associate Software Engineer",
        level: 1,
        track: 'professional',
      },
      {
        id: "software-software-engineer",
        title: "Software Engineer",
        level: 2,
        track: 'professional',
      },
      {
        id: "software-senior-software-engineer",
        title: "Senior Software Engineer",
        level: 3,
        track: 'professional',
      },
      {
        id: "software-staff-software-engineer",
        title: "Staff Software Engineer",
        level: 4,
        track: 'professional',
      },
      {
        id: "software-principal-software-engineer",
        title: "Principal Software Engineer",
        level: 5,
        track: 'professional',
      },
      {
        id: "software-technical-lead",
        title: "Technical Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "software-head-of-technical",
        title: "Head of Technical",
        level: 4,
        track: 'management',
      },
      {
        id: "software-chief-technical-officer",
        title: "Chief Technical Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "software-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "software-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "software-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "software-associate-software-engineer",
        to: "software-software-engineer",
        type: 'vertical',
      },
      {
        from: "software-software-engineer",
        to: "software-senior-software-engineer",
        type: 'vertical',
      },
      {
        from: "software-senior-software-engineer",
        to: "software-staff-software-engineer",
        type: 'vertical',
      },
      {
        from: "software-staff-software-engineer",
        to: "software-principal-software-engineer",
        type: 'vertical',
      },
      {
        from: "software-technical-lead",
        to: "software-head-of-technical",
        type: 'vertical',
      },
      {
        from: "software-head-of-technical",
        to: "software-chief-technical-officer",
        type: 'vertical',
      },
      {
        from: "software-product-head",
        to: "software-head-of-division",
        type: 'vertical',
      },
      {
        from: "software-head-of-division",
        to: "software-ceo",
        type: 'vertical',
      },
      {
        from: "software-software-trainee",
        to: "software-software-intern",
        type: 'horizontal',
      },
      {
        from: "software-software-intern",
        to: "software-associate-software-engineer",
        type: 'horizontal',
      },
      {
        from: "software-senior-software-engineer",
        to: "software-technical-lead",
        type: 'horizontal',
      },
      {
        from: "software-technical-lead",
        to: "software-product-head",
        type: 'horizontal',
      },
      {
        from: "software-head-of-technical",
        to: "software-product-head",
        type: 'horizontal',
      },
      {
        from: "software-chief-technical-officer",
        to: "software-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "hardware",
    roles: [
      {
        id: "hardware-hardware-trainee",
        title: "Hardware Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "hardware-hardware-intern",
        title: "Hardware Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "hardware-associate-hardware-engineer",
        title: "Associate Hardware Engineer",
        level: 1,
        track: 'professional',
      },
      {
        id: "hardware-hardware-engineer",
        title: "Hardware Engineer",
        level: 2,
        track: 'professional',
      },
      {
        id: "hardware-senior-hardware-engineer",
        title: "Senior Hardware Engineer",
        level: 3,
        track: 'professional',
      },
      {
        id: "hardware-staff-hardware-engineer",
        title: "Staff Hardware Engineer",
        level: 4,
        track: 'professional',
      },
      {
        id: "hardware-principal-hardware-engineer",
        title: "Principal Hardware Engineer",
        level: 5,
        track: 'professional',
      },
      {
        id: "hardware-technical-lead",
        title: "Technical Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "hardware-head-of-technical",
        title: "Head of Technical",
        level: 4,
        track: 'management',
      },
      {
        id: "hardware-chief-technical-officer",
        title: "Chief Technical Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "hardware-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "hardware-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "hardware-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "hardware-associate-hardware-engineer",
        to: "hardware-hardware-engineer",
        type: 'vertical',
      },
      {
        from: "hardware-hardware-engineer",
        to: "hardware-senior-hardware-engineer",
        type: 'vertical',
      },
      {
        from: "hardware-senior-hardware-engineer",
        to: "hardware-staff-hardware-engineer",
        type: 'vertical',
      },
      {
        from: "hardware-staff-hardware-engineer",
        to: "hardware-principal-hardware-engineer",
        type: 'vertical',
      },
      {
        from: "hardware-technical-lead",
        to: "hardware-head-of-technical",
        type: 'vertical',
      },
      {
        from: "hardware-head-of-technical",
        to: "hardware-chief-technical-officer",
        type: 'vertical',
      },
      {
        from: "hardware-product-head",
        to: "hardware-head-of-division",
        type: 'vertical',
      },
      {
        from: "hardware-head-of-division",
        to: "hardware-ceo",
        type: 'vertical',
      },
      {
        from: "hardware-hardware-trainee",
        to: "hardware-hardware-intern",
        type: 'horizontal',
      },
      {
        from: "hardware-hardware-intern",
        to: "hardware-associate-hardware-engineer",
        type: 'horizontal',
      },
      {
        from: "hardware-senior-hardware-engineer",
        to: "hardware-technical-lead",
        type: 'horizontal',
      },
      {
        from: "hardware-technical-lead",
        to: "hardware-product-head",
        type: 'horizontal',
      },
      {
        from: "hardware-head-of-technical",
        to: "hardware-product-head",
        type: 'horizontal',
      },
      {
        from: "hardware-chief-technical-officer",
        to: "hardware-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "security",
    roles: [
      {
        id: "security-security-trainee",
        title: "Security Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "security-security-intern",
        title: "Security Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "security-associate-security-engineer",
        title: "Associate Security Engineer",
        level: 1,
        track: 'professional',
      },
      {
        id: "security-security-engineer",
        title: "Security Engineer",
        level: 2,
        track: 'professional',
      },
      {
        id: "security-senior-security-engineer",
        title: "Senior Security Engineer",
        level: 3,
        track: 'professional',
      },
      {
        id: "security-technical-lead",
        title: "Technical Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "security-head-of-technical",
        title: "Head of Technical",
        level: 4,
        track: 'management',
      },
      {
        id: "security-chief-technical-officer",
        title: "Chief Technical Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "security-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "security-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "security-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "security-associate-security-engineer",
        to: "security-security-engineer",
        type: 'vertical',
      },
      {
        from: "security-security-engineer",
        to: "security-senior-security-engineer",
        type: 'vertical',
      },
      {
        from: "security-technical-lead",
        to: "security-head-of-technical",
        type: 'vertical',
      },
      {
        from: "security-head-of-technical",
        to: "security-chief-technical-officer",
        type: 'vertical',
      },
      {
        from: "security-product-head",
        to: "security-head-of-division",
        type: 'vertical',
      },
      {
        from: "security-head-of-division",
        to: "security-ceo",
        type: 'vertical',
      },
      {
        from: "security-security-trainee",
        to: "security-security-intern",
        type: 'horizontal',
      },
      {
        from: "security-security-intern",
        to: "security-associate-security-engineer",
        type: 'horizontal',
      },
      {
        from: "security-senior-security-engineer",
        to: "security-technical-lead",
        type: 'horizontal',
      },
      {
        from: "security-technical-lead",
        to: "security-product-head",
        type: 'horizontal',
      },
      {
        from: "security-head-of-technical",
        to: "security-product-head",
        type: 'horizontal',
      },
      {
        from: "security-chief-technical-officer",
        to: "security-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "devops",
    roles: [
      {
        id: "devops-devops-trainee",
        title: "Devops Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "devops-devops-intern",
        title: "Devops Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "devops-associate-devops-engineer",
        title: "Associate Devops Engineer",
        level: 1,
        track: 'professional',
      },
      {
        id: "devops-devops-engineer",
        title: "Devops Engineer",
        level: 2,
        track: 'professional',
      },
      {
        id: "devops-senior-devops-engineer",
        title: "Senior Devops Engineer",
        level: 3,
        track: 'professional',
      },
      {
        id: "devops-technical-lead",
        title: "Technical Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "devops-head-of-technical",
        title: "Head of Technical",
        level: 4,
        track: 'management',
      },
      {
        id: "devops-chief-technical-officer",
        title: "Chief Technical Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "devops-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "devops-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "devops-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "devops-associate-devops-engineer",
        to: "devops-devops-engineer",
        type: 'vertical',
      },
      {
        from: "devops-devops-engineer",
        to: "devops-senior-devops-engineer",
        type: 'vertical',
      },
      {
        from: "devops-technical-lead",
        to: "devops-head-of-technical",
        type: 'vertical',
      },
      {
        from: "devops-head-of-technical",
        to: "devops-chief-technical-officer",
        type: 'vertical',
      },
      {
        from: "devops-product-head",
        to: "devops-head-of-division",
        type: 'vertical',
      },
      {
        from: "devops-head-of-division",
        to: "devops-ceo",
        type: 'vertical',
      },
      {
        from: "devops-devops-trainee",
        to: "devops-devops-intern",
        type: 'horizontal',
      },
      {
        from: "devops-devops-intern",
        to: "devops-associate-devops-engineer",
        type: 'horizontal',
      },
      {
        from: "devops-senior-devops-engineer",
        to: "devops-technical-lead",
        type: 'horizontal',
      },
      {
        from: "devops-technical-lead",
        to: "devops-product-head",
        type: 'horizontal',
      },
      {
        from: "devops-head-of-technical",
        to: "devops-product-head",
        type: 'horizontal',
      },
      {
        from: "devops-chief-technical-officer",
        to: "devops-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "product-manager",
    roles: [
      {
        id: "product-manager-product-manager-trainee",
        title: "Product Manager Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "product-manager-product-manager-intern",
        title: "Product Manager Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "product-manager-associate-product-manager",
        title: "Associate Product Manager",
        level: 1,
        track: 'professional',
      },
      {
        id: "product-manager-product-manager",
        title: "Product Manager",
        level: 2,
        track: 'professional',
      },
      {
        id: "product-manager-senior-product-manager",
        title: "Senior Product Manager",
        level: 3,
        track: 'professional',
      },
      {
        id: "product-manager-staff-product-manager",
        title: "Staff Product Manager",
        level: 4,
        track: 'professional',
      },
      {
        id: "product-manager-principal-product-manager",
        title: "Principal Product Manager",
        level: 5,
        track: 'professional',
      },
      {
        id: "product-manager-product-team-lead",
        title: "Product Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "product-manager-head-of-product-management",
        title: "Head of Product Management",
        level: 4,
        track: 'management',
      },
      {
        id: "product-manager-chief-product-officer",
        title: "Chief Product Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "product-manager-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "product-manager-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "product-manager-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "product-manager-associate-product-manager",
        to: "product-manager-product-manager",
        type: 'vertical',
      },
      {
        from: "product-manager-product-manager",
        to: "product-manager-senior-product-manager",
        type: 'vertical',
      },
      {
        from: "product-manager-senior-product-manager",
        to: "product-manager-staff-product-manager",
        type: 'vertical',
      },
      {
        from: "product-manager-staff-product-manager",
        to: "product-manager-principal-product-manager",
        type: 'vertical',
      },
      {
        from: "product-manager-product-team-lead",
        to: "product-manager-head-of-product-management",
        type: 'vertical',
      },
      {
        from: "product-manager-head-of-product-management",
        to: "product-manager-chief-product-officer",
        type: 'vertical',
      },
      {
        from: "product-manager-product-head",
        to: "product-manager-head-of-division",
        type: 'vertical',
      },
      {
        from: "product-manager-head-of-division",
        to: "product-manager-ceo",
        type: 'vertical',
      },
      {
        from: "product-manager-product-manager-trainee",
        to: "product-manager-product-manager-intern",
        type: 'horizontal',
      },
      {
        from: "product-manager-product-manager-intern",
        to: "product-manager-associate-product-manager",
        type: 'horizontal',
      },
      {
        from: "product-manager-senior-product-manager",
        to: "product-manager-product-team-lead",
        type: 'horizontal',
      },
      {
        from: "product-manager-product-team-lead",
        to: "product-manager-product-head",
        type: 'horizontal',
      },
      {
        from: "product-manager-head-of-product-management",
        to: "product-manager-product-head",
        type: 'horizontal',
      },
      {
        from: "product-manager-chief-product-officer",
        to: "product-manager-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "product-owner",
    roles: [
      {
        id: "product-owner-product-owner-intern",
        title: "Product Owner Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "product-owner-associate-product-owner",
        title: "Associate Product Owner",
        level: 1,
        track: 'professional',
      },
      {
        id: "product-owner-product-owner",
        title: "Product Owner",
        level: 2,
        track: 'professional',
      },
      {
        id: "product-owner-senior-product-owner",
        title: "Senior Product Owner",
        level: 3,
        track: 'professional',
      },
      {
        id: "product-owner-product-team-lead",
        title: "Product Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "product-owner-head-of-product-management",
        title: "Head of Product Management",
        level: 4,
        track: 'management',
      },
      {
        id: "product-owner-chief-product-officer",
        title: "Chief Product Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "product-owner-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "product-owner-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "product-owner-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "product-owner-associate-product-owner",
        to: "product-owner-product-owner",
        type: 'vertical',
      },
      {
        from: "product-owner-product-owner",
        to: "product-owner-senior-product-owner",
        type: 'vertical',
      },
      {
        from: "product-owner-product-team-lead",
        to: "product-owner-head-of-product-management",
        type: 'vertical',
      },
      {
        from: "product-owner-head-of-product-management",
        to: "product-owner-chief-product-officer",
        type: 'vertical',
      },
      {
        from: "product-owner-product-head",
        to: "product-owner-head-of-division",
        type: 'vertical',
      },
      {
        from: "product-owner-head-of-division",
        to: "product-owner-ceo",
        type: 'vertical',
      },
      {
        from: "product-owner-product-owner-intern",
        to: "product-owner-associate-product-owner",
        type: 'horizontal',
      },
      {
        from: "product-owner-senior-product-owner",
        to: "product-owner-product-team-lead",
        type: 'horizontal',
      },
      {
        from: "product-owner-product-team-lead",
        to: "product-owner-product-head",
        type: 'horizontal',
      },
      {
        from: "product-owner-head-of-product-management",
        to: "product-owner-product-head",
        type: 'horizontal',
      },
      {
        from: "product-owner-chief-product-officer",
        to: "product-owner-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "ui-ux",
    roles: [
      {
        id: "ui-ux-ui-ux-designer-intern",
        title: "UI/UX Designer Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "ui-ux-associate-ui-ux-designer",
        title: "Associate UI/UX Designer",
        level: 1,
        track: 'professional',
      },
      {
        id: "ui-ux-ui-ux-designer",
        title: "UI/UX Designer",
        level: 2,
        track: 'professional',
      },
      {
        id: "ui-ux-senior-ui-ux-designer",
        title: "Senior UI/UX Designer",
        level: 3,
        track: 'professional',
      },
      {
        id: "ui-ux-staff-ui-ux-designer",
        title: "Staff UI/UX Designer",
        level: 4,
        track: 'professional',
      },
      {
        id: "ui-ux-principal-ui-ux-designer",
        title: "Principal UI/UX Designer",
        level: 5,
        track: 'professional',
      },
      {
        id: "ui-ux-ui-ux-designer-lead",
        title: "UI/UX Designer Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "ui-ux-head-of-product-management",
        title: "Head of Product Management",
        level: 4,
        track: 'management',
      },
      {
        id: "ui-ux-chief-product-officer",
        title: "Chief Product Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "ui-ux-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "ui-ux-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "ui-ux-associate-ui-ux-designer",
        to: "ui-ux-ui-ux-designer",
        type: 'vertical',
      },
      {
        from: "ui-ux-ui-ux-designer",
        to: "ui-ux-senior-ui-ux-designer",
        type: 'vertical',
      },
      {
        from: "ui-ux-senior-ui-ux-designer",
        to: "ui-ux-staff-ui-ux-designer",
        type: 'vertical',
      },
      {
        from: "ui-ux-staff-ui-ux-designer",
        to: "ui-ux-principal-ui-ux-designer",
        type: 'vertical',
      },
      {
        from: "ui-ux-ui-ux-designer-lead",
        to: "ui-ux-head-of-product-management",
        type: 'vertical',
      },
      {
        from: "ui-ux-head-of-product-management",
        to: "ui-ux-chief-product-officer",
        type: 'vertical',
      },
      {
        from: "ui-ux-head-of-division",
        to: "ui-ux-ceo",
        type: 'vertical',
      },
      {
        from: "ui-ux-ui-ux-designer-intern",
        to: "ui-ux-associate-ui-ux-designer",
        type: 'horizontal',
      },
      {
        from: "ui-ux-senior-ui-ux-designer",
        to: "ui-ux-ui-ux-designer-lead",
        type: 'horizontal',
      },
      {
        from: "ui-ux-chief-product-officer",
        to: "ui-ux-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "partnership",
    roles: [
      {
        id: "partnership-partnership-trainee",
        title: "Partnership Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "partnership-partnership-intern",
        title: "Partnership Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "partnership-associate-partnership-executive",
        title: "Associate Partnership Executive",
        level: 1,
        track: 'professional',
      },
      {
        id: "partnership-partnership-executive",
        title: "Partnership Executive",
        level: 2,
        track: 'professional',
      },
      {
        id: "partnership-senior-partnership-executive",
        title: "Senior Partnership Executive",
        level: 3,
        track: 'professional',
      },
      {
        id: "partnership-partnership-team-lead",
        title: "Partnership Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "partnership-head-of-partnership",
        title: "Head of Partnership",
        level: 4,
        track: 'management',
      },
      {
        id: "partnership-chief-partnership-officer",
        title: "Chief Partnership Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "partnership-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "partnership-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "partnership-associate-partnership-executive",
        to: "partnership-partnership-executive",
        type: 'vertical',
      },
      {
        from: "partnership-partnership-executive",
        to: "partnership-senior-partnership-executive",
        type: 'vertical',
      },
      {
        from: "partnership-partnership-team-lead",
        to: "partnership-head-of-partnership",
        type: 'vertical',
      },
      {
        from: "partnership-head-of-partnership",
        to: "partnership-chief-partnership-officer",
        type: 'vertical',
      },
      {
        from: "partnership-head-of-division",
        to: "partnership-ceo",
        type: 'vertical',
      },
      {
        from: "partnership-partnership-trainee",
        to: "partnership-partnership-intern",
        type: 'horizontal',
      },
      {
        from: "partnership-partnership-intern",
        to: "partnership-associate-partnership-executive",
        type: 'horizontal',
      },
      {
        from: "partnership-senior-partnership-executive",
        to: "partnership-partnership-team-lead",
        type: 'horizontal',
      },
      {
        from: "partnership-chief-partnership-officer",
        to: "partnership-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "warehouse",
    roles: [
      {
        id: "warehouse-warehouse-intern",
        title: "Warehouse Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "warehouse-associate-warehouse-executive",
        title: "Associate Warehouse Executive",
        level: 1,
        track: 'professional',
      },
      {
        id: "warehouse-warehouse-executive",
        title: "Warehouse Executive",
        level: 2,
        track: 'professional',
      },
      {
        id: "warehouse-senior-warehouse-executive",
        title: "Senior Warehouse Executive",
        level: 3,
        track: 'professional',
      },
      {
        id: "warehouse-supply-chain-manager",
        title: "Supply Chain Manager",
        level: 3,
        track: 'management',
      },
      {
        id: "warehouse-head-of-manufacturer",
        title: "Head of Manufacturer",
        level: 4,
        track: 'management',
      },
      {
        id: "warehouse-chief-manufacturing-officer",
        title: "Chief Manufacturing Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "warehouse-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "warehouse-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "warehouse-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "warehouse-associate-warehouse-executive",
        to: "warehouse-warehouse-executive",
        type: 'vertical',
      },
      {
        from: "warehouse-warehouse-executive",
        to: "warehouse-senior-warehouse-executive",
        type: 'vertical',
      },
      {
        from: "warehouse-supply-chain-manager",
        to: "warehouse-head-of-manufacturer",
        type: 'vertical',
      },
      {
        from: "warehouse-head-of-manufacturer",
        to: "warehouse-chief-manufacturing-officer",
        type: 'vertical',
      },
      {
        from: "warehouse-product-head",
        to: "warehouse-head-of-division",
        type: 'vertical',
      },
      {
        from: "warehouse-head-of-division",
        to: "warehouse-ceo",
        type: 'vertical',
      },
      {
        from: "warehouse-warehouse-intern",
        to: "warehouse-associate-warehouse-executive",
        type: 'horizontal',
      },
      {
        from: "warehouse-senior-warehouse-executive",
        to: "warehouse-supply-chain-manager",
        type: 'horizontal',
      },
      {
        from: "warehouse-supply-chain-manager",
        to: "warehouse-product-head",
        type: 'horizontal',
      },
      {
        from: "warehouse-head-of-manufacturer",
        to: "warehouse-product-head",
        type: 'horizontal',
      },
      {
        from: "warehouse-chief-manufacturing-officer",
        to: "warehouse-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "marketing",
    roles: [
      {
        id: "marketing-marketing-trainee",
        title: "Marketing Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "marketing-marketing-intern",
        title: "Marketing Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "marketing-associate-marketing-executive",
        title: "Associate Marketing Executive",
        level: 1,
        track: 'professional',
      },
      {
        id: "marketing-marketing-executive",
        title: "Marketing Executive",
        level: 2,
        track: 'professional',
      },
      {
        id: "marketing-senior-marketing-executive",
        title: "Senior Marketing Executive",
        level: 3,
        track: 'professional',
      },
      {
        id: "marketing-marketing-team-lead",
        title: "Marketing Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "marketing-head-of-marketing",
        title: "Head of Marketing",
        level: 4,
        track: 'management',
      },
      {
        id: "marketing-chief-marketing-officer",
        title: "Chief Marketing Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "marketing-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "marketing-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "marketing-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "marketing-associate-marketing-executive",
        to: "marketing-marketing-executive",
        type: 'vertical',
      },
      {
        from: "marketing-marketing-executive",
        to: "marketing-senior-marketing-executive",
        type: 'vertical',
      },
      {
        from: "marketing-marketing-team-lead",
        to: "marketing-head-of-marketing",
        type: 'vertical',
      },
      {
        from: "marketing-head-of-marketing",
        to: "marketing-chief-marketing-officer",
        type: 'vertical',
      },
      {
        from: "marketing-product-head",
        to: "marketing-head-of-division",
        type: 'vertical',
      },
      {
        from: "marketing-head-of-division",
        to: "marketing-ceo",
        type: 'vertical',
      },
      {
        from: "marketing-marketing-trainee",
        to: "marketing-marketing-intern",
        type: 'horizontal',
      },
      {
        from: "marketing-marketing-intern",
        to: "marketing-associate-marketing-executive",
        type: 'horizontal',
      },
      {
        from: "marketing-senior-marketing-executive",
        to: "marketing-marketing-team-lead",
        type: 'horizontal',
      },
      {
        from: "marketing-marketing-team-lead",
        to: "marketing-product-head",
        type: 'horizontal',
      },
      {
        from: "marketing-head-of-marketing",
        to: "marketing-product-head",
        type: 'horizontal',
      },
      {
        from: "marketing-chief-marketing-officer",
        to: "marketing-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "account",
    roles: [
      {
        id: "account-account-manager-intern",
        title: "Account Manager Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "account-associate-account-manager",
        title: "Associate Account Manager",
        level: 1,
        track: 'professional',
      },
      {
        id: "account-account-manager",
        title: "Account Manager",
        level: 2,
        track: 'professional',
      },
      {
        id: "account-senior-account-manager",
        title: "Senior Account Manager",
        level: 3,
        track: 'professional',
      },
      {
        id: "account-account-team-lead",
        title: "Account Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "account-head-of-sale",
        title: "Head of Sale",
        level: 4,
        track: 'management',
      },
      {
        id: "account-chief-sale-officer",
        title: "Chief Sale Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "account-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "account-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "account-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "account-associate-account-manager",
        to: "account-account-manager",
        type: 'vertical',
      },
      {
        from: "account-account-manager",
        to: "account-senior-account-manager",
        type: 'vertical',
      },
      {
        from: "account-account-team-lead",
        to: "account-head-of-sale",
        type: 'vertical',
      },
      {
        from: "account-head-of-sale",
        to: "account-chief-sale-officer",
        type: 'vertical',
      },
      {
        from: "account-product-head",
        to: "account-head-of-division",
        type: 'vertical',
      },
      {
        from: "account-head-of-division",
        to: "account-ceo",
        type: 'vertical',
      },
      {
        from: "account-account-manager-intern",
        to: "account-associate-account-manager",
        type: 'horizontal',
      },
      {
        from: "account-senior-account-manager",
        to: "account-account-team-lead",
        type: 'horizontal',
      },
      {
        from: "account-account-team-lead",
        to: "account-product-head",
        type: 'horizontal',
      },
      {
        from: "account-head-of-sale",
        to: "account-product-head",
        type: 'horizontal',
      },
      {
        from: "account-chief-sale-officer",
        to: "account-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "customer-success",
    roles: [
      {
        id: "customer-success-customer-success-intern",
        title: "Customer Success Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "customer-success-associate-customer-success-specialist",
        title: "Associate Customer Success Specialist",
        level: 1,
        track: 'professional',
      },
      {
        id: "customer-success-customer-success-specialist",
        title: "Customer Success Specialist",
        level: 2,
        track: 'professional',
      },
      {
        id: "customer-success-senior-customer-success-specialist",
        title: "Senior Customer Success Specialist",
        level: 3,
        track: 'professional',
      },
      {
        id: "customer-success-customer-success-team-lead",
        title: "Customer Success Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "customer-success-head-of-customer-success",
        title: "Head of Customer Success",
        level: 4,
        track: 'management',
      },
      {
        id: "customer-success-chief-customer-experience-officer",
        title: "Chief Customer Experience Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "customer-success-product-head",
        title: "Product Head",
        level: 4,
        track: 'leadership',
      },
      {
        id: "customer-success-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "customer-success-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "customer-success-associate-customer-success-specialist",
        to: "customer-success-customer-success-specialist",
        type: 'vertical',
      },
      {
        from: "customer-success-customer-success-specialist",
        to: "customer-success-senior-customer-success-specialist",
        type: 'vertical',
      },
      {
        from: "customer-success-customer-success-team-lead",
        to: "customer-success-head-of-customer-success",
        type: 'vertical',
      },
      {
        from: "customer-success-head-of-customer-success",
        to: "customer-success-chief-customer-experience-officer",
        type: 'vertical',
      },
      {
        from: "customer-success-product-head",
        to: "customer-success-head-of-division",
        type: 'vertical',
      },
      {
        from: "customer-success-head-of-division",
        to: "customer-success-ceo",
        type: 'vertical',
      },
      {
        from: "customer-success-customer-success-intern",
        to: "customer-success-associate-customer-success-specialist",
        type: 'horizontal',
      },
      {
        from: "customer-success-senior-customer-success-specialist",
        to: "customer-success-customer-success-team-lead",
        type: 'horizontal',
      },
      {
        from: "customer-success-customer-success-team-lead",
        to: "customer-success-product-head",
        type: 'horizontal',
      },
      {
        from: "customer-success-head-of-customer-success",
        to: "customer-success-product-head",
        type: 'horizontal',
      },
      {
        from: "customer-success-chief-customer-experience-officer",
        to: "customer-success-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "system-admin",
    roles: [
      {
        id: "system-admin-system-administrator-trainee",
        title: "System Administrator  Trainee",
        level: 0,
        track: 'trainee',
      },
      {
        id: "system-admin-system-administrator-intern",
        title: "System Administrator  Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "system-admin-associate-system-administrator",
        title: "Associate System Administrator",
        level: 1,
        track: 'professional',
      },
      {
        id: "system-admin-system-administrator",
        title: "System Administrator",
        level: 2,
        track: 'professional',
      },
      {
        id: "system-admin-senior-system-administrator",
        title: "Senior System Administrator",
        level: 3,
        track: 'professional',
      },
      {
        id: "system-admin-system-admin-team-lead",
        title: "System Admin Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "system-admin-head-of-it",
        title: "Head of IT",
        level: 4,
        track: 'management',
      },
      {
        id: "system-admin-chief-information-officer",
        title: "Chief Information Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "system-admin-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "system-admin-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "system-admin-associate-system-administrator",
        to: "system-admin-system-administrator",
        type: 'vertical',
      },
      {
        from: "system-admin-system-administrator",
        to: "system-admin-senior-system-administrator",
        type: 'vertical',
      },
      {
        from: "system-admin-system-admin-team-lead",
        to: "system-admin-head-of-it",
        type: 'vertical',
      },
      {
        from: "system-admin-head-of-it",
        to: "system-admin-chief-information-officer",
        type: 'vertical',
      },
      {
        from: "system-admin-head-of-division",
        to: "system-admin-ceo",
        type: 'vertical',
      },
      {
        from: "system-admin-system-administrator-trainee",
        to: "system-admin-system-administrator-intern",
        type: 'horizontal',
      },
      {
        from: "system-admin-system-administrator-intern",
        to: "system-admin-associate-system-administrator",
        type: 'horizontal',
      },
      {
        from: "system-admin-senior-system-administrator",
        to: "system-admin-system-admin-team-lead",
        type: 'horizontal',
      },
      {
        from: "system-admin-chief-information-officer",
        to: "system-admin-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "call-center",
    roles: [
      {
        id: "call-center-call-center-agent-intern",
        title: "Call Center Agent Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "call-center-associate-call-center-agent",
        title: "Associate Call Center Agent",
        level: 1,
        track: 'professional',
      },
      {
        id: "call-center-call-center-agent",
        title: "Call Center Agent",
        level: 2,
        track: 'professional',
      },
      {
        id: "call-center-call-center-team-lead",
        title: "Call Center Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "call-center-head-of-customer-success",
        title: "Head of Customer Success",
        level: 4,
        track: 'management',
      },
      {
        id: "call-center-chief-customer-experience-officer",
        title: "Chief Customer Experience Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "call-center-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "call-center-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "call-center-associate-call-center-agent",
        to: "call-center-call-center-agent",
        type: 'vertical',
      },
      {
        from: "call-center-call-center-team-lead",
        to: "call-center-head-of-customer-success",
        type: 'vertical',
      },
      {
        from: "call-center-head-of-customer-success",
        to: "call-center-chief-customer-experience-officer",
        type: 'vertical',
      },
      {
        from: "call-center-head-of-division",
        to: "call-center-ceo",
        type: 'vertical',
      },
      {
        from: "call-center-call-center-agent-intern",
        to: "call-center-associate-call-center-agent",
        type: 'horizontal',
      },
      {
        from: "call-center-chief-customer-experience-officer",
        to: "call-center-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "hr",
    roles: [
      {
        id: "hr-hr-intern",
        title: "HR Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "hr-associate-hr-specialist",
        title: "Associate HR Specialist",
        level: 1,
        track: 'professional',
      },
      {
        id: "hr-hr-specialist",
        title: "HR Specialist",
        level: 2,
        track: 'professional',
      },
      {
        id: "hr-senior-hr-specialist",
        title: "Senior HR Specialist",
        level: 3,
        track: 'professional',
      },
      {
        id: "hr-hr-team-lead",
        title: "HR Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "hr-chief-human-resource-officier",
        title: "Chief Human Resource Officier",
        level: 5,
        track: 'management',
      },
      {
        id: "hr-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "hr-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "hr-associate-hr-specialist",
        to: "hr-hr-specialist",
        type: 'vertical',
      },
      {
        from: "hr-hr-specialist",
        to: "hr-senior-hr-specialist",
        type: 'vertical',
      },
      {
        from: "hr-hr-team-lead",
        to: "hr-chief-human-resource-officier",
        type: 'vertical',
      },
      {
        from: "hr-head-of-division",
        to: "hr-ceo",
        type: 'vertical',
      },
      {
        from: "hr-hr-intern",
        to: "hr-associate-hr-specialist",
        type: 'horizontal',
      },
      {
        from: "hr-senior-hr-specialist",
        to: "hr-hr-team-lead",
        type: 'horizontal',
      },
      {
        from: "hr-chief-human-resource-officier",
        to: "hr-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "admin",
    roles: [
      {
        id: "admin-administrative-intern",
        title: "Administrative Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "admin-associate-administrative-specialist",
        title: "Associate Administrative Specialist",
        level: 1,
        track: 'professional',
      },
      {
        id: "admin-administrative-specialist",
        title: "Administrative Specialist",
        level: 2,
        track: 'professional',
      },
      {
        id: "admin-senior-administrative-specialist",
        title: "Senior Administrative Specialist",
        level: 3,
        track: 'professional',
      },
      {
        id: "admin-admin-team-lead",
        title: "Admin Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "admin-chief-operation-officer",
        title: "Chief Operation Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "admin-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "admin-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "admin-associate-administrative-specialist",
        to: "admin-administrative-specialist",
        type: 'vertical',
      },
      {
        from: "admin-administrative-specialist",
        to: "admin-senior-administrative-specialist",
        type: 'vertical',
      },
      {
        from: "admin-admin-team-lead",
        to: "admin-chief-operation-officer",
        type: 'vertical',
      },
      {
        from: "admin-head-of-division",
        to: "admin-ceo",
        type: 'vertical',
      },
      {
        from: "admin-administrative-intern",
        to: "admin-associate-administrative-specialist",
        type: 'horizontal',
      },
      {
        from: "admin-senior-administrative-specialist",
        to: "admin-admin-team-lead",
        type: 'horizontal',
      },
      {
        from: "admin-chief-operation-officer",
        to: "admin-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "legal",
    roles: [
      {
        id: "legal-legal-intern",
        title: "Legal Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "legal-associate-legal-specialist",
        title: "Associate Legal Specialist",
        level: 1,
        track: 'professional',
      },
      {
        id: "legal-legal-specialist",
        title: "Legal Specialist",
        level: 2,
        track: 'professional',
      },
      {
        id: "legal-senior-legal-specialist",
        title: "Senior Legal Specialist",
        level: 3,
        track: 'professional',
      },
      {
        id: "legal-legal-team-lead",
        title: "Legal Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "legal-chief-legal-officer",
        title: "Chief Legal Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "legal-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "legal-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "legal-associate-legal-specialist",
        to: "legal-legal-specialist",
        type: 'vertical',
      },
      {
        from: "legal-legal-specialist",
        to: "legal-senior-legal-specialist",
        type: 'vertical',
      },
      {
        from: "legal-legal-team-lead",
        to: "legal-chief-legal-officer",
        type: 'vertical',
      },
      {
        from: "legal-head-of-division",
        to: "legal-ceo",
        type: 'vertical',
      },
      {
        from: "legal-legal-intern",
        to: "legal-associate-legal-specialist",
        type: 'horizontal',
      },
      {
        from: "legal-senior-legal-specialist",
        to: "legal-legal-team-lead",
        type: 'horizontal',
      },
      {
        from: "legal-chief-legal-officer",
        to: "legal-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "accounting",
    roles: [
      {
        id: "accounting-accountant-intern",
        title: "Accountant Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "accounting-associate-accountant",
        title: "Associate Accountant",
        level: 1,
        track: 'professional',
      },
      {
        id: "accounting-accountant",
        title: "Accountant",
        level: 2,
        track: 'professional',
      },
      {
        id: "accounting-acountant-team-lead",
        title: "Acountant Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "accounting-chief-accountant",
        title: "Chief Accountant",
        level: 4,
        track: 'management',
      },
      {
        id: "accounting-chief-finance-officer",
        title: "Chief Finance Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "accounting-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "accounting-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "accounting-associate-accountant",
        to: "accounting-accountant",
        type: 'vertical',
      },
      {
        from: "accounting-acountant-team-lead",
        to: "accounting-chief-accountant",
        type: 'vertical',
      },
      {
        from: "accounting-chief-accountant",
        to: "accounting-chief-finance-officer",
        type: 'vertical',
      },
      {
        from: "accounting-head-of-division",
        to: "accounting-ceo",
        type: 'vertical',
      },
      {
        from: "accounting-accountant-intern",
        to: "accounting-associate-accountant",
        type: 'horizontal',
      },
      {
        from: "accounting-chief-finance-officer",
        to: "accounting-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
  {
    expertiseId: "finance",
    roles: [
      {
        id: "finance-finance-intern",
        title: "Finance Intern",
        level: 0,
        track: 'intern',
      },
      {
        id: "finance-associate-finance-specialist",
        title: "Associate Finance Specialist",
        level: 1,
        track: 'professional',
      },
      {
        id: "finance-finance-specialist",
        title: "Finance Specialist",
        level: 2,
        track: 'professional',
      },
      {
        id: "finance-finance-team-lead",
        title: "Finance Team Lead",
        level: 3,
        track: 'management',
      },
      {
        id: "finance-head-of-finance",
        title: "Head of Finance",
        level: 4,
        track: 'management',
      },
      {
        id: "finance-chief-finance-officer",
        title: "Chief Finance Officer",
        level: 5,
        track: 'management',
      },
      {
        id: "finance-head-of-division",
        title: "Head of Division",
        level: 5,
        track: 'leadership',
      },
      {
        id: "finance-ceo",
        title: "CEO",
        level: 6,
        track: 'leadership',
      },
    ],
    connections: [
      {
        from: "finance-associate-finance-specialist",
        to: "finance-finance-specialist",
        type: 'vertical',
      },
      {
        from: "finance-finance-team-lead",
        to: "finance-head-of-finance",
        type: 'vertical',
      },
      {
        from: "finance-head-of-finance",
        to: "finance-chief-finance-officer",
        type: 'vertical',
      },
      {
        from: "finance-head-of-division",
        to: "finance-ceo",
        type: 'vertical',
      },
      {
        from: "finance-finance-intern",
        to: "finance-associate-finance-specialist",
        type: 'horizontal',
      },
      {
        from: "finance-chief-finance-officer",
        to: "finance-head-of-division",
        type: 'bidirectional',
      },
    ],
  },
];
