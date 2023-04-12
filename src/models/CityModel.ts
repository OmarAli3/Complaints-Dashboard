import { BaseModel } from "./BaseModel";

export class CityModel extends BaseModel {
  governorateId?: string;
  nameAr?: string;
  nameEn?: string;
  constructor(arg: Record<string, any>) {
    super(arg);
    this.governorateId = arg.governorate_id;
    this.nameAr = arg.city_name_ar;
    this.nameEn = arg.city_name_en;
  }

  get name() {
    return this.nameEn;
  }
}
