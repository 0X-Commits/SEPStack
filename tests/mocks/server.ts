import { setupServer } from 'msw/node';
import { sep1Handlers } from './sep1.js';
import { sep10Handlers } from './sep10.js';
import { sep24Handlers } from './sep24.js';
import { sep38Handlers } from './sep38.js';

export const server = setupServer(
  ...sep1Handlers,
  ...sep10Handlers,
  ...sep24Handlers,
  ...sep38Handlers,
);
