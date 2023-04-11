import { Dropdown } from "primereact/dropdown";
import { PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions } from "primereact/paginator";

const RowsPerPageDropdown = (options: PaginatorRowsPerPageDropdownOptions) => {
  const dropdownOptions = [
    { label: 10, value: 10 },
    { label: 20, value: 20 },
    { label: 30, value: 30 },
    { label: 50, value: 50 },
  ];

  return (
    <div className="flex-1">
      <span className="mx-1 select-none">Results per page: </span>
      <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
    </div>
  );
};

const CurrentPageReport = (options: PaginatorCurrentPageReportOptions) => {
  return <span className="flex-1 flex justify-end">{`Results ${options.first}-${options.last} of ${options.totalRecords}`}</span>;
};

export const paginationTemplate = {
  layout: "RowsPerPageDropdown PrevPageLink PageLinks NextPageLink CurrentPageReport",
  RowsPerPageDropdown,
  CurrentPageReport,
};
