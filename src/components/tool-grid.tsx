"use client";

import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ToolCard } from "@/components/tool-card";
import type { Tool } from "@/lib/definitions";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

interface ToolGridProps {
  tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  
  const categories = ["All", ...Array.from(new Set(tools.map(tool => tool.category)))];
  const selectedCategory = searchParams.get("category") || "All";

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a tool..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10"
            aria-label="Search tools"
          />
        </div>
      </div>
      <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg font-semibold">No tools found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
