import React from 'react'
import PropTypes from 'prop-types'
import { flip } from './decorators'

export function Prev(props) {
  const { pageActions, hasPreviousPage, currentPage, pageTag } = props;
  const Tag = pageTag;
  const tagProps = Tag !== Prev.defaultProps.pageTag && hasPreviousPage ? {
  	...props,
  	page: currentPage - 1
  } : undefined
  return (
    <Tag {...tagProps} type="button" disabled={!hasPreviousPage} onClick={hasPreviousPage && pageActions.prev}>
      <i className="fa fa-chevron-left" />
    </Tag>
  )
}

Prev.propTypes = {
  pageActions: PropTypes.shape({
    prev: PropTypes.func.isRequired
  }).isRequired,
  hasPreviousPage: PropTypes.bool,
  pageTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

Prev.defaultProps = {
  pageTag: 'button'
}

export default flip(Prev)
