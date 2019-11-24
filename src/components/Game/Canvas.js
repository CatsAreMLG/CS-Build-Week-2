import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis'
import isEquivalent from '../../services/isEquivalent'
import styles from './canvas.styles'
// import visited_room_data from '../../data/visited_room_data.js'
import axios from 'axios'


class Canvas extends Component {
  state = {
		room_data: {},
    dataWithColor: [],
    links: [],
    id: 0
  }
  componentDidMount() {
		// const token = "ce1ca8779e7eeb0c4e7b61e752cbe6d90ccc3aee"
		// axios
		// .get('https://csbuildtwo.herokuapp.com/api/map/',{headers: {Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc0NDAzOTAzLCJqdGkiOiI3ZDY3MTk0NDVlM2I0ODE3YmE5MzQ3Y2MzODNjNGZiZSIsInVzZXJfaWQiOjJ9.lDQfvb712Xpkhe_xaGvZLfiuEtp1dpHO3NXZxYApRos`}} )
		// 	.then(res => {
		// 		const data = res.data[0].data
		// 		// console.log(data.data)
		// 		this.updateMap(data)
		// 	})
		// 	.catch(err => {
		// 		console.log(err)
		// 	})
		this.updateMap()	
  }
  updateMap = _ => {
    let { currentRoom, visited_room_data } = this.props
		// const visited_room_data = this.state.room_data
    // Create arrays to hold point coordinates and links
		// console.log(visited_room_data)
    let coordinates = []
    let links = []
    // Loop through each room in the room_data object
    if (visited_room_data) {
      for (let room in visited_room_data) {
        // Set data equal to the first element (x, y coordinates)
        // in each room of the visited_room_data object
				// let data = visited_room_data[room]
        let data = visited_room_data[room][0]
				// console.log(visited_room_data[room][1])
				// console.log(data.x)
        coordinates.push([data.x, data.y, room])
        for (let adjacentRoom in visited_room_data[room][1]) {
          if (visited_room_data[visited_room_data[room][1][adjacentRoom]])
						// console.log(visited_room_data[room][0])
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
			// console.log(final)
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
            width={400}
            height={400}>
						{this.state.links.map(link => {
							// console.log(link)
						return 	<LineSeries
							strokeWidth="1"
							color="#DDD"
							data={link}
							key={Math.random() * 100}
						/>
						})}
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
