import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const styles = StyleSheet.create({

  // App.tsx
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#102030',
  },
  backgroundImage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#102030',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  roundLabel: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '400',
    color: '#000000',
  },
  roundNumber: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '600',
  },
  startButtonContainer: {
    position: 'absolute',
    top: '2%',
    right: '2%',
    bottom: '2%',
    left: '2%',
    borderRadius: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
    backgroundColor: '#111111',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    top: '30%',
    right: '30%',
    bottom: '30%',
    left: '30%',
    borderRadius: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  startButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  scoreContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    overflow: 'hidden',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  colorContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorRow: {
    display: 'flex',
    flexDirection: 'row',
    height: SCREEN_WIDTH / 2,
  },

  // ScoreInputModal.tsx
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitleText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#000000',
    fontSize: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#808080',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#000000',
  },
  invalidInput: {
    borderColor: '#FF0000',
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#009e1b',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#808080',
  },

  // Scoreboard.tsx
  scoreboardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
  },
  column: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  leftAlignedText: {
    fontSize: 20,
    textAlign: 'left',
    marginVertical: 8,
    color: 'black',
  },
  rightAlignedText: {
    fontSize: 20,
    textAlign: 'right',
    marginVertical: 8,
    color: 'black',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    marginBottom: 5,
  },
  startBtn: {
    backgroundColor: '#009e1b',
    width: '100%',
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },

});

export default styles;
