import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TravelForm } from './TravelForm';
import { AccomodationForm } from './AccomodationForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DropdownForm from './DropdownForm';
const handleLogout = () => {
  localStorage.removeItem("user-data");
  localStorage.removeItem("isAuthenticated");
  window.location.reload();

};
type PageName = 'Dashboard' | 'Travel' | 'Accommodation';

// Define the props for TopRightNav
interface TopRightNavProps {
  currentPage: PageName;
}
const TopRightNav = ({ currentPage }: TopRightNavProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold mb-4">{currentPage}</h1>
      <div className="flex space-x-4">
    <DropdownForm></DropdownForm>
    <button 
      className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleLogout}
    >
      <span className="material-icons mr-2">logout</span>
      Logout
    </button>
        <Avatar>
          <AvatarImage src="https://github.com/example.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopRightNav;
