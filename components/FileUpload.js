import React from 'react';
import { View, Text, Pressable } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const FileUpload = ({ files, setFiles, showBanner, setIsLoading }) => {
  const SelectFiles = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      console.log(result);
      setFiles(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Handle cancelation if needed
      } else {
        throw err;
      }
    }
  };

  const handleUploadToServer = async () => {
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
        console.log('formData', formData);

        const response = await axios.post('http://192.168.1.6:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('response', response);
        return response.data;
      });

      const uploadedFiles = await Promise.all(uploadPromises);

      showBanner('File Uploaded Successfully');

      setIsLoading(false);
      console.log(uploadedFiles);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <View>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'lightblue' : 'blue',
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
        onPress={handleUploadToServer}
        disabled={files.length === 0}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>
          Upload
        </Text>
      </Pressable>
    </View>
  );
};

export default FileUpload;
