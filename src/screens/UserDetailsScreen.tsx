import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = {
    route: RouteProp<RootStackParamList, 'UserDetails'>;
};

const UserDetailsScreen = ({ route }: Props) => {
    const { user } = route.params;

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <Image
                source={{ uri: `https://i.pravatar.cc/200?u=${user.id}` }}
                style={styles.avatar}
            />

            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.name}>{user.name}</Text>

                <Detail label="Email" value={user.email} />
                <Detail label="Phone" value={user.phone} />
                <Detail label="Company" value={user.company.name} />
                <Detail label="City" value={user.address.city} />
            </View>
        </View>
    );
};

const Detail = ({
    label,
    value,
}: {
    label: string;
    value: string;
}) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

export default UserDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        padding: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
        elevation: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    row: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        color: '#888',
    },
    value: {
        fontSize: 15,
        color: '#333',
    },
});
