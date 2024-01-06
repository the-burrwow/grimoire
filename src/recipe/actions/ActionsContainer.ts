import { type Actions, type Context } from '../../types';

export abstract class ActionsContainer {
  constructor(protected readonly context: Context) {}

  abstract register(): Actions;
}
