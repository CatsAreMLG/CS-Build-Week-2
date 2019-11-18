const styles = ({ spacing, breakpoints, palette }) => ({
  dialogPaper: {
    padding: spacing(1, 1, 1, 2),
    overflow: 'hidden'
  },
  title: {
    padding: spacing(1)
  },
  label: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
  }
})
export default styles
