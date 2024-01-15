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
import { DropdownMenuDemo } from './DropDownMenuDemo';
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
  let userInitials = 'UN';
  if (localStorage.getItem('user-data')) {
    const user = JSON.parse(localStorage.getItem('user-data') || '{}');
     userInitials = `${user.firstName[0]}${user.lastName[0]}`;
  }
  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold mb-4">{currentPage}</h1>
      <div className="flex space-x-4">
        <DropdownForm></DropdownForm>
  
        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>{userInitials }</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopRightNav;
