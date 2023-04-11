import dayjs from "dayjs";

export class ComplaintModel {
  complaintNumber?: string;
  complaintDepartment?: string;
  complaintStatus?: string;
  complaintDate?: Date;
  // complaintTimeFrame?: string;
  taxpayerName?: string;
  city?: string;
  area?: string;
  taxpayerBranchName?: string;
  RIN?: string;
  incentiveRegistered?: boolean;
  taxpayerType?: string;
  complaintType?: string;
  customerName?: string;
  customerMobile?: string;
  customerNationalID?: string;

  constructor(arg: Record<string, any>) {
    this.complaintNumber = arg.complaint_number;
    this.complaintDepartment = arg.complaint_department?.en;
    this.complaintStatus = arg.complaint_status?.en;
    this.complaintDate = dayjs(arg.complaint_date).toDate();
    // this.complaintTimeFrame = arg.complaint_time_frame;
    this.taxpayerName = arg.taxpayer_name?.en;
    this.city = arg.city?.en;
    this.area = arg.area?.en;
    this.taxpayerBranchName = arg.taxpayer_branch_name?.en;
    this.RIN = arg.RIN;
    this.incentiveRegistered = arg.incentive_registered;
    this.taxpayerType = arg.taxpayer_type?.en;
    this.complaintType = arg.complaint_type?.en;
    this.customerName = arg.customer_name?.en;
    this.customerMobile = arg.customer_mobile;
    this.customerNationalID = arg.customer_nationalID;
  }

  static fromArrayResponse(array: Record<string, any>[]): ComplaintModel[] {
    return array.map((item) => new ComplaintModel(item));
  }
}
