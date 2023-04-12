import dayjs from "dayjs";
import { Calendar, CalendarSelectEvent } from "primereact/calendar";
import { ColumnFilterElementTemplateOptions } from "primereact/column";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Tag } from "primereact/tag";
import { departments, statuses, taxpayerTypes } from "../../mock-data/complaintsGenerator";
import { CityModel } from "../../models/CityModel";
import { ComplaintModel } from "../../models/ComplaintModel";
import { GovernorateModel } from "../../models/GovernorateModel";

export const departmentRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  return (
    <Dropdown
      value={options.value}
      options={departments.map(({ en }) => en)}
      onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
      placeholder="Select department"
    />
  );
};

const getStatusSeverity = (status: string) => {
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

export const statusRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const statusItemTemplate = (option: string) => {
    return <Tag value={option} severity={getStatusSeverity(option)} rounded />;
  };
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

export const statusBodyTemplate = (rowData: ComplaintModel) => {
  return <Tag value={rowData.complaintStatus} severity={getStatusSeverity(rowData.complaintStatus!)} rounded />;
};

export const dateRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  const value = options.value || [null, null];
  const onSelect = (index: number) => (e: CalendarSelectEvent) => {
    const newValue = [...value];
    newValue[index] = e.value;
    options.filterApplyCallback(newValue);
  };
  return (
    <div className="flex items-center gap-2">
      <Calendar className="min-w-sm" value={value[0]} onSelect={onSelect(0)} dateFormat="dd/mm/yy" placeholder="From" mask="99/99/9999" icon="pi pi-calendar" />
      <Calendar className="min-w-sm" value={value[1]} onSelect={onSelect(1)} dateFormat="dd/mm/yy" placeholder="To" mask="99/99/9999" />
    </div>
  );
};

export const dateBodyTemplate = (rowData: ComplaintModel) => {
  return dayjs(rowData.complaintDate).format("DD/MM/YYYY");
};

export const governorateRowFilterTemplate =
  (governorates: GovernorateModel[], onSelectGovernorate: Function) => (options: ColumnFilterElementTemplateOptions) => {
    const governorate = governorates.find((gov) => gov.name === options.value);
    const setGovernorate = (e: DropdownChangeEvent) => {
      onSelectGovernorate(e.value);
      options.filterApplyCallback(e.value.name);
    };
    return <Dropdown value={governorate} options={governorates} optionLabel="name" onChange={setGovernorate} placeholder="Select governorate" />;
  };

export const cityRowFilterTemplate = (cities: CityModel[]) => (options: ColumnFilterElementTemplateOptions) => {
  const city = cities.find((city) => city.name === options.value);
  const setCity = (e: DropdownChangeEvent) => options.filterApplyCallback(e.value.name);
  return <Dropdown value={city} options={cities} optionLabel="name" onChange={setCity} placeholder="Select city" />;
};

export const RINBodyTemplate = ({ RIN }: ComplaintModel) => {
  return `${RIN?.slice(0, 3)}-${RIN?.slice(3, 6)}-${RIN?.slice(6, 9)}`;
};

export const incentiveRegisteredItemTemplate = (option: boolean) => {
  return <Tag value={option ? "Yes" : "No"} severity={option ? "success" : "danger"} rounded />;
};

export const incentiveRegisteredRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
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

export const incentiveRegisteredBodyTemplate = (rowData: ComplaintModel) => {
  return <Tag value={rowData.incentiveRegistered ? "Yes" : "No"} severity={!!rowData.incentiveRegistered ? "success" : "danger"} rounded />;
};

export const taxpayerTypeRowFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
  return (
    <Dropdown
      value={options.value}
      options={taxpayerTypes.map(({ en }) => en)}
      onChange={(e: DropdownChangeEvent) => options.filterApplyCallback(e.value)}
      placeholder="Select taxpayer type"
    />
  );
};
