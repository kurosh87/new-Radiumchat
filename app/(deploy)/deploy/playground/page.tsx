'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Copy, 
  Code as CodeIcon, 
  FileText, 
  Settings,
  Play,
  Plus,
  Trash2,
  ChevronDown,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedModel, setSelectedModel] = useState('meta-llama/llama-4-scout-17b-16e-instruct');
  const [temperature, setTemperature] = useState([1]);
  const [maxTokens, setMaxTokens] = useState([1024]);
  const [streamResponse, setStreamResponse] = useState(true);
  const [jsonMode, setJsonMode] = useState(false);
  const [systemMessage, setSystemMessage] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState(`from radium import Radium

client = Radium()
completion = client.chat.completions.create(
    model="meta-llama/llama-4-scout-17b-16e-instruct",
    messages=[
        {
            "role": "user",
            "content": ""
        }
    ],
    temperature=1,
    max_completion_tokens=1024,
    top_p=1,
    stream=True,
    stop=None,
)

for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")`);

  const handleSend = () => {
    if (!userMessage.trim()) return;
    
    const newMessages = [...messages];
    if (systemMessage && newMessages.length === 0) {
      newMessages.push({ role: 'system', content: systemMessage });
    }
    newMessages.push({ role: 'user', content: userMessage });
    
    // Mock response
    newMessages.push({ 
      role: 'assistant', 
      content: 'This is a mock response from the playground. In a real implementation, this would call your API.' 
    });
    
    setMessages(newMessages);
    setUserMessage('');
  };

  const updateCode = () => {
    const messageArray = messages.map(msg => `        {
            "role": "${msg.role}",
            "content": "${msg.content.replace(/"/g, '\\"')}"
        }`).join(',\n');

    const newCode = `from radium import Radium

client = Radium()
completion = client.chat.completions.create(
    model="${selectedModel}",
    messages=[
${messageArray || '        {\n            "role": "user",\n            "content": ""\n        }'}
    ],
    temperature=${temperature[0]},
    max_completion_tokens=${maxTokens[0]},
    top_p=1,
    stream=${streamResponse ? 'True' : 'False'},
    stop=None,
)

${streamResponse ? 
`for chunk in completion:
    print(chunk.choices[0].delta.content or "", end="")` : 
`print(completion.choices[0].message.content)`}`;

    setCode(newCode);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Playground</h1>
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[400px] ml-auto">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="meta-llama/llama-4-scout-17b-16e-instruct">
              meta-llama/llama-4-scout-17b-16e-instruct
            </SelectItem>
            <SelectItem value="deepseek-ai/DeepSeek-R1-0528">
              deepseek-ai/DeepSeek-R1-0528
            </SelectItem>
            <SelectItem value="Qwen/Qwen3-235B-A22B">
              Qwen/Qwen3-235B-A22B
            </SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-fit grid-cols-2 mx-4 mt-4">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="studio">Studio</TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="flex-1 flex flex-col p-4 pt-2">
              <div className="flex-1 space-y-4 overflow-auto mb-4">
                <div className="space-y-2">
                  <Label htmlFor="system">SYSTEM</Label>
                  <Textarea
                    id="system"
                    placeholder="Enter system message (Optional)"
                    value={systemMessage}
                    onChange={(e) => setSystemMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {messages.length > 0 && (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className="space-y-2">
                        <Label className="uppercase">{message.role}</Label>
                        <div className={cn(
                          "p-3 rounded-lg",
                          message.role === 'user' ? 'bg-muted' : 'bg-muted/50'
                        )}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">USER</Label>
                <Textarea
                  id="user"
                  placeholder="Enter user message or drag image here..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="min-h-[100px]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.metaKey) {
                      handleSend();
                    }
                  }}
                />
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMessages([]);
                      setSystemMessage('');
                      setUserMessage('');
                    }}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                    <Button onClick={handleSend}>
                      Submit
                      <span className="ml-2 text-xs text-muted-foreground">⌘ + ↵</span>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="studio" className="flex-1 p-4 pt-2">
              <div className="h-full">
                <CodeMirror
                  value={code}
                  height="100%"
                  theme={oneDark}
                  extensions={[python()]}
                  onChange={(value) => setCode(value)}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Parameters Panel */}
        <div className="w-[400px] border-l p-4 overflow-auto">
          <h3 className="font-semibold mb-4">PARAMETERS</h3>
          
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(code)}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Temperature</Label>
                <span className="text-sm font-medium">{temperature[0]}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={(value) => {
                  setTemperature(value);
                  updateCode();
                }}
                max={2}
                min={0}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Max Completion Tokens</Label>
                <span className="text-sm font-medium">{maxTokens[0]}</span>
              </div>
              <Slider
                value={maxTokens}
                onValueChange={(value) => {
                  setMaxTokens(value);
                  updateCode();
                }}
                max={32768}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="stream">Stream</Label>
              <Switch
                id="stream"
                checked={streamResponse}
                onCheckedChange={(checked) => {
                  setStreamResponse(checked);
                  updateCode();
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="json">JSON Mode</Label>
              <Switch
                id="json"
                checked={jsonMode}
                onCheckedChange={setJsonMode}
              />
            </div>

            <details className="space-y-4">
              <summary className="cursor-pointer font-medium text-sm">
                Advanced
                <ChevronDown className="inline h-4 w-4 ml-1" />
              </summary>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Top P</Label>
                  <Slider
                    defaultValue={[1]}
                    max={1}
                    min={0}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frequency Penalty</Label>
                  <Slider
                    defaultValue={[0]}
                    max={2}
                    min={-2}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Presence Penalty</Label>
                  <Slider
                    defaultValue={[0]}
                    max={2}
                    min={-2}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Stop Sequences</Label>
                  <Textarea
                    placeholder="Enter stop sequences (one per line)"
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}