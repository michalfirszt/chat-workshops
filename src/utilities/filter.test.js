import { filter } from './filter';

test('filter tests', () => {
  const array = [2, 4, 8, 16, 32];
  const action = (value) => value > 10;

  expect(filter(array, action)).toStrictEqual([16, 32]);
});
