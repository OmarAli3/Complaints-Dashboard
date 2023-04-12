import { FilterMatchMode } from "primereact/api";
import { ColumnProps } from "primereact/column";
import { CityModel } from "../../models/CityModel";
import { GovernorateModel } from "../../models/GovernorateModel";
import {
  cityRowFilterTemplate,
  dateBodyTemplate,
  dateRowFilterTemplate,
  departmentRowFilterTemplate,
  governorateRowFilterTemplate,
  incentiveRegisteredBodyTemplate,
  incentiveRegisteredRowFilterTemplate,
  RINBodyTemplate,
  statusBodyTemplate,
  statusRowFilterTemplate,
  taxpayerTypeRowFilterTemplate,
} from "./ColumnsTemplates";

interface ComplaintsTableConfig extends ColumnProps {
  matchMode: FilterMatchMode;
}

export const getTableConfig = (cities: CityModel[] = [], governorates: GovernorateModel[] = [], onSelectGovernorate: Function = () => {}) => {
  const tableConfig: ComplaintsTableConfig[] = [
    {
      field: "complaintNumber",
      header: "Complaint Number",
      sortable: true,
      filter: true,
      filterPlaceholder: "Enter complaint number",
      matchMode: FilterMatchMode.STARTS_WITH,
      frozen: true,
    },
    {
      field: "complaintDepartment",
      header: "Complaint Department",
      sortable: true,
      filter: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: departmentRowFilterTemplate,
    },
    {
      field: "complaintStatus",
      header: "Complaint Status",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: statusRowFilterTemplate,
      body: statusBodyTemplate,
    },
    {
      field: "complaintDate",
      header: "Complaint Date",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.BETWEEN,
      filterElement: dateRowFilterTemplate,
      body: dateBodyTemplate,
    },
    {
      field: "taxpayerName",
      header: "Taxpayer Name",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.CONTAINS,
      filterPlaceholder: "Enter taxpayer name",
    },
    {
      field: "governorate",
      header: "Governorate",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: governorateRowFilterTemplate(governorates, onSelectGovernorate),
    },
    {
      field: "city",
      header: "City",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: cityRowFilterTemplate(cities),
    },
    {
      field: "taxpayerBranchName",
      header: "Taxpayer Branch Name",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.STARTS_WITH,
      filterPlaceholder: "Enter Branch Name",
    },
    {
      field: "RIN",
      header: "RIN",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.STARTS_WITH,
      filterPlaceholder: "Enter RIN",
      body: RINBodyTemplate,
    },
    {
      field: "incentiveRegistered",
      header: "Incentive Registered",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: incentiveRegisteredRowFilterTemplate,
      body: incentiveRegisteredBodyTemplate,
    },
    {
      field: "taxpayerType",
      header: "Taxpayer Type",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.EQUALS,
      filterElement: taxpayerTypeRowFilterTemplate,
    },
    {
      field: "complaintType",
      header: "Complaint Type",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.CONTAINS,
      filterPlaceholder: "Enter complaint type",
    },
    {
      field: "customerName",
      header: "Customer Name",
      filter: true,
      sortable: true,
      matchMode: FilterMatchMode.CONTAINS,
      filterPlaceholder: "Enter customer name",
    },
    {
      field: "customerMobile",
      header: "Customer Mobile",
      filter: true,
      sortable: false,
      matchMode: FilterMatchMode.CONTAINS,
      filterPlaceholder: "Enter customer mobile",
    },
    {
      field: "customerNationalID",
      header: "Customer National ID",
      filter: true,
      sortable: false,
      matchMode: FilterMatchMode.STARTS_WITH,
      filterPlaceholder: "Enter customer national ID",
    },
  ];
  return tableConfig;
};
