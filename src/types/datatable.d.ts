import * as React from 'react';

declare module '@/components/ui/DataTable' {
  export interface ColumnDef<TData> {
    header: string;
    accessorKey: keyof TData | string;
    cell?: (info: { getValue: () => any; row: any; column: any; table: any }) => React.ReactNode;
    sortable?: boolean;
  }

  export interface DataTableProps<TData> {
    columns: ColumnDef<TData>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
    onSelectionChange?: (selected: string[]) => void;
    selectedRows?: string[];
    loading?: boolean;
    emptyMessage?: string;
    className?: string;
    headerClassName?: string;
    bodyClassName?: string;
    rowClassName?: string | ((row: TData, index: number) => string);
  }

  const DataTable: <TData extends Record<string, any>>(
    props: DataTableProps<TData> & React.RefAttributes<HTMLDivElement>
  ) => React.ReactElement;

  export default DataTable;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'data-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
