import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { showNameModal } from '../redux/nameModalSlice';
import { sequenceReset } from '../redux/sequenceSlice';
import { updateColor } from '../redux/gameMechanismSlice';
import useAudio from './useAudio';

// Type for the props returned by the useGameEngine hook
type GameControlProps = {
  round: number;
  isGameRunning: boolean;
  isRoundInProgress: boolean;
  nextRound: () => void;
  startGame: () => void;
};

// The main custom hook for managing the Simon game logic
const useGameEngine = (): GameControlProps => {
  // State variables
  const [sequencePath, setSequencePath] = useState<number[]>([]);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [isRoundInProgress, setIsRoundInProgress] = useState(false);

  // Other variables and references
  const currentRound = sequencePath.length - 1;
  const didMount = useRef(true);
  const sound = useAudio();
  const dispatch = useDispatch();

  // Selected user sequence from the Redux store
  const chosenPath = useSelector(
    (state: RootState) => state.userSequence.sequence
  );

  // Effect to check the chosen path and proceed to the next round if correct
  useEffect(() => {
    if (chosenPath.length > 0) {
      const sequenceIsCorrect = checkPath(chosenPath);
      sequenceIsCorrect === true && chosenPath.length === sequencePath.length && nextRound();
    }
  }, [chosenPath]);

  // Effect to start the game on mount
  useEffect(() => {
    if (didMount.current) nextRound();
    didMount.current = false;
  }, [didMount.current]);

  // Effect for game progression (animation and sound)
  useEffect(() => {
    progression();
  }, [sequencePath, isGameRunning]);

  // Function to handle the progression of the game (animation and sound)
  const progression = async () => {
    if (isGameRunning) {
      setIsRoundInProgress(true);
      await animateSimon();
      setIsRoundInProgress(false);
    }
  };

  // Function to proceed to the next round
  const nextRound = async () => {
    dispatch(sequenceReset());
    const nextElement = Math.floor(Math.random() * 4) + 1;
    setSequencePath((prevSequence) => [...prevSequence, nextElement]);
  };

  // Function to start the game
  const startGame = () => {
    setSequencePath([]);
    didMount.current = true;
    setIsGameRunning(true);
  };

  // Function to finish the game and show the name modal
  const finishGame = () => {
    setIsGameRunning(false);
    dispatch(showNameModal());
  };

  // Function to check if the user's sequence matches the game's sequence
  const checkPath = (userSequence: number[]): boolean => {
    let sequenceIsCorrect = false;
    if (sequencePath.length > 0) {
      sequencePath.forEach((element, idx) => {
        if (element !== userSequence[idx] && userSequence[idx] !== undefined) {
          return finishGame();
        }
        sequenceIsCorrect = true;
      });
    } else {
      sequenceIsCorrect = false;
    }
    return sequenceIsCorrect;
  };

  // Function to animate Simon's sequence with delays and sound
  const animateSimon = async (): Promise<void> => {
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
    await delay(400);

    for (let i = 0; i < sequencePath.length; i++) {
      dispatch(updateColor(-1));
      await delay(300);

      dispatch(updateColor(sequencePath[i]));
      sound[sequencePath[i] - 1]?.play();
      await delay(300);
    }

    dispatch(updateColor(-1));
  };

  // Return the relevant state and functions
  return { isGameRunning, round: currentRound, nextRound, startGame, isRoundInProgress };
};

export default useGameEngine;
