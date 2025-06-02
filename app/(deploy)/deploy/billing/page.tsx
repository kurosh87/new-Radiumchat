'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    description: 'Great for anyone to get started with our APIs',
    price: '$0',
    current: true,
    features: [
      'Build and Test on Radium',
      'Community Support',
    ],
    ctaText: 'Current Plan',
    ctaVariant: 'outline' as const,
  },
  {
    name: 'Developer',
    description: 'Great for developers and startups to scale up and pay as you go',
    price: 'Pay per Token',
    features: [
      'Higher Token Limits',
      'Chat Support',
      'Flex Service Tier',
      'Batch Processing',
    ],
    ctaText: 'Upgrade',
    ctaVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    description: 'Great for businesses who require custom solutions for large scale needs',
    price: 'Custom',
    features: [
      'Everything in Developer, Plus:',
      'Scalable Capacity',
      'Dedicated Support',
    ],
    ctaText: 'Contact Us',
    ctaVariant: 'default' as const,
  },
];

export default function BillingPage() {
  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 border-b">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Billing</h1>
      </header>
      
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="plans" className="w-full">
          <div className="border-b">
            <div className="max-w-7xl mx-auto px-4">
              <TabsList className="h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="plans" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                >
                  Plans
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="plans" className="mt-0">
            <div className="max-w-7xl mx-auto p-4 space-y-8">
              {/* Plans Grid */}
              <div className="grid gap-6 md:grid-cols-3">
                {plans.map((plan) => (
                  <Card 
                    key={plan.name}
                    className={plan.current ? 'border-primary' : ''}
                  >
                    <CardHeader className="space-y-4">
                      <div className="flex items-center gap-2">
                        {plan.name === 'Free' && <Zap className="h-5 w-5 text-orange-500" />}
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                      </div>
                      <CardDescription className="text-sm">
                        {plan.description}
                      </CardDescription>
                      <div className="text-2xl font-bold">
                        {plan.price}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        variant={plan.ctaVariant}
                        className="w-full"
                        disabled={plan.current}
                      >
                        {plan.ctaText}
                      </Button>
                      
                      <div className="space-y-3 pt-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pricing Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">On Demand Pricing</h2>
                  <p className="text-sm text-muted-foreground">
                    For the latest on-demand pricing, visit the{' '}
                    <Link href="/deploy/pricing" className="text-primary hover:underline">
                      Pricing page
                    </Link>
                    .
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Rate Limits</h2>
                  <p className="text-sm text-muted-foreground">
                    For the current free and developer plan rate limits, see the{' '}
                    <Link href="/deploy/rate-limits" className="text-primary hover:underline">
                      Rate Limits page
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}