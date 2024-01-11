import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        confirmed:
          'border-transparent bg-request text-white hover:bg-green-600', // Green for confirmed
        inProgress:
          'border-transparent bg-orange-500 text-white hover:bg-orange-600', // Orange for in progress
        waitingValidation:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-600',
          Request:
          'border-transparent bg-request red text-white hover:bg-brown-600', // Brown for request
        Authentication:
          'border-transparent bg-authenticated text-white hover:bg-purple-600', // Purple for authentication
        Validation:
          'border-transparent bg-validated text-white hover:bg-indigo-600', // Indigo for validation
        Approval:
          'border-transparent bg-approved text-white hover:bg-teal-600', // Teal for approval
        Finalisation:
          'border-transparent bg-finalised text-white hover:bg-fuchsia-600', // Fuchsia for finalisation
      
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
