import { tools } from '@/lib/tools';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { type Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ToolRenderer } from '@/components/tool-renderer';
import { Separator } from '@/components/ui/separator';

type Props = {
  params: { slug: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const tool = tools.find(t => t.slug === params.slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: tool.name,
    description: tool.description,
  };
}

export function generateStaticParams() {
  return tools.map(tool => ({
    slug: tool.slug,
  }));
}

export default function ToolPage({ params }: Props) {
  const tool = tools.find(t => t.slug === params.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href="/#tools">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Link>
        </Button>
      </div>
      <PageHeader title={tool.name} description={tool.description} />
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-4 md:p-6">
            {/* Ad Banners are now in the root layout */}
            <Separator className="mb-6" />
            <ToolRenderer slug={tool.slug} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
