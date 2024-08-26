import React, { useEffect } from 'react';
import ExpenseRow from './ExpenseRow';
import { Expense } from '@/interfaces';
import { createPresentationSingleTrip } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { map } from 'zod';
import { mapExpenses } from '@/lib/mappers/mapperExpense';
import { mapDocuments } from '@/lib/mappers/mapperDocuments';
import DocumentRow from './DocumentRow';


const DocumentsTable: React.FC = () => {

  const trip = useAppSelector(createPresentationSingleTrip);

  const dataDocuments = trip.documents;
  const processedDocuments = mapDocuments(dataDocuments);
  return (
    <div>
 
      <div className="mt-2">
       
        {processedDocuments.map(document => (
          <DocumentRow key={document.id} document={document} />
        ))}
      </div>
    </div>
  );
};

export default DocumentsTable;
