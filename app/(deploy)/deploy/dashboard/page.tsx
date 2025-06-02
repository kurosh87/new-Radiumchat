'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Zap,
  Brain,
  FileText,
  Key,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  Layers,
  Plus,
  ChevronRight,
  Sparkles,
  Code,
  Users,
  BookOpen,
  Gauge,
  MessageSquare,
  Info,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RainbowButton } from '@/components/ui/rainbow-button';

// Mock data for charts
const usageData = [
  { name: 'Yesterday', value: 0 },
  { name: 'Today', value: 850 },
];

const last30DaysData = [
  { day: 'May 4', value: 420 },
  { day: 'May 11', value: 380 },
  { day: 'May 18', value: 520 },
  { day: 'May 25', value: 680 },
  { day: 'Jun 1', value: 750 },
  { day: 'Jun 2', value: 850 },
];

const popularModels = [
  {
    id: 'qwen-qwq',
    name: 'Qwen QwQ',
    type: 'REASONING',
    icon: Brain,
    color: 'from-blue-600 to-sky-500',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1 Distill Llama',
    type: 'REASONING',
    icon: Sparkles,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'llama-4',
    name: 'Llama 4',
    type: 'FUNCTION CALLING / TOOL USE',
    icon: Code,
    color: 'from-sky-500 to-indigo-500',
  },
];

export default function DeployHomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Lets Cook!</h1>
        <Link href="/" className="hidden md:block order-4 md:ml-auto">
          <RainbowButton className="flex items-center gap-2 text-sm py-1.5 h-8 px-4 rounded-md">
            <ArrowLeft className="h-4 w-4" />
            Back to Chat
          </RainbowButton>
        </Link>
      </header>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Usage Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$0</div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart data={usageData}>
                      <Bar
                        dataKey="value"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Last 30 Days
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">&lt; $1</div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={60}>
                    <LineChart data={last30DaysData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis dataKey="day" hide />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Token Usage
                </CardTitle>
                <Gauge className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,024</div>
                <div className="mt-4">
                  <ResponsiveContainer width="100%" height={60}>
                    <BarChart
                      data={[{ name: 'Usage', value: 1024, max: 10000 }]}
                    >
                      <Bar
                        dataKey="value"
                        fill="#ef4444"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar dataKey="max" fill="#27272a" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/deploy/billing">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Upgrade</CardTitle>
                      <CardDescription>Scale your deployments</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/deploy">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                      <Activity className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Deployments</CardTitle>
                      <CardDescription>View all deployments</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/deploy/api-keys">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                      <Key className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        Manage API Keys
                      </CardTitle>
                      <CardDescription>Create and manage keys</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/deploy/playground">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-1">Playground</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat & play around with models
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/deploy/docs">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg">
                      <BookOpen className="h-5 w-5 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-1">Docs</h3>
                  <p className="text-sm text-muted-foreground">
                    Guides & how-to's
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/deploy/team">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-1">Manage Team</h3>
                  <p className="text-sm text-muted-foreground">
                    Add users, manage permissions
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Models Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">The Models</h2>
              <Link href="/deploy/models">
                <Button variant="ghost" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4 flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900 dark:text-amber-100">
                  What's New: The Official Llama API, accelerated by Radium Deploy. The
                  fastest, lowest-cost way to run Llama.{' '}
                  <Link href="/deploy/docs" className="underline">
                    Learn more
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {popularModels.map((model) => {
                const Icon = model.icon;
                return (
                  <Card
                    key={model.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => router.push(`/deploy/new?model=${model.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 bg-gradient-to-r ${model.color} rounded-lg`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {model.name}
                            </CardTitle>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {model.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">
                We're adding new models all the time and will let you know when
                a new one comes online.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                See full details on our{' '}
                <Link
                  href="/deploy/models"
                  className="text-primary hover:underline"
                >
                  Models page
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
