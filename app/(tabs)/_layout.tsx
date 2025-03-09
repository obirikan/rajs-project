import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: 'home'
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: 'profile'
        }}
      />
        <Tabs.Screen
        name="(notification)"
        options={{
          title: 'Notification'
        }}
      />
    </Tabs>
  );
}
