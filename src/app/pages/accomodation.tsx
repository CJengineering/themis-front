import React from 'react';

import { accommodationColumns } from '../accomodation/columnAccomodation';
import { fakeAccommodations } from '@/fake-travel';
import { DataTable } from '../travel/data-table';

const Accomodation = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accomodations</h2>
      <DataTable
              columns={accommodationColumns}
              data={fakeAccommodations}
            />
    </div>
  );
};

export default Accomodation;