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
import { Button } from '@/components/ui/button';
const handleLogout = () => {
  localStorage.removeItem('user-data');
  localStorage.removeItem('isAuthenticated');
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
        <Button
          className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-1 px-2 rounded text-sm"
          onClick={handleLogout}
        >
          <span className="material-icons mr-1 text-base">logout</span>
          Logout
        </Button>

        <Avatar>
          <AvatarImage src="https://github.com/example.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopRightNav;
