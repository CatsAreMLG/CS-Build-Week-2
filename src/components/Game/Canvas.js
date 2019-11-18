import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis'
import isEquivalent from '../../services/isEquivalent'
import styles from './canvas.styles'
// import visited_room_data from '../../data/visited_room_data.js'

class Canvas extends Component {
  state = {
    dataWithColor: [],
    links: [],
    id: 0
  }
  componentDidMount() {
    this.updateMap()
  }
  updateMap = _ => {
    let { currentRoom, visited_room_data } = this.props
    // Create arrays to hold point coordinates and links
    let coordinates = []
    let links = []
    // Loop through each room in the room_data object
    if (visited_room_data) {
      for (let room in visited_room_data) {
        // Set data equal to the first element (x, y coordinates)
        // in each room of the visited_room_data object
        let data = visited_room_data[room][0]
        coordinates.push([data.x, data.y, room])
        for (let adjacentRoom in visited_room_data[room][1]) {
          if (visited_room_data[visited_room_data[room][1][adjacentRoom]])
            links.push([
              visited_room_data[room][0],
              visited_room_data[visited_room_data[room][1][adjacentRoom]][0]
            ])
        }
      }
    }
    const dataWithColor = coordinates.map(d => {
      let final = {
        x: d[0],
        y: d[1],
        color: d[2] == currentRoom ? '#00FF11' : '#DDD'
      }
      // if (visited_room_data[i] && visited_room_data[i][5].visited === true) {
      //   final.color = '#F77'
      // }
      return final
    })
    this.setState({ dataWithColor, links, id: currentRoom })
  }
  render() {
    const { classes } = this.props
    return (
      <>
        <div className={classes.canvas}>
          <FlexibleXYPlot
            xDomain={[2.5, 10]}
            yDomain={[2.5, 10]}
            width={200}
            height={200}>
            {this.state.links.map(link => (
              <LineSeries
                strokeWidth="1"
                color="#DDD"
                data={link}
                key={Math.random() * 100}
              />
            ))}
            <MarkSeries
              strokeWidth={2}
              opacity="1"
              size="2"
              colorType="literal"
              data={this.state.dataWithColor}
            />
          </FlexibleXYPlot>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Canvas)
