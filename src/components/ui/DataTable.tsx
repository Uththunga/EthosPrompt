import * as React from 'react';
import { cn } from '../../lib/utils';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell, TableFooter } from './Table';
import { Input } from './Input';
import { Button } from './Button';
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
} from 'lucide-react';

// ===================================
// Type Definitions
// ===================================

type SortDirection = 'asc' | 'desc' | null;
type FilterValue = string | number | boolean | null | undefined;

interface SortState<TData> {
  key: string;
  direction: SortDirection;
  sortFn?: (a: TData, b: TData) => number;
}

interface FilterState {
  [key: string]: FilterValue;
}

interface RowSelectionState {
  [key: string]: boolean;
}

interface ColumnDefBase<TData> {
  key: string;
  header: string | React.ReactNode | ((props: { column: ColumnDef<TData> }) => React.ReactNode);
  cell: (row: TData, index: number) => React.ReactNode;
  sortable?: boolean | ((a: TData, b: TData) => number);
  filterable?: boolean;
  filterComponent?: React.ComponentType<{
    value: FilterValue;
    onChange: (value: FilterValue) => void;
    column: ColumnDef<TData>;
  }>;
  filterFn?: (row: TData, filterValue: FilterValue) => boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  headerClassName?: string;
  cellClassName?: string | ((row: TData, index: number) => string);
}

type ColumnDef<TData> = ColumnDefBase<TData> & {
  [key: string]: unknown;
};

interface DataTableProps<TData extends Record<string, unknown>> {
  columns: Array<ColumnDef<TData>>;
  data: TData[];
  rowKey: keyof TData | ((row: TData, index: number) => string | number);
  loading?: boolean;
  loadingComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  className?: string;
  enableSorting?: boolean;
  enableFilters?: boolean;
  enableGlobalFilter?: boolean;
  enablePagination?: boolean;
  enableRowSelection?: boolean;
  pageSize?: number;
  pageIndex?: number;
  pageSizeOptions?: number[];
  onSortChange?: (sort: SortState<TData> | null) => void;
  onFilterChange?: (filters: FilterState) => void;
  onRowClick?: (row: TData, index: number) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((row: TData, index: number) => string);
  defaultSort?: SortState<TData>;
  defaultFilters?: FilterState;
  stickyHeader?: boolean;
  striped?: boolean;
  enableHover?: boolean;
  locale?: {
    search?: string;
    noResults?: string;
    loading?: string;
    rowsPerPage?: string;
    of?: string;
    previous?: string;
    next?: string;
    selectedRows?: string;
    clearFilters?: string;
    [key: string]: string | undefined;
  };
}

// ===================================
// Default Values
// ===================================

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

const defaultLoadingComponent = (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    <span className="ml-2">Loading...</span>
  </div>
);

const defaultEmptyComponent = (
  <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
    <p>No data available</p>
  </div>
);

// ===================================
// DataTable Component
// ===================================

