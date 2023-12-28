import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  initialText?: string;
}

const InputCustom = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, initialText, ...props }, ref) => {
    const [value, setValue] = useState(initialText || '');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      if (props.onChange) {
        props.onChange(event);
      }
    };

    return (
      <input
        type={type}
        value={value}
        onChange={handleChange}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props} // Additional props, excluding 'value' and 'onChange' which are handled above
      />
    );
  }
);

InputCustom.displayName = "Input";

export { InputCustom };
