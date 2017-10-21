import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import { PaginationWrapper } from '../../src/containers/PaginationWrapper'
import { defaultPaginator } from '../../src/reducer'
import '../specHelper'

const MockComponent = () => false

function getProps(props = {}) {
  return {
    pageActions: {
      reset: expect.createSpy(),
      reload: expect.createSpy(),
      initialize: expect.createSpy()
    },
    paginator: defaultPaginator.merge(props)
  }
}

describe('<PaginationWrapper />', () => {
  context('when paginator is uninitialized', () => {
    const props = getProps()
    mount(
      <PaginationWrapper {...props}>
        <MockComponent />
      </PaginationWrapper>
    )

    it('calls initialize', () => {
      expect(props.pageActions.initialize).toHaveBeenCalled()
    })
  })

  context('when paginator is initialized', () => {
    const props = getProps({ initialized: true })
    mount(
      <PaginationWrapper {...props}>
        <MockComponent />
      </PaginationWrapper>
    )

    it('does not initialize', () => {
      expect(props.pageActions.initialize).toNotHaveBeenCalled()
    })
  })

  context('when paginator is stale', () => {
    context('and there is no load error', () => {
      const props = getProps({ stale: true, initialized: true })
      mount(
        <PaginationWrapper {...props}>
          <MockComponent />
        </PaginationWrapper>
      )

      it('executes a reset', () => {
        expect(props.pageActions.reload).toHaveBeenCalled()
      })
    })

    context('and there is a load error', () => {
      const props = getProps({
        stale: true,
        loadError: { status: 401 }
      })

      mount(
        <PaginationWrapper {...props}>
          <MockComponent />
        </PaginationWrapper>
      )

      it('does not execute a reset', () => {
        expect(props.pageActions.reset).toNotHaveBeenCalled()
      })
    })
  })
})
