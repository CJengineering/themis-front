import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    password?: string;
    someOptionalField?: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/user')
            .then(response => response.json())
            .then((data: User[]) => setUsers(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);
    const handleUserChange = (event: ChangeEvent<HTMLInputElement>, field: keyof User) => {
        setEditingUser(prev => {
            if (prev === null) return null;
            return { ...prev, [field]: event.target.value };
        });
    };
    const renderEditForm = () => {
        if (!editingUser) return null;

        return (
            <form onSubmit={handleUpdateUser} className="edit-form mb-4">
                <div className="mb-2">
                    <label htmlFor="firstName" className="block">First Name</label>
                    <input type="text" id="firstName" value={editingUser.firstName} onChange={(e) => handleUserChange(e, 'firstName')} className="border p-1" />
                </div>
                <div className="mb-2">
                    <label htmlFor="lastName" className="block">Last Name</label>
                    <input type="text" id="lastName" value={editingUser.lastName} onChange={(e) => handleUserChange(e, 'lastName')} className="border p-1" />
                </div>
            
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Update User
                </button>
            </form>
        );
    };

    const handleUpdateUser = (event: FormEvent) => {
        event.preventDefault();
        if (!editingUser) return;

        // Replace with your API endpoint and method to update the user
        fetch(`http://localhost:3000/user/${editingUser.id}`, {
            method: 'PUT', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingUser),
        })
        .then(() => {
            setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
            setEditingUser(null);
        })
        .catch(error => console.error('Error updating user: ', error));
    };
    const deleteUser = (userId: number) => {
        fetch(`http://localhost:3000/user/${userId}`, { method: 'DELETE' })
            .then(() => {
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error('Error deleting user: ', error));
    };

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">User List</h1>
        {renderEditForm()}
        <ul>
            {users.map(user => (
                <li key={user.id} className="mb-2 flex justify-between items-center">
                    <span>{user.firstName} {user.lastName} {user.role}</span>
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
