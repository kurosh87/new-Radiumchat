'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CreditCardProps = {
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
  name: string;
  isDefault?: boolean;
  className?: string;
};

export function CreditCard({
  last4,
  brand,
  expMonth,
  expYear,
  name,
  isDefault = false,
  className,
}: CreditCardProps) {
  const getBrandIcon = () => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'VISA';
      case 'mastercard':
        return 'MC';
      case 'amex':
        return 'AMEX';
      case 'discover':
        return 'DISC';
      default:
        return 'CARD';
    }
  };

  return (
    <Card className={cn('w-full max-w-md bg-gradient-to-br from-blue-600 to-blue-800 text-white', className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-8">
          <div className="text-sm font-medium">{getBrandIcon()}</div>
          {isDefault && (
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-full">
              DEFAULT
            </span>
          )}
        </div>
        <div className="text-2xl font-bold mb-6 tracking-wider">
          •••• •••• •••• {last4}
        </div>
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-blue-200 text-xs mb-1">Card Holder</div>
            <div className="font-medium">{name.toUpperCase()}</div>
          </div>
          <div>
            <div className="text-blue-200 text-xs mb-1">Expires</div>
            <div className="font-medium">
              {String(expMonth).padStart(2, '0')}/{String(expYear).slice(-2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
