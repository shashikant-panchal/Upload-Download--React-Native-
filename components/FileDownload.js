import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

const FileDownload = ({ file, showBanner }) => {
  const handleDownload = (fileName) => {
    const downloadDir = RNFS.DownloadDirectoryPath;
    const filePath = `${downloadDir}/${fileName}`;
    const fileUri = `http://192.168.1.6:5000/download/${fileName}`;

    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
      },
    })
      .fetch('GET', fileUri)
      .then((res) => {
        showBanner('File Downloaded Successfully');
        console.log('Image downloaded to', filePath);
      })
      .catch((error) => {
        console.error('Error downloading image:', error);
      });
  };

  const cardStyle = {
    flex: 1,
    margin: 10,
    height: 190,
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

  return (
    <View style={cardStyle}>
      {file.type.includes('image') ? (
        <Image source={{ uri: file.uri }} style={{ width: 110, height: 110, borderRadius: 10 }} />
      ) : null}
      <Text style={textStyle}>{`${file.name}`}</Text>
      <TouchableOpacity onPress={() => handleDownload(String(file.name))} style={buttonStyle}>
        <Text style={buttonTextStyle}>Download</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FileDownload;
