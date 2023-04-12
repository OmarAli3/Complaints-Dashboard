import React, { useState, useEffect, useMemo } from "react";
import { DataTable, DataTableFilterMeta, DataTableFilterMetaData } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { useComplaints } from "../../hooks/useComplaints";
import { getTableConfig } from "./utils";
import { paginationTemplate } from "./PaginationTemplate";
import { departments } from "../../mock-data/complaintsGenerator";

import "./complaints-table.scss";
import { ComplaintModel } from "../../models/ComplaintModel";
import { GovernorateModel } from "../../models/GovernorateModel";
import { useLocations } from "../../hooks/useLocations";

const initialFilters = () => {
  return getTableConfig().reduce((acc, { field, matchMode }) => {
    acc[field!] = { value: null, matchMode };
    return acc;
  }, {} as DataTableFilterMeta);
};
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

  const tableConfig = useMemo(() => getTableConfig(cities, governorates, setSelectedGovernorate), [cities, governorates]);

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
        {tableConfig.map(({ field, ...restProps }) => (
          <Column key={field} className="whitespace-nowrap min-w-md" showFilterMenu={false} field={field} {...restProps} />
        ))}
      </DataTable>
    </div>
  );
}
