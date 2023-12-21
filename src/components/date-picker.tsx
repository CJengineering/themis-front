// DatePicker.tsx
import React, { FC, InputHTMLAttributes } from 'react';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ id, className, ...props }) => {
  return (
    <input 
      type="date" 
      id={id} 
      className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${className || ''}`} 
      {...props} 
    />
  );
};

export default DatePicker;
