const styles = ({ spacing }) => ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'spaceBetween',
    alignItems: 'center'
  },
  gameContainer: {
    display: 'flex',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw',
    background: 'black',
    color: '#00FF11',
    padding: spacing(2)
  },
  bottomBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    minHeight: 150,
    background: 'black',
    color: '#00FF11',
    padding: spacing(2)
  },
  listContainer: {
    height: '100%',
    marginRight: spacing(2)
  },
  lists: {
    width: 100,
    maxHeight: 100,
    overflow: 'auto',
    padding: 0,
    margin: 0,
    background: 'rgba(255,255,255,0.05)',
    '&::-webkit-scrollbar': {
      width: 10
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#666'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#333'
    }
  },
  buttons: {
    marginRight: spacing(2)
  },
  game: {
    position: 'relative',
    background: 'black',
		// left: '-200px',
    width: '700px', 
  },
  background: {
    width: '100%'
  },
  top: {
    position: 'absolute',
    top: 0,
    right: '50%',
    width: 140,
    transform: 'translate(50%, 0)',
    cursor: 'pointer'
  },
  bottom: {
    position: 'absolute',
    bottom: 4,
    right: '50%',
    width: 140,
    transform: 'translate(50%, 0)',
    cursor: 'pointer'
  },
  right: {
    position: 'absolute',
    right: 0,
    top: '50%',
    height: 140,
    transform: 'translate(0, -50%)',
    cursor: 'pointer'
  },
  left: {
    position: 'absolute',
    left: 0,
    top: '50%',
    height: 140,
    transform: 'translate(0, -50%)',
    cursor: 'pointer'
  },
  room: {
    marginRight: spacing(2)
  }
})
export default styles
