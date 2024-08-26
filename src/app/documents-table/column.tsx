import { toast } from '@/components/ui/use-toast';
import { ColumnDef } from '@tanstack/react-table';

export type DocumentTrip = {
  tripId: string;
  id: string;
  type: string;
  link: string;
  dateCreated: string;
};

const handleSubmit = async (documentId: string, tripId: string) => {
  const submissionData = {
    action: { type: 'removeDocument', data: { documentId: documentId } },
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
    
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const errorData = await response.json();
      console.error(
        'Failed to delete document:',
        response.statusText,
        errorData
      );
    }
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};

export const columnsDocuments: ColumnDef<DocumentTrip>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'link',
    header: 'Link',
    cell: ({ row }) => {
      const bookingReference = row.getValue('link');
      if (typeof bookingReference === 'string' && bookingReference) {
        return (
          <a href={bookingReference} target="_blank" rel="noopener noreferrer">
            <span className="material-symbols-outlined cursor-pointer hover:text-gray-200">
              download
            </span>
          </a>
        );
      }
      return null;
    },
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date Uploaded',
    cell: ({ row }) => {
      const dateCreated = row.getValue<string>('dateCreated');
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(new Date(dateCreated));
      return formattedDate;
    },
  },
  {
    header: 'Actions',
    cell: ({ row }) => {
      console.log('Row data:', row.original); // Logs the entire row data
      const documentId = row.getValue<string>('id');
      const tripId = row.getValue<string>('tripId');

      if (!documentId || !tripId) {
        console.error('Missing documentId or tripId');
        return null;
      }

      return (
        <button
          onClick={() => handleSubmit(documentId, tripId)}
          className="material-symbols-outlined cursor-pointer hover:text-red-500"
        >
          delete
        </button>
      );
    },
  },
];
