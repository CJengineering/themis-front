import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createPresentationUrl } from '../features/Presentations';
import { useAppSelector } from '../features/hooks';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  position?: string;
  email: string;
  password?: string;
  someOptionalField?: string;
  officeLocation?: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const url = useAppSelector(createPresentationUrl);
 
  const userData = localStorage.getItem('user-data');
    const admin = JSON.parse(userData || '{}');
  useEffect(() => {
    fetch(`${url}/user`)
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);
  const handleUserChange = (
    event: ChangeEvent<HTMLInputElement| HTMLSelectElement>,
    field: keyof User
  ) => {
    setEditingUser((prev) => {
      if (prev === null) return null;
      return { ...prev, [field]: event.target.value };
    });
  };
  const renderEditForm = () => {
    if (!editingUser) return null;
  if(admin.email !== 'bob.traveller@example.com'){
    return (
        <div>
            <h1>Your are not admin 1</h1>
        </div>
    );
  }
    return (
      <form onSubmit={handleUpdateUser} className="edit-form mb-4">
        <div className="mb-2">
          <label htmlFor="firstName" className="block">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={editingUser.firstName}
            onChange={(e) => handleUserChange(e, 'firstName')}
            className="border p-1"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={editingUser.lastName}
            onChange={(e) => handleUserChange(e, 'lastName')}
            className="border p-1"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="role" className="block">
            Role
          </label>
          <select
            id="role"
            value={editingUser.role}
            onChange={(e) => handleUserChange(e, 'role')}
            className="border p-1"
          >
            <option value="validator">Validator</option>
            <option value="traveller">Traveller</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="position" className="block">
            Position
          </label>
          <select
            id="position"
            value={editingUser.position}
            onChange={(e) => handleUserChange(e, 'position')}
            className="border p-1"
          >
            <option value="Director">Director</option>
            <option value="Senior">Senior</option>
            <option value="Associates">Associates</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="officeLocation" className="block">
            Office Location 
          </label>
          <select
            id="officeLocation"
            value={editingUser.officeLocation}
            onChange={(e) => handleUserChange(e, 'officeLocation')}
            className="border p-1"
          >
            <option value="Monaco">Monaco</option>
            <option value="Dubai">Dubai</option>
            <option value="London">London</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update User
        </button>
      </form>
    );
  };

  const handleUpdateUser = (event: FormEvent) => {
    event.preventDefault();
    if (!editingUser) return;

    // Replace with your API endpoint and method to update the user
    fetch(`${url}/user/${editingUser.id}`, {
      method: 'PATCH', // or 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingUser),
    })
      .then(() => {
        setUsers(
          users.map((user) => (user.id === editingUser.id ? editingUser : user))
        );
        setEditingUser(null);
      })
      .catch((error) => console.error('Error updating user: ', error));
  };
  const deleteUser = (userId: number) => {
    fetch(`${url}/user/${userId}`, { method: 'DELETE' })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => console.error('Error deleting user: ', error));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {renderEditForm()}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 flex justify-between items-center">
            <span>
              {user.firstName} {user.lastName} {user.role} 
            </span>
            <span>{user.email}</span>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setEditingUser(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
