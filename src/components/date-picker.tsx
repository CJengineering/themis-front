import React, { FC, InputHTMLAttributes, useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';

interface DatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
}

const DatePicker: FC<DatePickerProps> = ({ id, className, ...props }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setIsEmpty(!props.value);
  }, [props.value]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmpty(e.target.value === '');
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <>
      <input
        type="date"
        id={id}
        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
          isEmpty ? 'placeholder' : ''
        } ${className || ''}`}
        {...props}
        onChange={handleChange}
        style={{ padding: '0.5rem' }} // Adjust padding as needed
      />
     
    </>
  );
};

export default DatePicker;
