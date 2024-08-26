import React from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAppDispatch } from '../features/hooks';
import { fetchSingleTrip } from '../features/trip/fetchTrip';

interface Document {
  id: string;
  type: string;
  link: string;
  
}

interface DocumentRowProps {
  document: Document;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document }) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'Logistics':
        return <span className="material-icons text-3xl">local_shipping</span>;
      case 'Itinerary':
        return <span className="material-icons text-3xl">flight_takeoff</span>;
      case 'Notes':
        return <span className="material-icons text-3xl">note</span>;
      case 'IDs':
        return <span className="material-icons text-3xl">badge</span>;
      case 'Expenses':
        return <span className="material-icons text-3xl">attach_money</span>;
      default:
        return <span className="material-icons text-3xl">insert_drive_file</span>;
    }
  };

  const { toast } = useToast();
  const { tripId } = useParams();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const submissionData = {
      action: { type: 'removeDocument', data: { documentId: document.id } },
      fieldData: {},
    };

    console.log('Submitting data:', submissionData);

    try {
      const response = await fetch(`http://localhost:3000/trips/${tripId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        console.log('Document deleted successfully');
        toast({
          title: 'Document deleted successfully',
          description: 'The document has been deleted',
        });
        await dispatch<any>(
          fetchSingleTrip(`http://localhost:3000/trips/${tripId}`)
        );
      } else {
        const errorData = await response.json();
        console.error('Failed to delete document:', response.statusText, errorData);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="bg-blue-100 mt-2 p-4 grid grid-cols-12">
      <div className="col-span-2 flex items-center">
        {renderIcon(document.type)}
      </div>
      <div className="col-span-6">
        <h3 className="text-xl font-semibold">{document.type}</h3>
        <a href={document.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          View Document
        </a>
      </div>
  
      <div className="col-span-2 flex items-center">
        <span className="material-icons hover:text-red-800 hover:cursor-pointer" onClick={handleSubmit}>
          delete
        </span>
      </div>
    </div>
  );
};

export default DocumentRow;
