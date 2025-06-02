'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, ExternalLink, Sparkles, Zap, Brain, Code } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock model data
const models = [
  {
    id: 'deepseek-r1',
    name: 'DeepSeek-R1-0528',
    provider: 'deepseek-ai',
    category: 'text-generation',
    description: 'The DeepSeek R1 model has undergone a minor version upgrade, with the current version being DeepSeek-R1-0528.',
    features: ['Text Generation', 'Code Generation', 'Reasoning'],
    pricing: { input: '$3.00', output: '$24.00' },
    context: '64K tokens',
    icon: Brain,
    popular: true,
  },
  {
    id: 'qwen3-235b',
    name: 'Qwen3-235B-A22B',
    provider: 'Qwen',
    category: 'text-generation',
    description: 'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense language models.',
    features: ['Text Generation', 'Multilingual', 'Long Context'],
    pricing: { input: '$1.50', output: '$1.50' },
    context: '32K tokens',
    icon: Sparkles,
    popular: true,
  },
  {
    id: 'qwen3-30b',
    name: 'Qwen3-30B-A3B',
    provider: 'Qwen',
    category: 'text-generation',
    description: 'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense language models.',
    features: ['Text Generation', 'Fast Inference', 'Cost Effective'],
    pricing: { input: '$1.50', output: '$1.50' },
    context: '32K tokens',
    icon: Zap,
    popular: false,
  },
  {
    id: 'qwen3-14b',
    name: 'Qwen3-14B',
    provider: 'Qwen',
    category: 'text-generation',
    description: 'Qwen3 is the latest generation of large language models in Qwen series, offering a comprehensive suite of dense language models.',
    features: ['Text Generation', 'Efficient', 'Versatile'],
    pricing: { input: '$1.50', output: '$1.50' },
    context: '32K tokens',
    icon: Code,
    popular: false,
  },
  {
    id: 'deepseek-prover-v2',
    name: 'DeepSeek-Prover-V2-671B',
    provider: 'deepseek-ai',
    category: 'text-generation',
    description: 'DeepSeek-Prover-V2, an open-source large language model designed for formal theorem proving in Lean 4.',
    features: ['Theorem Proving', 'Mathematical Reasoning', 'Formal Verification'],
    pricing: { input: '$0.50', output: '$1.50' },
    context: '128K tokens',
    icon: Brain,
    popular: false,
  },
];

export default function ModelsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredModels = models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Models</h1>
      </header>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">All Models</TabsTrigger>
                <TabsTrigger value="text-generation">Text Generation</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredModels.map((model) => {
              const Icon = model.icon;
              return (
                <Card key={model.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{model.name}</CardTitle>
                          <CardDescription className="text-sm">{model.provider}</CardDescription>
                        </div>
                      </div>
                      {model.popular && (
                        <Badge variant="secondary" className="ml-2">Popular</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Context:</span>
                          <span className="font-medium">{model.context}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Pricing:</span>
                          <span className="font-medium">
                            ${model.pricing.input} / ${model.pricing.output} per 1M
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button 
                      className="w-full"
                      onClick={() => router.push(`/deploy/new?model=${model.id}`)}
                    >
                      Deploy Model
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}