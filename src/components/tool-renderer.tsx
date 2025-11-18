"use client";

import dynamic from 'next/dynamic';
import { toolComponentMap } from '@/lib/tools';

interface ToolRendererProps {
    slug: string;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
    const componentKey = Object.keys(toolComponentMap).find(key => key.toLowerCase() === slug.replace(/-/g, '')) as keyof typeof toolComponentMap | undefined;

    const ToolComponent = componentKey 
      ? dynamic(toolComponentMap[componentKey], {
        ssr: false,
        loading: () => <p>Loading...</p>
      })
      : dynamic(() => import('@/components/tools/coming-soon'));
      
    return <ToolComponent />;
}
