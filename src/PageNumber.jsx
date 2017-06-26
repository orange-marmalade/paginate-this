import React from 'react'
import PropTypes from 'prop-types'
import { paginate } from './decorators'

export function PageNumber(props) {
  const { pageActions, page, currentPage, tag } = props;
  const navigate = () =>
    pageActions.goTo(page)

  const Tag = tag;
  const pageNumber = <span>{page}</span>
  const tagProps = tag !== PageNumber.defaultProps.tag ? props : undefined
  const link = page === currentPage ? pageNumber : (
    <Tag {...tagProps} type="button" onClick={navigate}>{pageNumber}</Tag>
  )

  return link
}

PageNumber.propTypes = {
  pageActions: PropTypes.shape({
    goTo: PropTypes.func.isRequired
  }).isRequired,
  page: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
PageNumber.defaultProps = {
  tag: 'button'
}

export default paginate(PageNumber)

