import React from 'react';
import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { travels } from '@/fake-travel';
import { TravelAdminForm } from '../main components/TravelAdminForm';

const Travel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Travels</h2>
      <DataTable columns={travelColumns} data={travels}  dialogContentComponent={TravelAdminForm} />
    </div>
  );
};

export default Travel;