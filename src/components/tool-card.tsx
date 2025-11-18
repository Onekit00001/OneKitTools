import Link from "next/link";
import type { Tool } from "@/lib/definitions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as icons from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // @ts-expect-error
  const Icon = icons[tool.icon as keyof typeof icons] || icons.Wrench;
  return (
    <Link href={`/tools/${tool.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">
            {tool.name}
          </CardTitle>
          <Icon className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm">{tool.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
