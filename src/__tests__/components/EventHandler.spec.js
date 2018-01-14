import React from 'react'
import { shallow } from 'enzyme'
import ErrorHandler from '../../components/ErrorHandler'

it('EventHandler renders as expected', () => {
  const wrapper = shallow(<ErrorHandler />)
  expect(wrapper).toMatchSnapshot()
})
