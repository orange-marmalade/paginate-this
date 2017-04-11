import { Component } from 'react'
import PropTypes from 'prop-types'
import { getFlux, bindActions } from '../flux/flux'
import composables from '../actions'
import { defaultPaginator } from '../reducer'
import { preloadedPaginator } from '../lib/stateManagement'

export const connector = getFlux().decorate(
  (state, ownProps) => ({
    paginator: preloadedPaginator(state, ownProps.listId, ownProps.preloaded)
  }),
  (dispatch, ownProps) => ({
    pageActions: bindActions(composables(ownProps), dispatch)
  })
)

export class PaginationWrapper extends Component {
  static propTypes = {
    pageActions: PropTypes.object.isRequired,
    paginator: PropTypes.object,
    children: PropTypes.element.isRequired,
    listId: PropTypes.string.isRequired
  }

  static childContextTypes = {
    listId: PropTypes.string
  }

  static defaultProps = {
    paginator: defaultPaginator
  }

  getChildContext() {
    return {
      listId: this.props.listId
    }
  }

  componentDidMount() {
    const { paginator, pageActions } = this.props

    if (!paginator.get('initialized')) {
      pageActions.initialize()
    }

    this.reloadIfStale(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.reloadIfStale(nextProps)
  }

  reloadIfStale(props) {
    const { paginator, pageActions } = props
    if (paginator.get('stale') && !paginator.get('isLoading') && !paginator.get('loadError')) {
      pageActions.reload()
    }
  }

  render() {
    return this.props.children
  }
}
