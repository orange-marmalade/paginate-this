import React from 'react'
import PropTypes from 'prop-types'
import { sort as decorate } from './decorators'

export function ColumnHeader(props) {
  const { pageActions, field, text, sort, sortReverse, sortable=true, sortTag } = props;
  if (!sortable) {
    return <span>{text}</span>
  }

  const Tag = sortTag;
  const tagProps = Tag !== ColumnHeader.defaultProps.sortTag ? {
    ...props,
    sort: field,
    sortOrder: !sortReverse ? 'desc' : 'asc'
  } : undefined

  const sortByField = () =>
    pageActions.sort(field, !sortReverse)

  const arrow = sort === field && (
    sortReverse ? 'sort-desc' : 'sort-asc'
  )

  const icon = arrow || 'sort'

  return (
    <Tag {...tagProps} onClick={sortByField}>
      {text}
      <i className={`fa fa-${icon}`} />
    </Tag>
  )
}

ColumnHeader.propTypes = {
  sort: PropTypes.string,
  sortReverse: PropTypes.bool,
  pageActions: PropTypes.object,
  field: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  sortable: PropTypes.bool,
  optionalSortTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

ColumnHeader.defaultProps = {
  sortTag: 'button'
}

export default decorate(ColumnHeader)

