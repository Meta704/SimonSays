import {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';

type scoreObject = {
  name: string;
  round: number;
};

const path = RNFS.DocumentDirectoryPath + '/Scoreboard.txt';
const MAX_LIST_LENGTH = 10;

export default function useScoreboard() {
  const [fileContent, setFileContent] = useState<Array<scoreObject>>([]);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      if (!(await RNFS.exists(path))) return createFile();
      readFile();
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * createFile creates a new empty file in path
   */
  const createFile = async () => {
    RNFS.writeFile(path, '').catch(err => {
      console.log(err.message);
    });
  };

  /**
   * readFile synchrozies fileContent state variable with the data that is saved inside the file
   * @returns a new promise object that will be resolved after successful file reading and JSON parsing the data.
   */
  const readFile = async () => {
    return new Promise(async resolve => {
      RNFS.readFile(path)
        .then(content => {
          let scoreArray = content.split('|');
          scoreArray.pop();
          let scoreJSON = scoreArray.map(item => {
            return JSON.parse(item);
          });
          setFileContent(scoreJSON);
          resolve('Done');
        })
        .catch(err => console.log(err.message));
    });
  };

  /**
   * saveScore handles the new round saving flow
   * @param name Player's name
   * @param round Player's round
   */
  const saveScore = async (name: string, round: number) => {
    let playerName = name.replace('|', ''); // Remove possible '|' chars from name
    await readFile(); // Sync fileContent state variable with the saved data in the file
    let newFileContent = sortScoreboardList(playerName, round).slice(
      0,
      MAX_LIST_LENGTH,
    );
    setFileContent(newFileContent);
    let str = '';
    newFileContent.forEach(
      item =>
        (str += JSON.stringify({name: item.name, round: item.round}) + '|'),
    );
    RNFS.writeFile(path, str).catch(err => {
      console.log(err.message);
    });
  };

  /**
   * sortScoreboardList pushes the new round into fileContent array, sorts it and returns the sorted list.
   * @param name Player's name
   * @param round Player's round
   * @returns Sorted list of JSON round objects with the new round added
   */
  const sortScoreboardList = (name: string, round: number) => {
    let tempFileContent = [...fileContent];
    tempFileContent.push({name: name, round: round});
    let arrLength = tempFileContent.length || 0;
    for (let i = 0; i < arrLength - 1; i++) {
      for (let j = i + 1; j < arrLength; j++) {
        if (tempFileContent[j].round > tempFileContent[i].round) {
          let temp = tempFileContent[i];
          tempFileContent[i] = tempFileContent[j];
          tempFileContent[j] = temp;
        }
      }
    }
    return tempFileContent;
  };

  return {saveScore: saveScore, scoreList: fileContent};
}
