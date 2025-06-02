'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { ExternalLink, Book, Code, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Documentation</h1>
      </header>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Radium Documentation</h2>
            <p className="text-muted-foreground">
              Learn how to deploy and manage AI models with Radium.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-violet-600" />
                  <CardTitle>Quick Start</CardTitle>
                </div>
                <CardDescription>
                  Get up and running with your first deployment in minutes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="https://docs.radium.ai/quickstart" target="_blank">
                  <Button variant="outline" className="w-full">
                    View Guide
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-violet-600" />
                  <CardTitle>API Reference</CardTitle>
                </div>
                <CardDescription>
                  Complete API documentation for all endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="https://docs.radium.ai/api" target="_blank">
                  <Button variant="outline" className="w-full">
                    View API Docs
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-violet-600" />
                  <CardTitle>Model Guides</CardTitle>
                </div>
                <CardDescription>
                  Detailed guides for each supported model
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="https://docs.radium.ai/models" target="_blank">
                  <Button variant="outline" className="w-full">
                    View Guides
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-violet-600" />
                  <CardTitle>Examples</CardTitle>
                </div>
                <CardDescription>
                  Code examples and tutorials for common use cases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="https://github.com/radium-ai/examples" target="_blank">
                  <Button variant="outline" className="w-full">
                    View Examples
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}