import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import WelcomePage from '../components/pages/welcomePage';

const container = document.createElement('div');
beforeEach(() => {
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
});

it('Welcome Page correct render', () => {
  act(() => {
    render(<WelcomePage />, container);
  });
  expect(container.tagName).toBe('DIV');
  expect(container.children[0].tagName).toBe('DIV');
  expect(container.children[0].getAttribute('class')).toBe('welcomeBlock');
  expect(container.children[0].children.length).toBe(4);
  expect(container.children[0].children[3].getAttribute('class')).toBe('welcomeClue');
});
