import 'react-native';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';

const renderer = ShallowRenderer.createRenderer();

it('renders without crashing', async () => {
  renderer.render(<App />);
});
