import React, { Suspense, Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { lightTheme, darkTheme } from './styles/maintheme'
import { Game } from './services/lazyImporter'
import Loading from './components/Loading/Loading'

class App extends Component {
  state = {
    theme: 0,
    loading: false
  }
  handleTheme = _ => {
    window.localStorage.setItem('theme', `${!this.state.theme}`)
    this.setState(prevState => ({ theme: !prevState.theme }))
  }
  componentDidMount() {
    window.localStorage.setItem(
      'Token',
      '3020ec15cdc20994c7635062281a83bff692ffa5'
    )
    const token = window.localStorage.getItem('Token')
    if (!window.localStorage.getItem('map')) {
      axios
        .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        .then(res => {
          const room = res.data.room
          window.localStorage.setItem(
            'map',
            JSON.stringify({
              '1': [
                { x: room.coordinates[0], y: room.coordinates[1] },
                { ...room.exits },
                { room: room.title },
                { room: room.description },
                { items: room.items },
                { visited: true }
              ]
            })
          )
        })
    }
    this.setState({
      theme: window.localStorage.getItem('theme') === 'true' ? 1 : 0
    })
  }
  render() {
    return (
      <MuiThemeProvider theme={this.state.theme ? lightTheme : darkTheme}>
        <Suspense fallback={loading => <Loading loading={loading} />}>
          <Switch>
            <Route exact path="/" component={Game} />
          </Switch>
        </Suspense>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(App)
