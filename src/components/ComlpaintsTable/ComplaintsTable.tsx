import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta, DataTableFilterMetaData, DataTableOperatorFilterMetaData } from "primereact/datatable";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useComplaints } from "../../hooks/useComplaints";
import { tableConfig } from "./utils";
import { PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions } from "primereact/paginator";
import { Calendar, CalendarChangeEvent, CalendarSelectEvent } from "primereact/calendar";
import { paginationTemplate } from "./PaginationTemplate";
import { departments, statuses, taxpayerTypes } from "../../mock-data/complaintsGenerator";

import "./complaints-table.scss";
import { ComplaintModel } from "../../models/ComplaintModel";
import dayjs from "dayjs";
import { GovernorateModel } from "../../models/GovernorateModel";
import { useLocations } from "../../hooks/useLocations";

const initialFilters = () => ({
  complaintNumber: {
    value: null,
    matchMode: FilterMatchMode.STARTS_WITH,
  },
  complaintDepartment: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  complaintStatus: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  complaintDate: {
    value: null,
    matchMode: FilterMatchMode.BETWEEN,
  },
  taxpayerName: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  governorate: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  city: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  taxpayerBranchName: {
    value: null,
    matchMode: FilterMatchMode.STARTS_WITH,
  },
  RIN: {
    value: null,
    matchMode: FilterMatchMode.STARTS_WITH,
  },
  incentiveRegistered: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  taxpayerType: {
    value: null,
    matchMode: FilterMatchMode.EQUALS,
  },
  complaintType: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  customerName: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  customerMobile: {
    value: null,
    matchMode: FilterMatchMode.CONTAINS,
  },
  customerNationalID: {
    value: null,
    matchMode: FilterMatchMode.STARTS_WITH,
  },
});
export default function ComplaintsTable() {
  const complaints = useComplaints();
  const { governorates, cities, setGovernorateCities } = useLocations();
  const [selectedGovernorate, setSelectedGovernorate] = useState<GovernorateModel | null>(null);
  const [filters, setFilters] = useState<DataTableFilterMeta>(initialFilters());

  useEffect(() => {
    if (selectedGovernorate) {
      setGovernorateCities(selectedGovernorate.id);
    }
  }, [selectedGovernorate]);
  const resetFilters = () => {
    setFilters(initialFilters());
  };
  const isFilterActive = () => {
    const _filters = filters as Record<string, DataTableFilterMetaData>;
    return Object.keys(_filters).some((key) => _filters[key].value !== null);
  };

  const dateBodyTemplate = (rowData: ComplaintModel) => {
    return dayjs(rowData.complaintDate).format("DD/MM/YYYY");
  };

  const dateRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    const value = options.value || [null, null];
    const onSelect = (index: number) => (e: CalendarSelectEvent) => {
      const newValue = [...value];
      newValue[index] = e.value;
      options.filterApplyCallback(newValue);
    };
    return (
      <div className="flex items-center gap-2">
        <Calendar
          className="min-w-sm"
          value={value[0]}
          onSelect={onSelect(0)}
          dateFormat="dd/mm/yy"
          placeholder="From"
          mask="99/99/9999"
          icon="pi pi-calendar"
        />
        <Calendar className="min-w-sm" value={value[1]} onSelect={onSelect(1)} dateFormat="dd/mm/yy" placeholder="To" mask="99/99/9999" />
      </div>
    );
  };

  const Header = () => {
    const _filters = filters as Record<string, DataTableFilterMetaData>;
    const setDepartmentFilter = (department: string | null) => {
      setFilters({
        ...filters,
        complaintDepartment: {
          value: department,
          matchMode: _filters.complaintDepartment.matchMode,
        },
      });
    };
    const getSeverity = (department: string | null) => {
      return department !== _filters.complaintDepartment.value ? "secondary" : undefined;
    };

    return (
      <div className="flex justify-between items-center">
        <span className="flex gap-2">
          <Button label="All" onClick={() => setDepartmentFilter(null)} severity={getSeverity(null)} />
          {departments.map(({ en }) => (
            <Button key={en} label={en} onClick={() => setDepartmentFilter(en)} severity={getSeverity(en)} />
          ))}
        </span>
        <Button icon="pi pi-filter-slash" label="Clear All Filters" outlined onClick={resetFilters} disabled={!isFilterActive()} />
      </div>
    );
  };

  const departmentRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={departments.map(({ en }) => en)}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Select department"
      />
    );
  };

  const taxpayerTypeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={taxpayerTypes.map(({ en }) => en)}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Select taxpayer type"
      />
    );
  };

  const getSeverity = (status: string) => {
    switch (status) {
      case "Pending":
        return "warning";
      case "Transferred":
        return "success";
      case "Closed":
        return "info";
      default:
        return null;
    }
  };
  const statusBodyTemplate = (rowData: ComplaintModel) => {
    return <Tag value={rowData.complaintStatus} severity={getSeverity(rowData.complaintStatus!)} rounded />;
  };

  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getSeverity(option)} rounded />;
  };
  const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses.map(({ en }) => en)}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Select status"
        itemTemplate={statusItemTemplate}
      />
    );
  };

  const incentiveRegisteredBodyTemplate = (rowData: ComplaintModel) => {
    return <Tag value={rowData.incentiveRegistered ? "Yes" : "No"} severity={!!rowData.incentiveRegistered ? "success" : "danger"} rounded />;
  };

  const incentiveRegisteredItemTemplate = (option: boolean) => {
    return <Tag value={option ? "Yes" : "No"} severity={option ? "success" : "danger"} rounded />;
  };
  const incentiveRegisteredRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        optionLabel={"label"}
        onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
        placeholder="Select one"
        itemTemplate={({ value }) => incentiveRegisteredItemTemplate(value)}
      />
    );
  };

  const governorateRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    const governorate = governorates.find((gov) => gov.name === options.value);
    const setGovernorate = (e: DropdownChangeEvent) => {
      setSelectedGovernorate(e.value);
      options.filterApplyCallback(e.value.name);
    };
    return <Dropdown value={governorate} options={governorates} optionLabel="name" onChange={setGovernorate} placeholder="Select governorate" />;
  };

  const cityRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    const city = cities.find((city) => city.name === options.value);
    const setCity = (e: DropdownChangeEvent) => options.filterApplyCallback(e.value.name);
    return <Dropdown value={city} options={cities} optionLabel="name" onChange={setCity} placeholder="Select city" />;
  };

  const RINBodyTemplate = ({ RIN }: ComplaintModel) => {
    return `${RIN?.slice(0, 3)}-${RIN?.slice(3, 6)}-${RIN?.slice(6, 9)}`;
  };

  return (
    <div className="flex-1 flex flex-col m-2 md:m-4 lg:m-8 rounded md:rounded-lg shadow-lg overflow-auto">
      <DataTable
        value={complaints}
        paginator
        rows={10}
        filterDisplay="row"
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        paginatorTemplate={paginationTemplate}
        header={Header}
        className="h-full flex flex-col"
        paginatorClassName="border-t border-gray-200"
      >
        <Column
          field="complaintNumber"
          header="Complaint Number"
          sortable
          filter
          className="whitespace-nowrap"
          filterPlaceholder="Enter complaint number"
          showFilterMenu={false}
        />
        <Column
          field="complaintDepartment"
          header="Complaint Department"
          sortable
          filter
          filterElement={departmentRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
        />
        <Column
          field="complaintStatus"
          header="Complaint Status"
          sortable
          filter
          filterElement={statusRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
          body={statusBodyTemplate}
        />
        <Column
          field="complaintDate"
          header="Complaint Date"
          sortable
          filter
          filterElement={dateRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
          body={dateBodyTemplate}
        />
        <Column
          field="taxpayerName"
          header="Taxpayer Name"
          sortable
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter taxpayer name"
          showFilterMenu={false}
        />
        <Column
          field="governorate"
          header="Governorate"
          sortable
          filter
          filterElement={governorateRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
        />
        <Column field="city" header="City" sortable filter filterElement={cityRowFilterTemplate} className="whitespace-nowrap" showFilterMenu={false} />
        <Column
          field="taxpayerBranchName"
          header="Taxpayer Branch Name"
          sortable
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter Branch Name"
          showFilterMenu={false}
        />
        <Column
          field="RIN"
          header="RIN"
          sortable
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter RIN"
          showFilterMenu={false}
          body={RINBodyTemplate}
        />
        <Column
          field="incentiveRegistered"
          header="Incentive Registered"
          sortable
          filter
          filterElement={incentiveRegisteredRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
          body={incentiveRegisteredBodyTemplate}
        />
        <Column
          field="taxpayerType"
          header="Taxpayer Type"
          sortable
          filter
          filterElement={taxpayerTypeRowFilterTemplate}
          className="whitespace-nowrap"
          showFilterMenu={false}
        />
        <Column
          field="complaintType"
          header="Complaint Type"
          sortable
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter complaint type"
          showFilterMenu={false}
        />
        <Column
          field="customerName"
          header="Customer Name"
          sortable
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter customer name"
          showFilterMenu={false}
        />
        <Column
          field="customerMobile"
          header="Customer Mobile"
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter customer mobile"
          showFilterMenu={false}
        />
        <Column
          field="customerNationalID"
          header="Customer National ID"
          filter
          className="whitespace-nowrap min-w-md"
          filterPlaceholder="Enter customer national ID"
          showFilterMenu={false}
        />
      </DataTable>
    </div>
  );
}
