import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
  Typography
} from '@material-ui/core'
import {Login} from "../Login/login.js"
import Canvas from './Canvas'
// import TakeItems from './TakeItems/TakeItems'
// import DropItems from './DropItems/DropItems'
import Loading from '../Loading/Loading'
// import visited_room_data from '../../data/visited_room_data'
import styles from './game.styles'
import background from './background.png'
import top from './top.png'
import right from './right.png'
import bottom from './bottom.png'
import left from './left.png'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
  }
  state = {
    currentRoom: null,
    title: '',
    description: '',
    exits: [],
    items: [],
    inventory: [],
    players: [],
    name: '...',
    open: false,
    openDrop: false,
    selectedItem: null,
    loading: true,
		visited_room_data: null,
		loggedIn: false,
		travelRoom: null,
		mineRoom: null,
  }

	handleLoginCall = () => {
		this.setState({loggedIn: true})
	}

  componentDidMount() {
		// const token = "ce1ca8779e7eeb0c4e7b61e752cbe6d90ccc3aee"
		const key = window.localStorage.getItem('JWT')
		axios
		.get('https://csbuildtwo.herokuapp.com/api/map/',{headers: {Authorization: `Bearer ${key}`}} )
			.then(res => {
				const data = res.data[0].data
				const newState = {...this.state, loggedIn: true, visited_room_data: res.data[0].data}
				this.setState(newState)
			})
			.catch(err => {
				this.setState({loggedIn: false})
				console.log(err)
			})
    this.init()
  }

	signout = () => {
		window.localStorage.clear()
		this.setState({loggedIn: false})
	}

	decodeWell = () => {
		const backkey = window.localStorage.getItem('Token')
		const key = window.localStorage.getItem('JWT')
		const headers = {
			'backkey': backkey,
			'Authorization': `Bearer ${key}`, 
		}

		axios
		.get('https://csbuildtwo.herokuapp.com/api/decode/',{headers: headers})
			.then(res => {
				const data = res.data
				console.log(data)
				this.setState({mineRoom: data[0].message})
				// this.setState({visited_room_data: res.data[0].data})
			})
			.catch(err => {
				console.log(err)
			})

	}

	mineCoin = () => {
		const backkey = window.localStorage.getItem('Token')
		const key = window.localStorage.getItem('JWT')
		const headers = {
			'backkey': backkey,
			'Authorization': `Bearer ${key}`, 
		}

		axios
		.get('https://csbuildtwo.herokuapp.com/api/mine/',{headers: headers})
			.then(res => {
				const data = res.data
				console.log(res)
				// this.setState({mineRoom: data[0].message})
				// this.setState({visited_room_data: res.data[0].data})
			})
			.catch(err => {
				console.log(err.response)
			})

	}

	travWishingWell = () => {
		const backkey = window.localStorage.getItem('Token')
		const key = window.localStorage.getItem('JWT')
		const headers = {
			'backkey': backkey,
			'Authorization': `Bearer ${key}`, 
		}

		axios
		.get('https://csbuildtwo.herokuapp.com/api/wishingwell/',{headers: headers})
			.then(res => {
				const data = res.data
				console.log(data)
				this.returnFunc(55)
				// this.setState({visited_room_data: res.data[0].data})
			})
			.catch(err => {
				console.log(err)
			})
	}

	travToDest = () => {
		const id = this.state.travelRoom
		const backkey = window.localStorage.getItem('Token')
		const key = window.localStorage.getItem('JWT')
		const headers = {
			'backkey': backkey,
			'Authorization': `Bearer ${key}`, 
			'destination': this.state.travelRoom
		}

		axios
		.get('https://csbuildtwo.herokuapp.com/api/travelto/',{headers: headers})
			.then(res => {
				const data = res.data
				console.log(data)
				this.returnFunc(id)
				// this.setState({visited_room_data: res.data[0].data})
			})
			.catch(err => {
				console.log(err.response)
			})
	}

	returnFunc = (dest) => {
		const cooldown = setTimeout(_ => {
			this.getRoom()
			if(Number(this.state.currentRoom) !== Number(dest)) {
				console.log(this.state.currentRoom)
				this.returnFunc(dest)
			} else {
				this.init()
			}
		}, 7560)
	}

	getRoom = () => {
		const backkey = window.localStorage.getItem('Token')
		const key = window.localStorage.getItem('JWT')
		const headers = {
			'backkey': backkey,
			'Authorization': `Bearer ${key}`, 
		}
		axios
		.get('https://csbuildtwo.herokuapp.com/api/status/',{headers: headers})
			.then(res => {
				const data = Number(res.data[0].current_room)
				console.log(data)
				this.setState({currentRoom: data})
				// this.setState({visited_room_data: res.data[0].data})
        if (this.child.current) this.child.current.updateMap()
			})
			.catch(err => {
				console.log(err)
			})
		
	}

  init = _ => {
		const Token = window.localStorage.getItem('Token')
		console.log(Token)
    axios
      .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init', {
        headers: {
          Authorization: `Token ${Token}`
        }
      })
      .then(res => {
        setTimeout(
          _ =>
            this.setState({
              currentRoom: res.data.room_id,
              title: res.data.title,
              description: res.data.description,
              exits: res.data.exits,
              items: res.data.items || [],
              players: res.data.players,
              name: res.data.name,
              loading: false
            }),
         10 
        )

        if (this.child.current) this.child.current.updateMap()
      })
      .catch(err => {
				const state = this.state
				console.log(err)
      })
  }
  setOpen = open => {
    this.setState({ open })
  }
  setOpenDrop = openDrop => {
    this.setState({ openDrop })
  }
  setItem = item => {
    this.setState({ selectedItem: item })
  }
  handleClickOpen = () => {
    this.setOpen(true)
  }
  handleClickOpenDrop = () => {
    this.setOpenDrop(true)
  }
  handleClose = _ => {
    this.setOpen(false)
  }
  handleCloseDrop = _ => {
    this.setOpenDrop(false)
  }
  onTakeDrop = items => {
    this.setState({ inventory: items, selectedItem: null })
    this.init()
  }
  handleMove = e => {
		console.log(e.target.name)
    axios
      .post(
        'https://lambda-treasure-hunt.herokuapp.com/api/adv/move',
        { direction: e.target.name },
        {
          headers: {
            Authorization: `Token ${window.localStorage.getItem('Token')}`
          }
        }
      )
      .then(res => {
        console.log(res.data)
        this.setState({
          currentRoom: res.data.room_id,
          title: res.data.title,
          description: res.data.description,
          coordinates: res.data.coordinates,
          elevation: res.data.elevation,
          terrain: res.data.terrain,
          exits: res.data.exits,
          items: res.data.items || [],
          players: res.data.players,
          cooldown: res.data.cooldown,
          messages: res.data.messages,
          errors: res.data.errors
        })
        this.child.current.updateMap()
      })
    // .catch(err => console.log(err))
  }
  render() {
    const { classes } = this.props
    if (this.state.loading && this.state.loggedIn) return <Loading loading={this.state.loading} />
		else if (this.state.loggedIn) 
      return (
        <div className={classes.container}>
          {/* <TakeItems */}
          {/*   onTake={this.onTakeDrop} */}
          {/*   items={this.state.items} */}
          {/*   open={this.state.open} */}
          {/*   onClose={this.handleClose} */}
          {/*   setValue={this.setItem} */}
          {/*   value={this.state.selectedItem} */}
          {/* /> */}
          {/* <DropItems */}
          {/*   onDrop={this.onTakeDrop} */}
          {/*   items={this.state.inventory} */}
          {/*   open={this.state.openDrop} */}
          {/*   onClose={this.handleCloseDrop} */}
          {/*   setValue={this.setItem} */}
          {/*   value={this.state.selectedItem} */}
          {/* /> */}
          <div className={classes.topBar}>
            {this.state.name}
            <Button onClick={this.signout}>Sign Out</Button>
          </div>
          <div className={classes.gameContainer}>

            <div className={classes.game}>
              <img
                className={classes.background}
                src={background}
                alt="dungeon background"
              />
              {this.state.exits.includes('s') ? (
                <img
                  className={classes.top}
                  name="s"
                  src={top}
                  onClick={this.handleMove}
                  alt="north door"
                />
              ) : null}
              {this.state.exits.includes('e') ? (
                <img
                  className={classes.right}
                  name="e"
                  src={right}
                  onClick={this.handleMove}
                  alt="east door"
                />
              ) : null}
              {this.state.exits.includes('n') ? (
                <img
                  className={classes.bottom}
                  name="n"
                  src={bottom}
                  onClick={this.handleMove}
                  alt="south door"
                />
              ) : null}
              {this.state.exits.includes('w') ? (
                <img
                  className={classes.left}
                  name="w"
                  src={left}
                  onClick={this.handleMove}
                  alt="west door"
                />
              ) : null}
            </div>

            <Canvas
              ref={this.child}
              currentRoom={this.state.currentRoom}
							visited_room_data={this.state.visited_room_data}></Canvas>
          </div>
          <div className={classes.bottomBar}>
            <div className={classes.room}>
              <Typography variant="h4">{this.state.title}</Typography>
              <Typography variant="subtitle1">
                {this.state.description}
              </Typography>
            </div>

            <div className={classes.listContainer}>
              <div>Items in Room:</div>
              <List className={classes.lists} dense>
                {this.state.items.map((item, i) => (
                  <ListItem key={('item-', i)}>
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className={classes.listContainer}>
              <div>Other Players in Room:</div>
              <List className={classes.lists} dense>
                {this.state.players.map((name, i) => (
                  <ListItem key={('player-', i)}>
                    <ListItemText primary={name} />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className={classes.listContainer}>
              <div>Inventory:</div>
              <List className={classes.lists} dense>
                {this.state.inventory.map((item, i) => (
                  <ListItem key={('inventory-', i)}>
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
						<div className="test">
            <ButtonGroup
              className={classes.buttons}
              aria-label="large outlined button group">
              {/* <Button onClick={this.handleClickOpen}>Take</Button> */}
              {/* <Button onClick={this.handleClickOpenDrop}>Drop</Button> */}
							<Button onClick={this.travWishingWell}>WishingWell</Button>
							<Button onClick={this.decodeWell}>Decode Well</Button>
            </ButtonGroup>
						<ButtonGroup>
              aria-label="large outlined button group">
							className={classes.buttons}
							<Button onClick={this.mineCoin}>Mine</Button>
							<Button onClick={this.travToDest}>Travel To Room</Button>
							<input type="text" onChange={(e) => {
								const	value = e.target.value
								this.setState({travelRoom: value})
							}}/>
						</ButtonGroup>
						{this.state.mineRoom ? 
						<div>
							Room to Mine: {this.state.mineRoom}
						</div>
						: <div></div>
							}
					</div>
          </div>
        </div>
      )
		else return <Login handleLogin={this.handleLoginCall}/>
  }
}

export default withStyles(styles)(Game)
