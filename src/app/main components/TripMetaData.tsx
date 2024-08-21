import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';

const TripMetaData = () => {
  const handleAddFlight = () => {
    // Logic to add flight
    console.log('Add Flight clicked');
  };

  const handleAddAccommodation = () => {
    // Logic to add accommodation
    console.log('Add Accommodation clicked');
  };

  const handleAddExpenses = () => {
    // Logic to add expenses
    console.log('Add Expenses clicked');
  };

  return (
    <div className="px-4 mb-4">
      <div className="px-4 mb-4">
        <div className="px-4 mb-4">
          {/* Flight Costs */}
          <div className="flex justify-between items-center mb-2 text-sm">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-lg mr-1 text-black">
                flight
              </span>
              <p className="border px-2 py-1 rounded text-red-600">$2000</p>
            </div>
            <div>
              <p className="border px-2 py-1 rounded text-green-600">$1950</p>
            </div>
          </div>

          {/* Accommodation Costs */}
          <div className="flex justify-between items-center mb-2 text-sm">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-lg mr-1 text-black">
                hotel
              </span>
              <p className="border px-2 py-1 rounded text-red-600">$1500</p>
            </div>
            <div>
              <p className="border px-2 py-1 rounded text-green-600">$1400</p>
            </div>
          </div>

          {/* Expenses */}
          <div className="flex justify-between items-center mb-2 text-sm">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-lg mr-1 text-black">
                paid
              </span>
              <p className="border px-2 py-1 rounded text-red-600">$1500</p>
            </div>
            <div>
              <p className="border px-2 py-1 rounded text-green-600">$1450</p>
            </div>
          </div>

          {/* Total Costs */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <span className="material-symbols-outlined text-lg mr-1 text-black">
                savings
              </span>
              <p className="border px-2 py-1 rounded text-red-600">$5000</p>
            </div>
            <div>
              <p className="border px-2 py-1 rounded text-green-600">$4800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripMetaData;
