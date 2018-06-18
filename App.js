import React from 'react'
import { ScrollView } from 'react-native'
import { connect, Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { addNavigationHelpers, DrawerItems, DrawerNavigator, SafeAreaView } from 'react-navigation'
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers'

import FirstScreen from './screens/FirstScreen'
import SecondScreen from './screens/SecondScreen'
import ThirdScreen from './screens/ThirdScreen'
import { decrement, increment } from './actions'

const Menu = (props) => {
  console.log('%c props', 'background: lightgreen; color: black;', props)

  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  )
}

const AppNavigator = new DrawerNavigator({
  First: {
    screen: FirstScreen,
  },
  Second: {
    screen: SecondScreen,
  },
  Third: {
    screen: ThirdScreen,
  },
}, {
  contentComponent: Menu,
})

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('First'))

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case increment:
      return {
        ...state,
        count: state.count + 1,
      }
    case decrement:
      return {
        ...state,
        count: state.count - 1,
      }
    default:
      return state
  }
}

const appReducer = combineReducers({
  nav: navReducer,
  counter: counterReducer,
})

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
)
const addListener = createReduxBoundAddListener('root')

class App extends React.Component {
  render () {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
        addListener,
      })}/>
    )
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
})

const AppWithNavigationState = connect(mapStateToProps)(App)

const store = createStore(
  appReducer,
  applyMiddleware(middleware, createLogger()),
)

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    )
  }
}

export default Root
