import React from 'react'
import PropTypes from 'prop-types'

export default function withListId(Component) {
  const Container = (props, context) => (
    <Component listId={context.listId} {...props} />
  )

  Container.contextTypes = {
    listId: PropTypes.string
  }

  return Container
}
