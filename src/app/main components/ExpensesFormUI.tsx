import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Selectcdn,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { calculateConvertedAmounts, fetchConversionRates } from '@/lib/utils';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAppSelector } from '../features/hooks';
import { createPresentationUrl2 } from '../features/Presentations';

// Currency options
const currencyOptions = ['USD', 'EUR', 'GBP', 'SAR'] as const;

// Nature options
const natureOptions = ['Food', 'Transport', 'Supplies', 'Other'] as const;

// Initial fallback rates

// Zod schema for validation
const expenseSchema = z.object({
  nature: z.enum(natureOptions),
  amount: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().min(0, 'Amount must be positive')
  ),
  currency: z.enum(currencyOptions),
});

type ExpenseData = z.infer<typeof expenseSchema>;

export function ExpensesForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      nature: 'Food',
      amount: 0,
      currency: 'USD',
    },
  });
  const url2 = useAppSelector(createPresentationUrl2);
  const [actionValidated, setActionValidated] = useState(false);
  const { toast } = useToast();
  const { tripId } = useParams();
  const onSubmit = async (data: ExpenseData) => {
    try {
      const conversionRates = await fetchConversionRates();
      const convertedAmounts = calculateConvertedAmounts(
        data.amount,
        data.currency,
        conversionRates
      );
      console.log('Converted amounts:', convertedAmounts);
      console.log('Validated Expense data submitted:', data);

      const submissionData = {
        action: {
          type: 'addExpense',
          data: {
            nature: data.nature,
            amount: data.amount,
            currency: data.currency,
            priceInUSD: convertedAmounts.priceInUSD,
            priceInEUR: convertedAmounts.priceInEUR,
            priceInSAR: convertedAmounts.priceInSAR,
            priceInGBP: convertedAmounts.priceInGBP,
          },
        },
        fieldData: {},
      };

      console.log('Submission data', submissionData);

      // Sending the submissionData to the server
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      toast({
        title: 'Expense added',
        description: 'The expense has been successfully added',
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000); // You can adjust the delay time as needed
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      toast({
        title: 'Error adding expense',
        description: 'There was an issue adding the expense. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <h3 className='text-xl font-bold'>Add expense</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          {/* Nature Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nature" className="text-right">
              Nature
            </Label>
            <Controller
              control={control}
              name="nature"
              render={({ field }) => (
                <Selectcdn value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select nature" />
                  </SelectTrigger>
                  <SelectContent>
                    {natureOptions.map((nature) => (
                      <SelectItem key={nature} value={nature}>
                        {nature}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Selectcdn>
              )}
            />
          </div>

          {/* Amount Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  className="col-span-3"
                  placeholder="Enter amount"
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 col-span-4">{errors.amount.message}</p>
            )}
          </div>

          {/* Currency Field */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currency" className="text-right">
              Currency
            </Label>
            <Controller
              control={control}
              name="currency"
              render={({ field }) => (
                <Selectcdn value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencyOptions.map((currency) => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Selectcdn>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}
