import { groupedCities, cities } from "../mock-data/cities";
import { CityModel } from "../models/CityModel";

export default {
  getCities: (governorateId?: string) => {
    if (!!governorateId) {
      return Promise.resolve(CityModel.fromArrayResponse(groupedCities[governorateId]));
    }
    return Promise.resolve(CityModel.fromArrayResponse(cities));
  },
};
