import type { LucideIcon, LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type Icon = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

export type Tool = {
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: 'Image' | 'Calculator' | 'Text' | 'Web & Developer' | 'Utility' | 'Productivity';
  component: React.ComponentType;
};
