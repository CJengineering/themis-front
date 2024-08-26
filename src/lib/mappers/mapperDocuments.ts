
type Document = {
    id: string;
    type: string;
    link: string;

};
export function mapDocuments(documentsArray: Array<{
    id: number;
    type: string;
    name: string;
    url: string;

}>): Document[] {
    return documentsArray.map(document => ({
        id: document.id.toString(), // Ensure ID is a string
        type: document.type,
        link: document.url,
      
    }));
}
