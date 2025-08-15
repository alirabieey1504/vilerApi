export class Email {
  constructor(private value: string) {
    if (!this.validate(value)) throw new Error('Invalid email');
  }

  private validate(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  getValue(): string {
    return this.value;
  }
}
