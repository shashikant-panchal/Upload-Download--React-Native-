import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const data = [
    {
        id: 1,
        title: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG11bWJhaXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
    },
    {
        id: 2,
        title: 'Bengalore, India',
        image: 'https://images.unsplash.com/photo-1588416936097-41850ab3d86d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVuZ2FsdXJ1fGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
        id: 3,
        title: 'New York',
        image: 'https://wallpaperaccess.com/full/123362.jpg',
    },
    {
        id: 4,
        title: 'Bucharest',
        image: 'https://images.unsplash.com/photo-1587974136497-289fd6e9c54f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVjaGFyZXN0fGVufDB8fDB8fHww&w=1000&q=80',
    },
    {
        id: 5,
        title: 'Prague',
        image: 'https://images.pexels.com/photos/161077/prague-vencel-square-czech-republic-church-161077.jpeg?cs=srgb&dl=pexels-pixabay-161077.jpg&fm=jpg',
    },
    {
        id: 6,
        title: 'Berlin',
        image: 'https://wallpaperaccess.com/full/1124592.jpg',
    },
    {
        id: 7,
        title: 'Lisbon',
        image: 'https://media.istockphoto.com/id/1483204178/photo/yellow-typical-tram-in-lisbon-portugal.webp?b=1&s=170667a&w=0&k=20&c=I38PbjayJexJwcLhnaJsWUyThW6sNnACeNEoHdF5Yio=',
    }
];

const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
    </View>
);

const Flatlist = () => {
    return (
        <FlatList
            data={data}
            horizontal
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    itemContainer: {
        width: 200,
        height: 200,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 8
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    title: {
        position: 'absolute',
        top: 15,
        left: 15,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default Flatlist;
