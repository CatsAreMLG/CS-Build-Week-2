const styles = ({ spacing }) => ({
  container: {
    width: '100vw',
    height: '100vh'
  },
  title: {
    display: 'block',
    position: 'absolute',
    width: '100%',
    top: '30%',
    textAlign: 'center',
    transform: 'translateY(-50%)',
    fontFamily: "'Source Code Pro', monospace",
    color: '#00FF11'
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  }
})
export default styles
