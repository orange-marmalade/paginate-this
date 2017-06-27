import React from 'react'
import PropTypes from 'prop-types'
import classNames from './lib/classNames'
import ColumnHeader from './ColumnHeader'
import { tabulateLean } from './decorators'
import DataRow from './containers/DataRow'
import TableRow from './TableRow'

function renderRow(headers, rowTag = TableRow) {
  return (id, i) => (
    <DataRow
      key={i}
      itemId={id}
      component={rowTag}
      index={i}
      headers={headers}
    />
  )
}

export function DataTable(props) {
  const { ids, headers, isLoading, rowTag, className = 'border' } = props

  const headerRow = headers.map(h =>
    <th key={h.field}>
      <ColumnHeader
        {...props}
        {...h}
      />
    </th>
  )

  const classes = classNames(className)
    .withConditional({ loading: isLoading })
    .load()

  return (
    <table className={classes}>
      <thead>
        <tr>
          {headerRow}
        </tr>
      </thead>
      <tbody>
        {ids.map(renderRow(headers, rowTag))}
      </tbody>
    </table>
  )
}

DataTable.propTypes = {
  headers: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  ids: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  className: PropTypes.string,
  optionalSortTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  optionalRowTag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
}

export default tabulateLean(DataTable)
