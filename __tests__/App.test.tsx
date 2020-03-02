import 'react-native';
import React, {ReactInstance} from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import App from '../App';
import * as reducers from '../redux/reducers';

const renderer = ShallowRenderer.createRenderer();

describe('app', () => {
  let component: ReactInstance;

  beforeEach(() => {
    renderer.render(<App />);
  });

  it('renders null with null store state', () => {
    const markup = renderer.getRenderOutput();
    expect(markup).toBeNull();
  });
});
