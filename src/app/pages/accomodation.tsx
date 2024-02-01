import React from 'react';

import { accommodationColumns } from '../accomodation/columnAccomodation';
import { fakeAccommodations } from '@/fake-travel';
import { DataTable } from '../travel/data-table';
import { TravelAdminForm } from '../main components/TravelAdminForm';

const Accomodation = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Accomodations</h2>
      <DataTable
              columns={accommodationColumns}
              data={fakeAccommodations}
              dialogContentComponent={TravelAdminForm}
            />
    </div>
  );
};

export default Accomodation;