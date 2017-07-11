import React from 'react'
import PropTypes from 'prop-types'
import { flip } from './decorators'

export function Next(props) {
  const { pageActions, hasNextPage, currentPage, pageTag } = props;
  const Tag = pageTag;
  const tagProps = Tag !== Next.defaultProps.pageTag && hasNextPage ? {
  	...props,
  	page: currentPage + 1
  } : undefined
  return (
    <Tag {...tagProps} type="button" disabled={!hasNextPage} onClick={hasNextPage && pageActions.next}>
      <i className="fa fa-chevron-right" />
    </Tag>
  )
}

Next.propTypes = {
  pageActions: PropTypes.shape({
    next: PropTypes.func.isRequired
  }).isRequired,
  hasNextPage: PropTypes.bool,
  pageTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
Next.defaultProps = {
  pageTag: 'button'
}

export default flip(Next)
