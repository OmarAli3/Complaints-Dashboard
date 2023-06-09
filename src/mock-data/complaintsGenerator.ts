/**
 * No need to understand this file, it's just a script to generate mock data
 * Just try to understand the data structure and trust that it's correct :)
 */

import dayjs from "dayjs";
import { groupedCities } from "./cities";
import { governorates } from "./governorates";
const complaintSample = {
  complaint_number: "123456789",
  complaint_department: {
    en: "Anti-Evasion",
    ar: "المكافحة",
  },
  complaint_status: {
    en: "Pending",
    ar: "معلقة",
  },
  complaint_date: "2023-04-04T22:52:38.860Z",
  complaint_time_frame: "Normal",
  taxpayer_name: {
    en: "Starbucks",
    ar: "ستاربكس",
  },
  governorate: { id: "1", governorate_name_ar: "القاهرة", governorate_name_en: "Cairo" },
  city: { id: "1", governorate_id: "1", city_name_ar: "15 مايو", city_name_en: "15 May" },
  taxpayer_branch_name: {
    en: "Abbas",
    ar: "عباس",
  },
  RIN: "123456789",
  incentive_registered: true,
  taxpayer_type: {
    en: "VAT",
    ar: "ضريبة القيمة المضافة",
  },
  complaint_type: {
    en: "Receipt value is different",
    ar: "قيمة الفاتورة مختلفة",
  },
  customer_name: {
    en: "Ahmed Mohamed",
    ar: "أحمد محمد",
  },
  customer_mobile: "01012345678",
  customer_nationalID: "29510000000000",
};

const departments = [
  {
    en: "Anti-Evasion",
    ar: "المكافحة",
  },
  {
    en: "Default",
    ar: "الافتراضي",
  },
  {
    en: "Inventory",
    ar: "الحصر",
  },
];
const statuses = [
  {
    en: "Pending",
    ar: "معلقة",
  },
  {
    en: "Transferred",
    ar: "محولة",
  },
  {
    en: "Closed",
    ar: "مغلقة",
  },
  {
    en: "Closed with receipt",
    ar: "مغلقة مع قسيمة",
  },
];
const timeFrames = ["Normal", "Medium", "Urgent"];
const incentiveRegistered = [true, false];
const taxpayerTypes = [
  {
    en: "VAT",
    ar: "ضريبة القيمة المضافة",
  },
  {
    en: "Excise",
    ar: "ضريبة الاستهلاك",
  },
  {
    en: "Customs",
    ar: "الجمارك",
  },
];
const customerNames = [
  {
    en: "Ahmed Mohamed",
    ar: "أحمد محمد",
  },
  {
    en: "Mohamed Ahmed",
    ar: "محمد أحمد",
  },
  {
    en: "Mohamed Ali",
    ar: "محمد علي",
  },
  {
    en: "Ali Mohamed",
    ar: "علي محمد",
  },
  {
    en: "Ali Ahmed",
    ar: "علي أحمد",
  },
  {
    en: "Ahmed Ali",
    ar: "أحمد علي",
  },
];
const customerMobiles = ["012034534534", "012034534535", "012034534536", "012034534537", "012034534538", "012034534539"];
const generateComplaints = () => {
  const complaints = [];
  for (let i = 0; i < 100; i++) {
    const complaint = { ...complaintSample };
    complaint.complaint_number = "356789" + i;
    complaint.complaint_department = departments[i % departments.length];
    complaint.complaint_status = statuses[i % statuses.length];
    complaint.complaint_date = dayjs().subtract(i, "day").toISOString();
    complaint.complaint_time_frame = timeFrames[i % timeFrames.length];
    complaint.RIN = `${123456789 + i}`;
    complaint.incentive_registered = incentiveRegistered[i % incentiveRegistered.length];
    complaint.taxpayer_type = taxpayerTypes[i % taxpayerTypes.length];
    complaint.customer_name = customerNames[i % customerNames.length];
    complaint.customer_mobile = customerMobiles[i % customerMobiles.length];
    complaint.customer_nationalID = `${"2951" + i}`.padEnd(14, "0");

    const governorateId = Math.floor(Math.random() * governorates.length);
    complaint.governorate = governorates[governorateId];
    const cityId = Math.floor(Math.random() * groupedCities[complaint.governorate.id].length);
    complaint.city = groupedCities[complaint.governorate.id][cityId];

    complaints.push(complaint);
  }
  return complaints;
};

const complaints = generateComplaints();

export { complaints, departments, statuses, taxpayerTypes };
