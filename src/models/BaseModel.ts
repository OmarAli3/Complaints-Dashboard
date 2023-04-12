export class BaseModel {
  id: string;
  constructor(arg: Record<string, any>) {
    this.id = arg.id;
  }
  static fromArrayResponse<T extends BaseModel>(this: new (arg: Record<string, any>) => T, array: Record<string, any>[]): T[] {
    return array.map((item) => new this(item));
  }
}
