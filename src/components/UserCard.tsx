import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { User } from '../types/User';

const UserCard = ({
    user,
    onPress,
}: {
    user: User;
    onPress: () => void;
}) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${user.id}` }}
                style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <Text style={styles.city}>{user.address.city}</Text>
            </View>
        </Pressable>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 14,
        marginHorizontal: 12,
        marginVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    email: {
        color: '#555',
        fontSize: 13,
    },
    city: {
        fontSize: 12,
        color: '#888',
    },
});
