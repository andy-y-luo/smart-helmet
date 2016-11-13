import { connect } from 'react-redux'
import { toggleTodo } from './actions'
import HelmetsApp from './components/HelmetsApp'

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const HelmetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HelmetsApp)

export default HelmetContainer
