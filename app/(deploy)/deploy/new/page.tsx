'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function NewDeploymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedModel = searchParams.get('model') || '';
  
  const [deploymentName, setDeploymentName] = useState('');
  const [selectedModel, setSelectedModel] = useState(preselectedModel);
  const [deploymentType, setDeploymentType] = useState('serverless');
  const [batchSize, setBatchSize] = useState([96]);
  const [minInstances, setMinInstances] = useState([1]);
  const [maxInstances, setMaxInstances] = useState([1]);
  const [customModelName, setCustomModelName] = useState('');
  const [huggingFaceRepo, setHuggingFaceRepo] = useState('');
  const [huggingFaceBranch, setHuggingFaceBranch] = useState('main');
  const [huggingFaceToken, setHuggingFaceToken] = useState('');

  const handleDeploy = () => {
    // Here you would handle the deployment logic
    console.log('Deploying:', {
      deploymentName,
      selectedModel,
      deploymentType,
      batchSize: batchSize[0],
      minInstances: minInstances[0],
      maxInstances: maxInstances[0],
    });
    
    // Redirect to deployments page
    router.push('/deploy');
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <Link href="/deploy" className="flex items-center gap-2 hover:text-muted-foreground">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Deployments</span>
        </Link>
      </header>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Create New Deployment</h1>
            <p className="text-muted-foreground">Deploy a model to start serving predictions</p>
          </div>

          <Tabs defaultValue="select-model" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="select-model">Select a Model</TabsTrigger>
              <TabsTrigger value="custom-llm">Custom LLM</TabsTrigger>
              <TabsTrigger value="lora-finetune">LoRA Text Generation</TabsTrigger>
            </TabsList>

            <TabsContent value="select-model" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Model Configuration</CardTitle>
                  <CardDescription>Choose a pre-configured model to deploy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-name">Deployment Name</Label>
                    <Input
                      id="model-name"
                      placeholder="e.g., production-api"
                      value={deploymentName}
                      onChange={(e) => setDeploymentName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model-select">Model</Label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="deepseek-r1">DeepSeek-R1-0528</SelectItem>
                        <SelectItem value="qwen3-235b">Qwen3-235B-A22B</SelectItem>
                        <SelectItem value="qwen3-30b">Qwen3-30B-A3B</SelectItem>
                        <SelectItem value="qwen3-14b">Qwen3-14B</SelectItem>
                        <SelectItem value="deepseek-prover-v2">DeepSeek-Prover-V2-671B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>GPU Configuration</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">GPU Type</Label>
                        <Select defaultValue="a100-80gb">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="a100-80gb">A100-80GB</SelectItem>
                            <SelectItem value="h200-141gb">H200-141GB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Number of GPUs</Label>
                        <Select defaultValue="1">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="8">8</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label>Max Batch Size</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Maximum number of requests to process in a single batch
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="space-y-2">
                      <Slider
                        value={batchSize}
                        onValueChange={setBatchSize}
                        max={256}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1</span>
                        <span className="font-medium">{batchSize[0]}</span>
                        <span>256</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Instances</Label>
                      <div className="space-y-2">
                        <Slider
                          value={minInstances}
                          onValueChange={setMinInstances}
                          max={10}
                          min={0}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-center text-sm font-medium">{minInstances[0]}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Instances</Label>
                      <div className="space-y-2">
                        <Slider
                          value={maxInstances}
                          onValueChange={setMaxInstances}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-center text-sm font-medium">{maxInstances[0]}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="custom-llm" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Custom LLM Configuration</CardTitle>
                  <CardDescription>Deploy your own language model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="custom-model-name">Model Name</Label>
                    <Input
                      id="custom-model-name"
                      placeholder="radium/my-model"
                      value={customModelName}
                      onChange={(e) => setCustomModelName(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      A model name used for inference with deepinfra
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hf-repo">Hugging Face Repository</Label>
                    <Input
                      id="hf-repo"
                      placeholder="hf-username/hf-model"
                      value={huggingFaceRepo}
                      onChange={(e) => setHuggingFaceRepo(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hf-token">Hugging Face Token</Label>
                    <Input
                      id="hf-token"
                      type="password"
                      placeholder="hf_*****************************"
                      value={huggingFaceToken}
                      onChange={(e) => setHuggingFaceToken(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground">
                      Optional, for private repositories
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="lora-finetune" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>LoRA Model Configuration</CardTitle>
                  <CardDescription>Deploy a LoRA fine-tuned model</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="lora-model-name">LoRA Model Name</Label>
                    <Input
                      id="lora-model-name"
                      placeholder="radium/my-model"
                      value={customModelName}
                      onChange={(e) => setCustomModelName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="base-model">Base Model</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a base model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llama-3.1-8b">Llama-3.1-8B-Instruct</SelectItem>
                        <SelectItem value="llama-3.1-70b">Llama-3.1-70B-Instruct</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="civitai-url">Civitai URL</Label>
                    <Input
                      id="civitai-url"
                      placeholder="E.g. https://civitai.com/models/631986/xlabs-flux-realism-lora"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Estimated Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Estimated monthly cost</span>
                <span className="text-2xl font-bold">$125.00</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Based on selected configuration and average usage
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => router.push('/deploy')}>
              Cancel
            </Button>
            <Button onClick={handleDeploy}>
              Deploy Model
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}