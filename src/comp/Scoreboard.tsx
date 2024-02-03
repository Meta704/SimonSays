// IMPORTS
import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// INTERNAL
import {styles} from '../styles';
import ScoreInputModal from './ScoreInputModal';
import useScoreboard from '../logic/useScoreboard';
import { RootStackParamList } from '../../App';

// Define the navigation props for the component
type Props = NativeStackScreenProps<RootStackParamList, 'Scoreboard'>;

// Main Scoreboard component
const Scoreboard = ({ route, navigation }: Props) => {
  const { round } = route.params;
  const { saveScore, scoreList } = useScoreboard();

  return (
    <View style={styles.scoreboardContainer}>
      {/* Modal for entering scores */}
      <ScoreInputModal saveScore={saveScore} score={round} />
      {/* Title of the scoreboard */}
      <Text style={styles.title}>Device Scoreboard</Text>
      {/* Table displaying player names and scores */}
      <View style={styles.tableContainer}>
        <View style={styles.column}>
          {scoreList.map((player, playerKey) => (
            <View key={playerKey}>
              <Text style={styles.leftAlignedText}>
                {player.name || 'Player'}
              </Text>
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </View>
        {/* Column for player scores */}
        <View style={styles.column}>
          {scoreList.map((player, playerKey) => (
            <View key={playerKey}>
              <Text style={styles.rightAlignedText}>{player.round}</Text>
              <View style={styles.horizontalLine} />
            </View>
          ))}
        </View>
      </View>

      {/* Retry button to navigate back */}
      <Pressable style={styles.startBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Retry</Text>
      </Pressable>
    </View>
  );
};

export default Scoreboard;
