import React from 'react'
import { shallow } from 'enzyme'
import ModalCloseBtn from '../../components/ModalCloseBtn'

it('ModalCloseBtn renders as expected', () => {
  const wrapper = shallow(<ModalCloseBtn />)
  expect(wrapper).toMatchSnapshot()
})
