import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { Tag } from "primereact/tag";
import { useComplaints } from "../../hooks/useComplaints";
import { tableConfig } from "./utils";
import { PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions } from "primereact/paginator";
import { paginationTemplate } from "./PaginationTemplate";

export default function ComplaintsTable() {
  const complaints = useComplaints();

  
  return (
    <div className="h-full flex flex-col m-2 md:m-4 lg:m-8 rounded md:rounded-lg shadow-lg overflow-auto">
      <DataTable value={complaints} paginator rows={10} paginatorTemplate={paginationTemplate}>
        {tableConfig.map((column) => {
          return (
            <Column
              key={column.field}
              field={column.field}
              header={column.header}
              sortable={column.sortable}
              // filter={column.filter}
              // filterPlaceholder={column.filterPlaceholder}
              // style={{ minWidth: "20rem" }}
              className="whitespace-nowrap"
            />
          );
        })}
      </DataTable>
    </div>
  );
}
