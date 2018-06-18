import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addCount, reduceCount } from '../actions'

class FirstScreen extends Component {
  render () {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title={'Show drawer'} onPress={() => this.props.navigation.navigate('DrawerOpen')}/>
        <Text>{this.props.count}</Text>
        <Button title={'+'} onPress={() => this.props.increment()}/>
        <Button title={'-'} onPress={() => this.props.decrement()}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  count: state.counter.count,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  increment: addCount,
  decrement: reduceCount,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)
