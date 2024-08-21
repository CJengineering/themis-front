import { ColumnDef } from "@tanstack/react-table"

export type DocumentTrip = {
     
    id: string
    type: string
    link: string
    dateCreated: string
   
}

export const columnsDocuments: ColumnDef<DocumentTrip>[] = [
    {
        header: 'Type',
        accessorKey: 'type',
    },
    {
        header: 'Link',
        accessorKey: 'link',
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
            return null; // Or return a placeholder or empty content if needed
          },
    },
    {
        header: 'Date Uploaded',
        accessorKey: 'dateCreated',
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

]