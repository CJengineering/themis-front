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
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenuDemo } from './DropDownMenuDemo';
import {
  createPresentationUrl,
  createPresentationUser,
} from '../features/Presentations';
import { fetchUser } from '../features/user/fetchUser';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TripRequestForm } from './TripInitialRequest';
import { TripSaveForm } from './TripSaveRequest';
const handleLogout = () => {
  localStorage.removeItem('user-data');
  localStorage.removeItem('isAuthenticated');
  window.location.reload();
};
type PageName = 'Dashboard' | 'Trip' | 'Accommodation';

// Define the props for TopRightNav
interface TopRightNavProps {
  currentPage: string;
}
const TopRightNav = ({ currentPage }: TopRightNavProps) => {
  const dispatch = useAppDispatch();
  const url = useAppSelector(createPresentationUrl);

  const currentUser = JSON.parse(localStorage.getItem('user-data') || '{}');
  const isNatOrTim =
    currentUser.email === 'tim@communityjameel.org' ||
    currentUser.email === 'nathaniel@communityjameel.org';
  const userHasData = currentUser && Object.keys(currentUser).length > 0;
  let userInitials = 'UN';
  let urlUser = '';

  if (userHasData) {
    userInitials = `${currentUser.firstName[0]}${currentUser.lastName[0]}`;
    urlUser = `${url}/user/${currentUser.id}`;
  }

  urlUser = `${url}/user/${currentUser.id}`;
  const userFullData = useAppSelector(createPresentationUser);
  useEffect(() => {
    const fetchDate = async () => {
      await dispatch<any>(fetchUser(urlUser));
    };
    if (localStorage.getItem('user-data')) {
      fetchDate();
    }
  }, []);
  const navigate = useNavigate();
  const handleProfileClick = () => {
    navigate(`/profile/${currentUser.id}`);
    window.location.reload();
  };

  function handleClose(): void {
    console.log('Hnadle cloe.');
  }

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-xl font-bold mb-4">{currentPage}</h1>
      <div className="flex space-x-4">
   
      

        <DropdownForm></DropdownForm>

        <Avatar onClick={handleProfileClick} className="cursor-pointer">
          <AvatarImage src={userFullData.user.profilePicUrl} />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default TopRightNav;
