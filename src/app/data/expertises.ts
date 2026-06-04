export type Segment = 'BUILD' | 'SALE' | 'SERVICE' | 'MANAGE' | 'PROFIT';

export interface Expertise {
  id: string;
  name: string;
  segment: Segment;
  group: string;
  flag?: string;
  enabled: boolean;
}

export const expertises: Expertise[] = [
  // BUILD Segment
  {
    id: 'product-management',
    name: 'Product Management',
    segment: 'BUILD',
    group: 'Product',
    flag: 'TI5',
    enabled: true,
  },
  {
    id: 'engineering',
    name: 'Software Engineering',
    segment: 'BUILD',
    group: 'Technical',
    enabled: true,
  },
  {
    id: 'design',
    name: 'Product Design',
    segment: 'BUILD',
    group: 'Product',
    enabled: true,
  },
  {
    id: 'data-analytics',
    name: 'Data Analytics',
    segment: 'BUILD',
    group: 'Technical',
    enabled: true,
  },

  // SALE Segment
  {
    id: 'sales',
    name: 'Business Development',
    segment: 'SALE',
    group: 'Sales',
    enabled: true,
  },
  {
    id: 'account-management',
    name: 'Account Management',
    segment: 'SALE',
    group: 'Sales',
    enabled: true,
  },
  {
    id: 'marketing',
    name: 'Marketing',
    segment: 'SALE',
    group: 'Marketing',
    enabled: false,
  },

  // SERVICE Segment
  {
    id: 'customer-success',
    name: 'Customer Success',
    segment: 'SERVICE',
    group: 'Support',
    enabled: true,
  },
  {
    id: 'technical-support',
    name: 'Technical Support',
    segment: 'SERVICE',
    group: 'Support',
    enabled: true,
  },

  // MANAGE Segment
  {
    id: 'operations',
    name: 'Operations',
    segment: 'MANAGE',
    group: 'Operations',
    enabled: true,
  },
  {
    id: 'people-ops',
    name: 'People Operations',
    segment: 'MANAGE',
    group: 'HR',
    enabled: true,
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    segment: 'MANAGE',
    group: 'Legal',
    enabled: false,
  },

  // PROFIT Segment
  {
    id: 'finance',
    name: 'Finance',
    segment: 'PROFIT',
    group: 'Finance',
    enabled: true,
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    segment: 'PROFIT',
    group: 'Analytics',
    enabled: true,
  },
  {
    id: 'strategy',
    name: 'Strategy & Planning',
    segment: 'PROFIT',
    group: 'Strategy',
    enabled: false,
  },
];

export const segmentColors: Record<Segment, string> = {
  BUILD: '#40916C',
  SALE: '#F4A261',
  SERVICE: '#4CC9F0',
  MANAGE: '#9B8EC4',
  PROFIT: '#E9C46A',
};
