import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

const Banner = ({ message, onClose }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }).start(() => {
                onClose();
            });
        }, 1500);
    }, [fadeAnim, onClose]);

    return (
        <Animated.View style={{ ...styles.banner, opacity: fadeAnim }}>
            <Text style={styles.bannerText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'green', // You can style the banner as you like
        alignItems: 'center',
        padding: 10,
    },
    bannerText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Banner;
