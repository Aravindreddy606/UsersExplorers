import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        const res = await fetch(
            'https://randomuser.me/api/?results=200'
        );
        const json = await res.json();

        return json.results.map((item: any, index: number) => ({
            id: index + 1,
            name: `${item.name.first} ${item.name.last}`,
            email: item.email,
            phone: item.phone,
            company: { name: item.location.timezone.description },
            address: { city: item.location.city },
        }));
    }
);
