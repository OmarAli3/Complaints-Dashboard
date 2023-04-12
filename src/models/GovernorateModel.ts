import { BaseModel } from "./BaseModel";

export class GovernorateModel extends BaseModel {
  nameAr?: string;
  nameEn?: string;
  constructor(arg: Record<string, any>) {
    super(arg);
    this.nameAr = arg.governorate_name_ar;
    this.nameEn = arg.governorate_name_en;
  }

  get name() {
    return this.nameEn;
  }
}
