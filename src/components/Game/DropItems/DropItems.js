import React from 'react'
import axios from 'axios'
import { withStyles, Button } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import styles from './dropitems.styles.js'

const DropItems = props => {
  const { onDrop, onClose, open, items, classes, setValue, value } = props

  const handleChange = event => {
    setValue(event.target.value)
  }

  const handleClose = () => {
    onClose()
  }

  const handleSubmit = _ => {
    axios
      .post(
        'https://lambda-treasure-hunt.herokuapp.com/api/drop',
        {
          item: value
        },
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('Token')}`
          }
        }
      )
      .then(res => {
        onDrop(res.data.items)
        onClose()
      })
    // .catch(err => console.log(err))
  }

  return (
    <Dialog
      PaperProps={{ className: classes.dialogPaper }}
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Drop an item
      </DialogTitle>
      <RadioGroup
        className={classes.group}
        aria-label="items"
        name="items"
        value={value}
        onChange={handleChange}>
        {items.map((item, i) => {
          return (
            <FormControlLabel
              key={('choice-', i)}
              className={classes.label}
              value={item.id.toString()}
              control={<Radio color="primary" />}
              label={item.name}
              labelPlacement="start"
            />
          )
        })}
      </RadioGroup>
      <Button onClick={handleSubmit}>Drop Item</Button>
    </Dialog>
  )
}
export default withStyles(styles)(DropItems)
