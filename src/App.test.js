/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-unnecessary-act */
import '@testing-library/jest-dom'
import React from "react";
import { render, screen, cleanup } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';

import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  
  cleanup();
});

describe("Login Component", () => {
  // Test 1
  test('login component', () => {
    render(<App />);
    const element = screen.getByText(/sign in/i);
    expect(element).toBeInTheDocument();
  });

  // Test 2
  test("Rendering", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  })

  // Test 3
  test("Header Text", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toHaveTextContent("Sign In");
  })
});

it("data fetching", async () => {
  const credential = {
    username: "testing",
    password: "testing",
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(credential)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App id="123" />, container);
  });

  expect(container.querySelector("#username").textContent).toBe(credential.username);
  expect(container.querySelector("#password").textContent).toBe(credential.password);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
