/*
  Simon Says Home Task @ Matrix
  Meishar Tal
  Feb/2024
*/

//MODULES
import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, Dimensions, Pressable, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {Provider, useDispatch, useSelector} from 'react-redux';

//INTERNAL
import { styles } from './src/styles';
import {RootState, store} from './src/redux/store';
import {addPress} from './src/redux/sequenceSlice';
import useRandomness from './src/logic/useRandomness';
import Scoreboard from './src/comp/Scoreboard';
import useAudio from './src/logic/useAudio';

//CONSTANTS
const SCREEN_WIDTH = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();

import {LogBox} from 'react-native';
import SimonButton from './src/comp/SimonButton';
LogBox.ignoreLogs([
  'Non-serializable values',
]);


//---------------------------------------------------------

// Navigation Container
const AppContainer = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#111111' },
          headerTitleAlign: 'center',
          headerTintColor: '#ffffff',
        }}>
        <Stack.Screen
          name="Simon Says"
          component={App}
          options={{
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

// RootStackParamList type definition for React Navigation
type RootStackParamList = {
  Home: undefined;
  Scoreboard: {
    round: number;
    startGame: () => void;
  };
};

// Default props for the App component
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

// App component
const App = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const [pressedButtonID, setPressedButtonID] = useState<number>();
  const { isGameRunning, round, nextRound, startGame, isRoundInProgress } = useRandomness();
  const sound = useAudio();
  const currentColor = useSelector((state: RootState) => state.gameSequence.currentColor);
  const isVisiblePlayerNameModal = useSelector((state: RootState) => state.nameModal.showNameModal);

  // useEffect for handling navigation to Scoreboard when the player name modal is visible
  useEffect(() => {
    if (isVisiblePlayerNameModal) {
      const navigateToScoreboard = async () => {
        navigation.navigate('Scoreboard', { round, startGame });
      };
      sound[4]?.play();
      navigateToScoreboard();
    }
  }, [isVisiblePlayerNameModal, navigation, round, startGame, sound]);

  // handleClick function for handling button clicks during the game
  const handleClick = (number: number) => !isRoundInProgress && isGameRunning && dispatch(addPress(number));

  // handlePressIn function for handling button press events during the game
  const handlePressIn = (colorId: number) => {
    if (!isRoundInProgress && isGameRunning) {
      sound[colorId - 1]?.play();
      setPressedButtonID(colorId);
    }
  };

  /**
   * Renders a Simon Button component with specified styles and behavior.
   *
   * @param {number} colorId - Identifier for the button color.
   * @param {string} colorStringIn - Color when pressed.
   * @param {string} colorStringOut - Color when released.
   * @param {number} borderTopLeftRadius - Border top-left radius.
   * @param {number} borderTopRightRadius - Border top-right radius.
   * @param {number} borderBottomRightRadius - Border bottom-right radius.
   * @param {number} borderBottomLeftRadius - Border bottom-left radius.
   * @returns {JSX.Element} - SimonButton component.
   */
  const RenderSimonButton = (
    colorId: number,
    colorStringIn: string,
    colorStringOut: string,
    borderTopLeftRadius: number,
    borderTopRightRadius: number,
    borderBottomRightRadius: number,
    borderBottomLeftRadius: number,
  ) => (
    <SimonButton
      colorId={colorId}
      colorStringIn={colorStringIn}
      colorStringOut={colorStringOut}
      borderTopLeftRadius={borderTopLeftRadius}
      borderTopRightRadius={borderTopRightRadius}
      borderBottomRightRadius={borderBottomRightRadius}
      borderBottomLeftRadius={borderBottomLeftRadius}
      onPress={handleClick}
      onPressIn={handlePressIn}
      onPressOut={() => setPressedButtonID(-1)}
      currentColor={currentColor}
      pressedButtonID={pressedButtonID}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ImageBackground source={require('./src/wallpaper.jpg')}
          style={styles.backgroundImage}
          resizeMode="repeat">

          <View style={styles.colorContainer}>

            {/* Center circle UI */}
            <View style={styles.circle}>
              {!isGameRunning ? (
                <View style={styles.startButtonContainer}>
                  <Pressable onPress={startGame} style={styles.startButton}>
                    <Text style={styles.startButtonText}>PLAY</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.scoreContainer}>
                  <Text style={styles.roundLabel}>Round</Text>
                  <Text style={styles.roundNumber}>{round + 1}</Text>
                </View>
              )}
            </View>

            {/* Game buttons UI */}
            <View style={styles.colorRow}>
              {RenderSimonButton(1, 'rgb(225,225,0)', 'rgb(140,140,0)', SCREEN_WIDTH / 2, 0, 0, 0)}
              {RenderSimonButton(2, 'rgb(0,0,225)', 'rgb(0,0,120)', 0, SCREEN_WIDTH / 2, 0, 0)}
            </View>
            <View style={styles.colorRow}>
              {RenderSimonButton(3, 'rgb(225,0,0)', 'rgb(120,0,0)', 0, 0, 0, SCREEN_WIDTH / 2)}
              {RenderSimonButton(4, 'rgb(0,225,0)', 'rgb(0,120,0)', 0, 0, SCREEN_WIDTH / 2, 0)}
            </View>

          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export type { RootStackParamList };
export default AppContainer;