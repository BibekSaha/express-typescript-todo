import { Router } from 'express'

export abstract class CommonRouting {
  constructor(
    protected router: Router,
    protected name: string
  ) {}

  getName() {
    return this.name;
  }

  public abstract configureRoute(): Router;
}
