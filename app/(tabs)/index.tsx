import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, View, Text, ActivityIndicator } from 'react-native';

const VideoUploadScreen = () => {
  const [uploading, setUploading] = useState(false);
  const [_, setProgress] = useState(0);

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      uploadVideo(result.assets[0].uri);
    }
  };

  const uploadVideo = async (uri) => {
    setUploading(true);
    setProgress(0);
    
    const formData = new FormData();
    const fileType = uri.split('.').pop();
    
    formData.append('video', {
      uri,
      name: `video.${fileType}`,
      type: `video/${fileType}`
    });

    try {
      const response = await fetch('', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = await response.json();
      console.log('Video uploaded with ID:', data.videoId);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {uploading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Processing video... This may take a few minutes</Text>
        </>
      ) : (
        <Button title="Pick a video to upload" onPress={pickVideo} />
      )}
    </View>
  );
};

export default VideoUploadScreen;