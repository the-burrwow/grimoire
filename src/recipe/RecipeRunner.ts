import { type Actions, type Context, type Recipe } from '../types';
import { type ActionsContainer } from './actions/ActionsContainer';
import { FileSystem } from './actions/FileSystem';
import { PackageJson } from './actions/PackageJson';

type ActionsList = Record<
  string,
  {
    action: ActionsContainer;
    fn: (...args: any[]) => void | Promise<void>;
  }
>;

export class RecipeRunner {
  private actions: ActionsList = {};

  constructor(private readonly context: Context) {
    this.addAction(new PackageJson(this.context));
    this.addAction(new FileSystem(this.context));
  }

  private addAction(action: ActionsContainer): void {
    const actions: Actions = action.register();

    for (const [name, fn] of Object.entries(actions)) {
      if (this.actions[name] !== undefined) {
        throw new Error(`Action "${name}" already declared !`);
      }

      this.actions[name] = { action, fn };
    }
  }

  async run(recipe: Recipe): Promise<void> {
    for (const actions of recipe) {
      for (const [action, data] of Object.entries(actions)) {
        if (this.actions[action] === undefined) {
          throw new Error(`Action "${action} does not exist`);
        }

        const fn = this.actions[action].fn.bind(this.actions[action].action);
        await fn(data);
      }
    }
  }
}
