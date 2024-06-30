import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TrackPlayer, { Capability, Event, useTrackPlayerEvents, State } from 'react-native-track-player';

const track = {
  id: '1',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  title: 'SoundHelix Song 1',
  artist: 'SoundHelix',
};

const AudioPlayer = () => {
  const [playerState, setPlayerState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
          stopWithApp: true,
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.Stop,
          ],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });
        await TrackPlayer.add([track]);
      } catch (e) {
        setError(e);
      }
    };

    setupPlayer();

    return () => {
      TrackPlayer.destroy().catch(err => console.error('Error during TrackPlayer destroy', err));
    };
  }, []);

  useTrackPlayerEvents([Event.PlaybackState, Event.Error], event => {
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
    } else if (event.type === Event.Error) {
      setError(event.error);
    }
  });

  const playPauseToggle = async () => {
    try {
      const currentState = await TrackPlayer.getState();
      if (currentState === State.Playing) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
    } catch (e) {
      setError(e);
    }
  };

  const stopPlayer = async () => {
    try {
      await TrackPlayer.stop();
    } catch (e) {
      setError(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* {error && <Text style={styles.errorText}>Error: {error.message}</Text>} */}
      <Text style={styles.title}>{track.title}</Text>
      <Text style={styles.artist}>{track.artist}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={playPauseToggle}
          accessibilityLabel={playerState === State.Playing ? 'Pause playback' : 'Play playback'}
        >
          <Text style={styles.buttonText}>
            {playerState === State.Playing ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={stopPlayer}
          accessibilityLabel="Stop playback"
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  artist: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default AudioPlayer;
