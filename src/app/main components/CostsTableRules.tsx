import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

// Table 1: Travel Time Requirements
export function TravelTimeTable() {
return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Flights</h2>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>&gt; 6 hrs</TableHead>
                    <TableHead>&lt; 6 hrs</TableHead>
                    <TableHead>If Travelling with Director</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Director</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Business</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Senior</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Economy</TableCell>
                    <TableCell>Business</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Associates</TableCell>
                    <TableCell>Economy</TableCell>
                    <TableCell>Economy</TableCell>
                    <TableCell>Business</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
);
}

// Table 2: Role Based Travel Zones
export function RoleZoneTable() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Accomodations </h2>
        <Table>
      <TableCaption>Accomodations </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>ZONE 1</TableHead>
          <TableHead>ZONE 2</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Director</TableCell>
          <TableCell>450 $</TableCell>
          <TableCell>260 $</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Senior</TableCell>
          <TableCell>340 $</TableCell>
          <TableCell>220 $</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Associates</TableCell>
          <TableCell>253 $</TableCell>
          <TableCell>180 $</TableCell>
        </TableRow>
      </TableBody>
 
    </Table>
        </div>
  );
}

// Table 3: Zone Information
export function ZoneInfoTable() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Zones</h2>
    <Table>
      <TableCaption>Zone Information</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ZONE</TableHead>
          <TableHead>Where</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>ZONE 1</TableCell>
          <TableCell>North America, Europe</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ZONE 2</TableCell>
          <TableCell>Asia, Australia</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ZONE 3</TableCell>
          <TableCell>Africa, South America</TableCell>
        </TableRow>
      </TableBody>
   
    </Table>
    </div>
  );
}

// Main Component to Render All Tables
export function AllTables() {
  return (
    <div className="space-y-8">
      <TravelTimeTable />
      <RoleZoneTable />
      <ZoneInfoTable />
    </div>
  );
}

export default AllTables;
