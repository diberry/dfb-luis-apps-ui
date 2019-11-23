import * as React from 'react'
import Button from './button'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Button buttonText="Some Text" />).toJSON()
  expect(tree).toMatchSnapshot()
})