import { User } from '@/interfaces';
import { useEffect, useState } from 'react';
import { createPresentationUrl } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
import { ColumnUserAdmin } from '../admin/colmnUsers';
import { DataTableAdminUser } from '../admin/data-table-users';
import { Progress } from '@/components/ui/progress';

export const Profiles = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = localStorage.getItem('user-data');
  const currentUserData = JSON.parse(currentUser || '{}');
  const [progress, setProgress] = useState(0);
  const url = useAppSelector(createPresentationUrl);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress < 100) {
          return oldProgress + 10;
        }
        clearInterval(interval);
        return 100;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${url}/user`);
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
    
      {progress < 100 ? (
        <div className="flex justify-center items-center h-[80vh]">
          <div className="w-[600px]">
            <p>Loading...</p>
            <Progress value={progress} className="w-[60%]" />
          </div>
        </div>
      ) : (
        users &&
        (currentUserData.role === 'agent' ||
        currentUserData.role === 'validator' ? (
          <DataTableAdminUser columns={ColumnUserAdmin} data={users} />
        ) : (
          ' Not authorized to view this page'
        ))
      )}
    </div>
  );
};
