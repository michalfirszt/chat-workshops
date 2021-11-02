import { render } from '@testing-library/react';
import App from './App';

test('show signIn form', () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId('sign-in-form')).toBeInTheDocument();
});
