import React from 'react'
import { Typography, withStyles } from '@material-ui/core'
import { SkewLoader } from 'react-spinners'
import styles from './loading.styles'

function Loading({ classes, loading }) {
  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h2">
        Treasure Hunt
      </Typography>
      <div className={classes.loader}>
        <SkewLoader
          sizeUnit={'px'}
          size={50}
          color={'#00FF11'}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(Loading)
