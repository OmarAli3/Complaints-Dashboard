import { governorates } from "../mock-data/governorates";
import { GovernorateModel } from "../models/GovernorateModel";

export default {
  getGovernorates: () => {
    return Promise.resolve(GovernorateModel.fromArrayResponse(governorates));
  },
};
