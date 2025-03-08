import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Dimensions, 
  ActivityIndicator,
  Text
} from 'react-native';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const VideoFeed = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playbackStatus, setPlaybackStatus] = useState({});
  
  const videoRefs = useRef({});
  
  useEffect(() => {
    fetchVideos();
  }, []);
  
  const fetchVideos = async () => {
    try {
      const response = await fetch('YOUR_API_URL/api/videos/preload');
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      
      Object.keys(videoRefs.current).forEach(key => {
        if (videoRefs.current[key] && key != index) {
          videoRefs.current[key].pauseAsync();
        }
      });
      
      if (videoRefs.current[index]) {
        videoRefs.current[index].playAsync();
      }
      
      setCurrentIndex(index);
    }
  }).current;

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };
  
  const getQualityForBandwidth = () => {
    return '720p';
  };
  
  const renderItem = ({ item, index }) => {
    const quality = getQualityForBandwidth();
    const videoUrl = item.mediaUrls[quality];
    
    return (
      <View style={styles.videoContainer}>
        <Video
          ref={ref => { videoRefs.current[index] = ref; }}
          source={{ uri: videoUrl }}
          style={styles.video}
          shouldPlay={index === currentIndex}
          isLooping
          posterSource={{ uri: item.thumbnailUrl }}
          usePoster={true}
          posterStyle={styles.poster}
          onPlaybackStatusUpdate={status => {
            if (index === currentIndex) {
              setPlaybackStatus(status);
            }
          }}
        />
        
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>Video #{item.id}</Text>
        </View>
        
        {index === currentIndex && 
         playbackStatus.isBuffering && 
         <View style={styles.bufferingContainer}>
           <ActivityIndicator size="large" color="#ffffff" />
         </View>
        }
      </View>
    );
  };
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width,
    height,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bufferingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  videoInfo: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
  },
  videoTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
});

export default VideoFeed;