export function DataTable<TData extends Record<string, unknown>>(props: DataTableProps<TData>) {
  const {
    columns,
    data: initialData = [],
    rowKey = 'id' as keyof TData,
    loading = false,
    loadingComponent = defaultLoadingComponent,
    emptyComponent = defaultEmptyComponent,
    className = '',
    enableSorting = true,
    enableFilters = true,
    enableGlobalFilter = true,
    enablePagination = true,
    enableRowSelection = false,
    pageSize: initialPageSize = 10,
    pageIndex: initialPageIndex = 0,
    pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
    onSortChange: onSortChangeProp,
    onFilterChange: onFilterChangeProp,
    onRowClick,
    onRowSelectionChange,
    headerClassName = '',
    bodyClassName = '',
    rowClassName = '',
    defaultSort,
    defaultFilters = {},
    stickyHeader = true,
    striped = true,
    enableHover = true,
    locale: localeProp,
  } = props;

  const [sort, setSort] = React.useState<SortState<TData> | null>(defaultSort || null);
  const [filters, setFilters] = React.useState<FilterState>(defaultFilters);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [pageIndex, setPageIndex] = React.useState(initialPageIndex);
  const [pageSize, setPageSize] = React.useState(initialPageSize);

  const getRowKey = React.useCallback((row: TData, index: number): string => {
    if (typeof rowKey === 'function') {
      return String(rowKey(row, index));
    }
    return String(row[rowKey] || index);
  }, [rowKey]);

  const processedData = React.useMemo(() => {
    let result = [...initialData];

    if (enableGlobalFilter && globalFilter) {
      const searchTerm = globalFilter.toLowerCase();
      result = result.filter(row =>
        Object.values(row).some(value => String(value || '').toLowerCase().includes(searchTerm))
      );
    }

    if (enableFilters) {
      result = result.filter(row =>
        Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null || value === '') return true;
          const column = columns.find(col => col.key === key);
          if (!column) return true;
          if (column.filterFn) {
            return column.filterFn(row, value);
          }
          return String(row[key as keyof TData] || '').toLowerCase().includes(String(value).toLowerCase());
        })
      );
    }

    if (enableSorting && sort) {
      result.sort((a, b) => {
        if (sort.sortFn) {
          return sort.direction === 'asc' ? sort.sortFn(a, b) : -sort.sortFn(a, b);
        }
        const aValue = a[sort.key as keyof TData];
        const bValue = b[sort.key as keyof TData];
        if (aValue === bValue) return 0;
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        const comparison = String(aValue).localeCompare(String(bValue));
        return sort.direction === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [initialData, globalFilter, filters, sort, enableGlobalFilter, enableFilters, enableSorting, columns]);

  const paginatedData = React.useMemo(() => {
    if (!enablePagination) return processedData;
    const startIndex = pageIndex * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, pageIndex, pageSize, enablePagination]);

  const pageCount = Math.ceil(processedData.length / pageSize);

  const handleSort = React.useCallback((key: string) => {
    if (!enableSorting) return;
    const column = columns.find(c => c.key === key);
    if (!column?.sortable) return;

    let newSort: SortState<TData> | null = null;
    if (sort?.key === key) {
      if (sort.direction === 'asc') {
        newSort = { ...sort, direction: 'desc' };
      } else {
        newSort = null; // asc -> desc -> null
      }
    } else {
      newSort = {
        key,
        direction: 'asc',
        sortFn: typeof column.sortable === 'function' ? column.sortable : undefined,
      };
    }
    setSort(newSort);
    onSortChangeProp?.(newSort);
  }, [sort, enableSorting, columns, onSortChangeProp]);

  const handleFilterChange = React.useCallback((key: string, value: FilterValue) => {
    const newFilters = { ...filters };
    if (value === undefined || value === null || value === '') {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    setFilters(newFilters);
    onFilterChangeProp?.(newFilters);
    setPageIndex(0);
  }, [filters, onFilterChangeProp]);

  const handleGlobalFilterChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setPageIndex(0);
  }, []);

  const handleClearFilters = React.useCallback(() => {
    setFilters({});
    setGlobalFilter('');
    onFilterChangeProp?.({});
    setPageIndex(0);
  }, [onFilterChangeProp]);

  const handleRowSelection = React.useCallback((row: TData, index: number, checked: boolean) => {
    const key = getRowKey(row, index);
    const newSelection = { ...rowSelection };
    if (checked) {
      newSelection[key] = true;
    } else {
      delete newSelection[key];
    }
    setRowSelection(newSelection);
    if (onRowSelectionChange) {
        const selectedRows = initialData.filter((r, i) => newSelection[getRowKey(r, i)]);
        onRowSelectionChange(selectedRows);
    }
  }, [getRowKey, rowSelection, onRowSelectionChange, initialData]);

  const handleSelectAll = React.useCallback((checked: boolean) => {
    const newSelection: RowSelectionState = {};
    if (checked) {
      paginatedData.forEach((row, index) => {
        newSelection[getRowKey(row, index)] = true;
      });
    }
    setRowSelection(newSelection);
     if (onRowSelectionChange) {
        const selectedRows = initialData.filter((r, i) => newSelection[getRowKey(r, i)]);
        onRowSelectionChange(selectedRows);
    }
  }, [getRowKey, paginatedData, onRowSelectionChange, initialData]);

  const handlePageChange = React.useCallback((newPageIndex: number) => {
    setPageIndex(Math.max(0, Math.min(newPageIndex, pageCount - 1)));
  }, [pageCount]);

  const handlePageSizeChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  }, []);

  const locale = React.useMemo(() => ({
    search: 'Search...',
    noResults: 'No results found',
    loading: 'Loading...',
    rowsPerPage: 'Rows per page:',
    of: 'of',
    previous: 'Previous',
    next: 'Next',
    selectedRows: 'selected',
    clearFilters: 'Clear filters',
    ...localeProp,
  }), [localeProp]);

  const selectedRowsCount = Object.values(rowSelection).filter(Boolean).length;
  const allRowsOnPageSelected = paginatedData.length > 0 && paginatedData.every((row, index) => rowSelection[getRowKey(row, index)]);
  const someRowsOnPageSelected = paginatedData.some((row, index) => rowSelection[getRowKey(row, index)]) && !allRowsOnPageSelected;

  if (loading) {
    return <div className={cn('flex items-center justify-center p-8', className)}>{loadingComponent}</div>;
  }

  if (processedData.length === 0 && !loading) {
    return <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>{emptyComponent}</div>;
  }

  return (
    <div className={cn('flex flex-col space-y-4', className)}>
      {(enableGlobalFilter || Object.keys(filters).length > 0) && (
        <div className="flex items-center justify-between">
          {enableGlobalFilter && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale.search}
                className="pl-10 w-full"
                value={globalFilter}
                onChange={handleGlobalFilterChange}
              />
              {globalFilter && (
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setGlobalFilter('')}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          {Object.keys(filters).length > 0 && (
            <Button variant="outline" onClick={handleClearFilters}>
              {locale.clearFilters}
            </Button>
          )}
        </div>
      )}

      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader className={cn(stickyHeader && 'sticky top-0 z-10 bg-background', headerClassName)}>
            <TableRow>
              {enableRowSelection && (
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={allRowsOnPageSelected}
                    ref={input => {
                      if (input) input.indeterminate = someRowsOnPageSelected;
                    }}
                    onChange={e => handleSelectAll(e.target.checked)}
                  />
                </TableHead>
              )}
              {columns.map(column => (
                <TableHead
                  key={column.key}
                  className={cn(column.headerClassName)}
                  style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth }}
                >
                  <div
                    className={cn('flex items-center', { 'cursor-pointer select-none': column.sortable })}
                    onClick={() => handleSort(column.key)}
                  >
                    {typeof column.header === 'function' ? column.header({ column }) : column.header}
                    {column.sortable && (
                      <div className="ml-2">
                        {sort?.key === column.key ? (
                          sort.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
            {enableFilters && (
              <TableRow>
                {enableRowSelection && <TableHead />}
                {columns.map(column => (
                  <TableHead key={`${column.key}-filter`} className={cn(column.headerClassName)}>
                    {column.filterable && (
                      column.filterComponent ? (
                        React.createElement(column.filterComponent, {
                          value: filters[column.key],
                          onChange: (value: FilterValue) => handleFilterChange(column.key, value),
                          column,
                        })
                      ) : (
                        <Input
                          type="text"
                          placeholder={`Filter ${
                            typeof column.header === 'string' ? column.header : column.key
                          }...`}
                          className="w-full"
                          value={(filters[column.key] as string) || ''}
                          onChange={e => handleFilterChange(column.key, e.target.value)}
                        />
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            )}
          </TableHeader>
          <TableBody className={cn(bodyClassName)}>
            {paginatedData.map((row, index) => {
              const key = getRowKey(row, index);
              const isSelected = !!rowSelection[key];
              return (
                <TableRow
                  key={key}
                  onClick={() => onRowClick?.(row, index)}
                  className={cn(
                    { 'cursor-pointer': onRowClick },
                    { 'hover:bg-muted/50': enableHover },
                    { 'bg-muted': isSelected },
                    striped && index % 2 !== 0 ? 'bg-muted/25' : '',
                    typeof rowClassName === 'function' ? rowClassName(row, index) : rowClassName
                  )}
                >
                  {enableRowSelection && (
                    <TableCell>
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={isSelected}
                        onChange={e => handleRowSelection(row, index, e.target.checked)}
                        onClick={e => e.stopPropagation()}
                      />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        typeof column.cellClassName === 'function'
                          ? column.cellClassName(row, index)
                          : column.cellClassName
                      )}
                      style={{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth }}
                    >
                      {column.cell(row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <TableFooter>
            <TableRow>
                <TableCell colSpan={columns.length + (enableRowSelection ? 1 : 0)}>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground">
                            {selectedRowsCount > 0 && (
                            <span>
                                {selectedRowsCount} {locale.selectedRows}.{' '}
                            </span>
                            )}
                            Showing {paginatedData.length} of {processedData.length} rows.
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                            <span className="text-sm">{locale.rowsPerPage}</span>
                            <select
                                value={pageSize}
                                onChange={handlePageSizeChange}
                                className="p-1 border rounded-md bg-transparent"
                            >
                                {pageSizeOptions.map(size => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                                ))}
                            </select>
                            </div>
                            <div className="text-sm">
                            Page {pageIndex + 1} {locale.of} {pageCount}
                            </div>
                            <div className="flex items-center space-x-1">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(0)}
                                disabled={pageIndex === 0}
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(pageIndex - 1)}
                                disabled={pageIndex === 0}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(pageIndex + 1)}
                                disabled={pageIndex >= pageCount - 1}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePageChange(pageCount - 1)}
                                disabled={pageIndex >= pageCount - 1}
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </Button>
                            </div>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </TableFooter>
      )}
    </div>
  );
}
