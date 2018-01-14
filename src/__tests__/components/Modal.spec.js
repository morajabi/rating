import React from 'react'
import { shallow } from 'enzyme'
import Modal from '../../components/Modal'

it('Modal renders as expected', () => {
  const wrapper = shallow(<Modal onClose={() => {}} />)
  expect(wrapper).toMatchSnapshot()
})
