import React from 'react'
import PropTypes from 'prop-types'
import { paginate } from './decorators'

export function PageNumber(props) {
  const { pageActions, page, currentPage, pageTag } = props;
  const navigate = () =>
    pageActions.goTo(page)

  const Tag = pageTag;
  const pageNumber = <span>{page}</span>
  const tagProps = Tag !== PageNumber.defaultProps.pageTag ? props : undefined
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
  pageTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}
PageNumber.defaultProps = {
  pageTag: 'button'
}

export default paginate(PageNumber)

