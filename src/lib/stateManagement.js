import { Map } from 'immutable'
import { defaultPaginator } from '../reducer'
import { translate, responseProps, recordProps } from '../pageInfoTranslator'
import debounce from './debounce'

const stateMap = {}
const defaultLocator = listId => state => state[listId]
const preload = { results: [] }

const defaultPageParams = () => {
  const [totalCountProp, resultsProp] = responseProps()

  return {
    totalCountProp,
    resultsProp
  }
}

export function stateInfo() {
  return stateMap
}

export function listInfo(listId) {
  return stateInfo()[listId] || {}
}

export function registerPaginator({
  listId,
  fetch,
  cache = false,
  initialSettings = {},
  pageParams = {},
  locator = defaultLocator(listId)
}) {
  stateMap[listId] = {
    locator,
    fetch: debounce(fetch),
    cache,
    initialSettings,
    params: {
      ...defaultPageParams(),
      ...pageParams
    }
  }

  return stateMap[listId]
}

export function getPaginator(listId, state) {
  const config = stateMap[listId] || {
    locator: defaultLocator(listId)
  }

  return config.locator(state) || defaultPaginator
}

export function getItem(state, listId, itemId) {
  return getPaginator(listId, state).get('results').find(
    r => r.get(recordProps().identifier) === itemId,
    undefined,
    Map()
  )
}

export function listConfig(listId) {
  return stateMap[listId]
}

export function preloadedPaginator(state, listId, preloaded = preload) {
  const paginator = getPaginator(listId, state)
  return paginator.equals(defaultPaginator) ? paginator.merge(preloaded) : paginator
}

export function isUpdating(state, listId, itemId) {
  const paginator = getPaginator(listId, state)
  return paginator.get('updating').includes(itemId) ||
    paginator.get('massUpdating').includes(itemId)
}

export function isRemoving(state, listId, itemId) {
  return getPaginator(listId, state).get('removing').includes(itemId)
}

export function currentQuery(state, listId) {
  return translate(getPaginator(state, listId))
}
