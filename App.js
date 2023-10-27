import React, { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Banner from './components/Banner';


const App = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [bannerMessage, setBannerMessage] = useState('');
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    const showBanner = (message) => {
        setBannerMessage(message);
        setIsBannerVisible(true);
    };

    const hideBanner = () => {
        setIsBannerVisible(false);
    };

    const SelectFiles = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf]
            });
            setFiles([...files, ...result]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            return;
        }
        setIsLoading(true);
        try {
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', {
                    uri: file.uri,
                    type: file.type,
                    name: file.name,
                });

                const response = await axios.post('http://192.168.1.16:5000/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            });

            const uploadedFiles = await Promise.all(...uploadPromises);

            showBanner('File Uploaded Successfully');

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    };

    const handleDownload = (fileName) => {
        const downloadDir = RNFS.DownloadDirectoryPath;
        const filePath = `${downloadDir}/${fileName}`;
        const fileUri = `http://192.168.1.16:5000/download/${fileName}`

        RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: filePath,
            },
        })
            .fetch('GET', fileUri)
            .then(res => {

                showBanner('File Downloaded Successfully');
                console.log('Image downloaded to', filePath);
            })
            .catch(error => {
                console.error('Error downloading image:', error);
            });
    };


    const renderFileCard = ({ item }) => {

        const removeFile = () => {
            const updatedFiles = files.filter((file) => file.uri !== item.uri);
            setFiles(updatedFiles);
        };

        const ItemName = item.name.length > 10
            ? item.name.slice(0, 10) + "..."
            : item.name;

        const cardStyle = {
            flex: 1,
            margin: 10,
            height: '45%',
            padding: 10,
            marginVertical: 50,
            borderRadius: 10,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 10,
        };

        const textStyle = {
            fontSize: 13,
            marginBottom: 8,
            marginTop: 5,
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
        };

        const buttonStyle = {
            backgroundColor: 'green',
            padding: 5,
            borderRadius: 5,
        };

        const buttonTextStyle = {
            color: 'white',
            textAlign: 'center',
            fontSize: 14,
            fontWeight: 'bold',
        };

        if (item.type.includes('image')) {
            return (
                <View style={cardStyle}>
                    <Image source={{ uri: item.uri }} style={{ width: 110, height: 120, borderRadius: 10 }} resizeMode='cover' />
                    <Text style={textStyle}>{`${item.name}`}</Text>
                    <TouchableOpacity onPress={() => handleDownload(String(item.name))} style={buttonStyle}>
                        <Text style={buttonTextStyle}>Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={removeFile} style={{ backgroundColor: 'red', marginTop: 10, padding: 5, borderRadius: 5 }}>
                        <Text style={buttonTextStyle}>Remove</Text>
                    </TouchableOpacity>
                    {isLoading && <ActivityIndicator size="large" color="blue" />}
                </View>
            );
        } else if (item.type === 'application/pdf') {
            return (

                <View style={cardStyle}>
                    <Image source={{ uri: 'https://www.iconpacks.net/icons/2/free-pdf-download-icon-2617-thumb.png' }} style={{ width: 110, height: 110, borderRadius: 10 }} />
                    <Text style={textStyle}>{`${ItemName}`}</Text>
                    <TouchableOpacity onPress={() => handleDownload(String(item.name))} style={buttonStyle}>
                        <Text style={buttonTextStyle}>Download</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={removeFile} style={{ backgroundColor: 'red', marginTop: 10, padding: 5, borderRadius: 5 }}>
                        <Text style={buttonTextStyle}>Remove</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgray' }}>
            {isBannerVisible && <Banner message={bannerMessage} onClose={hideBanner} />}

            {files.length > 0 && (
                <FlatList
                    data={files}
                    renderItem={renderFileCard}
                    keyExtractor={(item) => item.uri}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            )}

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Pressable
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? 'gray' : 'maroon',
                            padding: 10,
                            borderRadius: 5,
                            flex: 1,
                            margin: 10,
                        })}
                        onPress={SelectFiles}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                            Select Files
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => ({
                            backgroundColor: pressed ? 'lightblue' : 'blue',
                            padding: 10,
                            borderRadius: 5,
                            flex: 1,
                            margin: 10,
                        })}
                        onPress={handleUpload}
                        disabled={files.length === 0}
                    >
                        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
                            Upload
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default App;
