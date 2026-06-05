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
  {
    id: "software",
    name: "Software",
    segment: 'BUILD',
    group: "Technical",
    flag: "TI5",
    enabled: true,
  },
  {
    id: "hardware",
    name: "Hardware",
    segment: 'BUILD',
    group: "Technical",
    flag: "TI5",
    enabled: false,
  },
  {
    id: "security",
    name: "Security",
    segment: 'BUILD',
    group: "Technical",
    flag: "TI3",
    enabled: true,
  },
  {
    id: "devops",
    name: "Devops",
    segment: 'BUILD',
    group: "Technical",
    flag: "TI3",
    enabled: false,
  },
  {
    id: "product-manager",
    name: "Product Manager",
    segment: 'BUILD',
    group: "Product",
    flag: "TI5",
    enabled: true,
  },
  {
    id: "product-owner",
    name: "Product Owner",
    segment: 'BUILD',
    group: "Product",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "ui-ux",
    name: "UI/UX",
    segment: 'BUILD',
    group: "Product",
    flag: "NI5",
    enabled: true,
  },
  {
    id: "partnership",
    name: "Partnership",
    segment: 'BUILD',
    group: "Partnership",
    flag: "TI3",
    enabled: true,
  },
  {
    id: "warehouse",
    name: "Warehouse",
    segment: 'BUILD',
    group: "Manufacturer",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "marketing",
    name: "Marketing",
    segment: 'SALE',
    group: "Marketing",
    flag: "TI3",
    enabled: true,
  },
  {
    id: "account",
    name: "Account",
    segment: 'SALE',
    group: "Sale",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "customer-success",
    name: "Customer Success",
    segment: 'SERVICE',
    group: "CS",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "system-admin",
    name: "System Admin",
    segment: 'SERVICE',
    group: "IT",
    flag: "TI3",
    enabled: true,
  },
  {
    id: "call-center",
    name: "Call Center",
    segment: 'SERVICE',
    group: "CS",
    flag: "NI2",
    enabled: true,
  },
  {
    id: "hr",
    name: "HR",
    segment: 'MANAGE',
    group: "Admin",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "admin",
    name: "Admin",
    segment: 'MANAGE',
    group: "Admin",
    flag: "NI3",
    enabled: true,
  },
  {
    id: "legal",
    name: "Legal",
    segment: 'MANAGE',
    group: "Legal",
    flag: "NI3",
    enabled: false,
  },
  {
    id: "accounting",
    name: "Accounting",
    segment: 'PROFIT',
    group: "Accounting",
    flag: "NI2",
    enabled: true,
  },
  {
    id: "finance",
    name: "Finance",
    segment: 'PROFIT',
    group: "Finance",
    flag: "NI2",
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
