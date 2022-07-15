import { User } from '@prisma/client';

export class UserResponse {
  private firstName: string;
  private lastName: string;
  private email: string;
  private id: string;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
  }
}
