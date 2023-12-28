import { fakeAccommodations, travels } from '@/fake-travel';
import { travelColumns } from '../travel/columns';
import { DataTable } from '../travel/data-table';
import { accommodationColumns } from '../accomodation/columnAccomodation';

const Dashboard = () => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Travels</h2>
      <DataTable columns={travelColumns} data={travels} />
      <div className="p-4"></div>
      <h2 className="text-xl font-bold mb-4">Accomodation</h2>
      <DataTable columns={accommodationColumns} data={fakeAccommodations} />
    </>
  );
};
export default Dashboard;   