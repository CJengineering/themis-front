import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {
  Selectcdn as Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppSelector } from '../features/hooks';
import { createPresentationUrl2 } from '../features/Presentations';
import { useParams } from 'react-router-dom';

// Define the schema for form validation
const FormSchema = z.object({
  documentType: z.enum(['Logistics', 'Expenses', 'Itinerary', 'Notes', 'IDs'], {
    required_error: 'Document type is required.',
  }),
  file: z.instanceof(File, {
    message: 'File is required.',
  }),
});

// Form component
export function AddDocumentForm() {
    const { tripId } = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      documentType: undefined,
      file: undefined,
    },
  });
  const url2 = useAppSelector(createPresentationUrl2)
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        form.setValue('file', file, { shouldValidate: true });
      }
    }
  };

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formData = new FormData();
  
    const updateTripDto = {
      action: {
        type: 'addDocument',
        data: {
          type: data.documentType, // 'Logistics', 'Expenses', 'Itinerary', 'Notes', 'IDs'
        },
      },
      fieldData: {}, // Pass the current fieldData if needed
    };
  
    console.log('updateTripDto:', updateTripDto);
  
    formData.append('updateTripDto', JSON.stringify(updateTripDto));
    formData.append('file', data.file);
  
    try {
      const response = await fetch(`${url2}/trips/${tripId}`, {
        method: 'PATCH',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Response:', result);
      toast({
        title: 'Expense added',
        description: 'The expense has been successfully added',
  
      });
      toast({
          title: "Document added successfully!",
          description: 'The document has been successfully added',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000); //
  
    } catch (error) {
      console.error('Error:');
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-red-600 p-4">
            <code className="text-white"></code>
          </pre>
        ),
      });
    }
  }
  
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Document Type Select */}
        <FormField
          control={form.control}
          name="documentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Document Types</SelectLabel>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Expenses">Expenses</SelectItem>
                      <SelectItem value="Itinerary">Itinerary</SelectItem>
                      <SelectItem value="Notes">Notes</SelectItem>
                      <SelectItem value="IDs">IDs</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Upload Input */}
        <FormField
          control={form.control}
          name="file"
          render={({ field: { ref, ...field } }) => (
            <FormItem>
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <Input type="file" onChange={handleFileChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
