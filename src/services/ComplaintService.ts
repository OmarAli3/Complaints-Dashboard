// import { complaints } from "../mock-data/complaints";
import { complaints } from "../mock-data/complaints";
import { ComplaintModel } from "../models/ComplaintModel";
export default {
  getComplaints: () => {
    return Promise.resolve(ComplaintModel.fromArrayResponse(complaints));
  },
};
