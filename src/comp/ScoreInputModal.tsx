// IMPORTS
import React, { useState } from 'react';
import { Text, View, Modal, Pressable, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// INTERNAL
import { styles } from '../styles';
import { RootState } from '../redux/store';
import { hideNameModal } from '../redux/nameModalSlice';

// Define the props for ScoreInputModal
type Props = {
  saveScore: (name: string, score: number) => Promise<void>;
  score: number;
};

// ScoreInputModal component for entering player name
const ScoreInputModal = ({ saveScore, score }: Props) => {
  const dispatch = useDispatch();
  const [playerName, setPlayerName] = useState('');

  // Handler to hide modal, save player name and score
  const handlehideNameModal = () => {
    saveScore(playerName, score);
    dispatch(hideNameModal());
  };

  // Check if modal should be visible based on Redux state
  const resultsModalVisible = useSelector(
    (state: RootState) => state.nameModal.showNameModal
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={resultsModalVisible}
      onRequestClose={() => {
        dispatch(hideNameModal());
      }} >

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitleText}>GAME OVER</Text>
          <Text style={styles.modalText}>Enter your name for the scoreboard:</Text>
          
          {/* Input field for player name */}
          <TextInput
            style={styles.input}
            placeholder="Example: Player Playerson"
            onChangeText={setPlayerName}
            defaultValue={playerName} />
          
          {/* Continue button */}
          <Pressable
            style={styles.button}
            onPress={handlehideNameModal} >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ScoreInputModal;