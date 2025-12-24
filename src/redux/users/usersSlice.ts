import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './usersThunks';
import { User } from '../../types/User';

interface UsersState {
    users: User[];
    loading: boolean;
}

const initialState: UsersState = {
    users: [],
    loading: false,
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, state => {
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
