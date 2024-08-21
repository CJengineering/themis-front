// components/AccommodationFields.tsx
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Select from 'react-select';
import { Input } from '@/components/ui/input';

interface CityOption {
  value: string;
  label: string;
}

interface AccommodationFieldsProps {
  cities: CityOption[];
  setSearchTerm: (searchTerm: string) => void;
}

export const AccommodationFields: React.FC<AccommodationFieldsProps> = ({ cities, setSearchTerm }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'accommodations' });

  return (
    <div>
      <h3 className="text-lg font-semibold">Accommodation Requests</h3>
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <FormField
            control={control}
            name={`accommodations.${index}.city`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Controller
                    name={`accommodations.${index}.city`}
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select<{ value: string; label: string }>
                        options={cities}
                        className="col-span-3"
                        placeholder="Select a city"
                        isSearchable
                        onInputChange={(inputValue) => setSearchTerm(inputValue)}
                        onChange={(option) => onChange(option ? option.value : '')}
                        onBlur={onBlur}
                        value={cities.find((c) => c.value === value)}
                        ref={ref}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`accommodations.${index}.hotelName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hotel Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hotel Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => remove(index)} variant="destructive">
            Remove Accommodation
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append({ city: '', hotelName: '' })}>
        Add Accommodation
      </Button>
    </div>
  );
};
