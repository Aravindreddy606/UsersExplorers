import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView, StyleSheet,
    TextInput,
    View,
    Text,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/users/usersThunks';
import { RootState, AppDispatch } from '../redux/store';
import UserCard from '../components/UserCard';
import { User } from '../types/User';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Users'>;
};

const UsersScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { users, loading } = useSelector(
        (state: RootState) => state.users
    );

    const [search, setSearch] = useState('');
    const [filtered, setFiltered] = useState<User[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        setFiltered(
            users.filter(u =>
                u.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const onRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchUsers());
        setRefreshing(false);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
                <Text style={{ textAlign: 'center', marginTop: 10 }}>
                    Loading users...
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            

            {/* Search */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    placeholder="Search by name, email, city"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>


            {/* Empty State */}
            {filtered.length === 0 ? (
                <Text style={{ textAlign: 'center', marginTop: 40 }}>
                    No users found
                </Text>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <UserCard
                            user={item}
                            onPress={() =>
                                navigation.navigate('UserDetails', { user: item })
                            }
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default UsersScreen;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 12,
        marginTop: 12,
        marginBottom:15,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 14,
        elevation: 3, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});
