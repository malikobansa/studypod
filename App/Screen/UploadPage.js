import React, { useState } from 'react';
import { View, Button, Text, Image, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function UploadPage() {
  const [document, setDocument] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Accept any type of files
        copyToCacheDirectory: true, // Copies the file to the cache directory
      });

      if (result.type === 'success') {
        setDocument(result);
      } else {
        Alert.alert("No document selected");
      }
    } catch (error) {
      Alert.alert("An error occurred while picking the document");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick a document" onPress={pickDocument} />

      {document && (
        <>
          <Text>Chosen document:</Text>
          <Text>Name: {document.name}</Text>
          <Text>Size: {document.size} bytes</Text>
          <Text>URI: {document.uri}</Text>

          {/* Display the chosen document if it is an image */}
          {document.name.endsWith('.png') || document.name.endsWith('.jpg') ? (
            <Image source={{ uri: document.uri }} style={{ width: 100, height: 100 }} />
          ) : (
            <Text>This file is not an image and cannot be displayed.</Text>
          )}
        </>
      )}
    </View>
  );
}
