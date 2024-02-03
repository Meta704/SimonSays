import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';

// Set audio category for playback
Sound.setCategory('Playback');

/**
 * Custom React hook for managing audio files using the react-native-sound library.
 * @returns {Array} An array containing sound objects for different audio files.
 */
export default function useAudio() {
  const [sound1, setSound1] = useState<Sound>();
  const [sound2, setSound2] = useState<Sound>();
  const [sound3, setSound3] = useState<Sound>();
  const [sound4, setSound4] = useState<Sound>();
  const [gameOverSound, setGameOverSound] = useState<Sound>();

  useEffect(() => {
    loadSoundFiles();
  }, []);

  // Loads and initializes sound files using the react-native-sound library.
  const loadSoundFiles = () => {
    setSound1(
      new Sound(require('../audio/beep1.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Audio error', error);
          return;
        }
      }),
    );
    setSound2(
      new Sound(require('../audio/beep2.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Audio error', error);
          return;
        }
      }),
    );
    setSound3(
      new Sound(require('../audio/beep3.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Audio error', error);
          return;
        }
      }),
    );
    setSound4(
      new Sound(require('../audio/beep4.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Audio error', error);
          return;
        }
      }),
    );
    setGameOverSound(
      new Sound(require('../audio/gameOver.wav'), Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Audio error', error);
          return;
        }
      }),
    );
  };

  // Return an array containing loaded sound objects
  return [sound1, sound2, sound3, sound4, gameOverSound];
}