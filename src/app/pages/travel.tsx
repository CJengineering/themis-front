import React from 'react';
import { DataTable } from '../travel/data-table';
import { travelColumns } from '../travel/columns';
import { travels } from '@/fake-travel';

const Travel = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Travels</h2>
      <DataTable columns={travelColumns} data={travels} />
    </div>
  );
};

export default Travel;