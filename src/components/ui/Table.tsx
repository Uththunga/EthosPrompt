import * as React from 'react';
import { cn } from '../../lib/utils';

// Table component with responsive design and styling
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-primary font-medium text-primary-foreground', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    /** Whether the row is hoverable */
    hoverable?: boolean;
    /** Whether the row is selected */
    selected?: boolean;
    /** Whether the row is clickable */
    onClick?: () => void;
  }
>(({ className, hoverable = true, selected = false, onClick, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors',
      hoverable && 'hover:bg-muted/50',
      selected && 'bg-muted/50',
      onClick && 'cursor-pointer',
      className
    )}
    onClick={onClick}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    /** Whether the column is sortable */
    sortable?: boolean;
    /** The sort direction */
    sortDirection?: 'asc' | 'desc' | false;
    /** Callback when the column is clicked for sorting */
    onSort?: () => void;
  }
>(({ className, sortable, sortDirection, onSort, children, ...props }, ref) => {
  const handleClick = () => {
    if (sortable && onSort) {
      onSort();
    }
  };

  return (
    <th
      ref={ref}
      className={cn(
        'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
        sortable && 'cursor-pointer select-none',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center">
        {children}
        {sortable && (
          <span className="ml-2">
            {sortDirection === 'asc' ? (
              <span className="inline-block">↑</span>
            ) : sortDirection === 'desc' ? (
              <span className="inline-block">↓</span>
            ) : (
              <span className="inline-block opacity-30">↕</span>
            )}
          </span>
        )}
      </div>
    </th>
  );
});
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    /** Whether the cell is a data cell or a header cell */
    asHeader?: boolean;
    /** Whether the cell should have a fixed width */
    fixedWidth?: string | number;
  }
>(({ className, asHeader = false, fixedWidth, style, ...props }, ref) => {
  const Component = asHeader ? 'th' : 'td';
  
  return (
    <Component
      ref={ref as any}
      className={cn(
        'p-4 align-middle [&:has([role=checkbox])]:pr-0',
        className
      )}
      style={fixedWidth ? { ...style, width: fixedWidth } : style}
      {...props}
    />
  );
});
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

// Extended Table component with additional features
interface TableEnhancedProps extends React.HTMLAttributes<HTMLTableElement> {
  /** The table columns configuration */
  columns: Array<{
    /** The unique key for the column */
    key: string;
    /** The column header */
    header: React.ReactNode;
    /** The column width (e.g., '100px', '20%') */
    width?: string | number;
    /** Whether the column is sortable */
    sortable?: boolean;
    /** Custom cell renderer */
    cell?: (row: any, rowIndex: number) => React.ReactNode;
    /** Additional class name for the column header */
    headerClassName?: string;
    /** Additional class name for the column cells */
    cellClassName?: string | ((row: any, rowIndex: number) => string);
  }>;
  /** The table data */
  data: any[];
  /** The unique row key getter */
  rowKey: string | ((row: any, index: number) => string | number);
  /** The current sort configuration */
  sort?: {
    /** The column key being sorted */
    key: string;
    /** The sort direction */
    direction: 'asc' | 'desc';
  };
  /** Callback when sort changes */
  onSortChange?: (sort: { key: string; direction: 'asc' | 'desc' }) => void;
  /** Whether to show a loading state */
  loading?: boolean;
  /** The loading component to render */
  loadingComponent?: React.ReactNode;
  /** The empty state component to render when there's no data */
  emptyComponent?: React.ReactNode;
  /** Whether to show the table header */
  showHeader?: boolean;
  /** Additional class name for the table */
  className?: string;
  /** Additional class name for the table header */
  headerClassName?: string;
  /** Additional class name for the table body */
  bodyClassName?: string;
  /** Additional class name for the table rows */
  rowClassName?: string | ((row: any, index: number) => string);
  /** Whether rows are clickable */
  onRowClick?: (row: any, index: number) => void;
  /** The currently selected row key(s) */
  selectedRowKeys?: (string | number)[];
  /** Whether to highlight the selected row */
  highlightSelected?: boolean;
  /** The table layout */
  layout?: 'auto' | 'fixed';
}

/**
 * An enhanced Table component that provides a simple API for displaying tabular data.
 * Supports sorting, selection, loading states, and more.
 */
const TableEnhanced: React.FC<TableEnhancedProps> = ({
  columns,
  data = [],
  rowKey,
  sort,
  onSortChange,
  loading = false,
  loadingComponent = <TableLoading />,
  emptyComponent = <TableEmpty />,
  showHeader = true,
  className,
  headerClassName,
  bodyClassName,
  rowClassName,
  onRowClick,
  selectedRowKeys = [],
  highlightSelected = true,
  layout = 'auto',
  ...props
}) => {
  const handleSort = (key: string) => {
    if (!onSortChange || !columns.find(col => col.key === key)?.sortable) return;
    
    if (sort?.key === key) {
      // Toggle direction if clicking the same column
      onSortChange({
        key,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      // Default to ascending when clicking a new column
      onSortChange({ key, direction: 'asc' });
    }
  };

  const getRowKey = (row: any, index: number) => {
    return typeof rowKey === 'function' ? rowKey(row, index) : row[rowKey];
  };

  const isRowSelected = (row: any, index: number) => {
    const key = getRowKey(row, index);
    return selectedRowKeys.includes(key);
  };

  const getRowClassName = (row: any, index: number) => {
    const baseClasses = [];
    
    if (typeof rowClassName === 'function') {
      baseClasses.push(rowClassName(row, index));
    } else if (rowClassName) {
      baseClasses.push(rowClassName);
    }
    
    if (highlightSelected && isRowSelected(row, index)) {
      baseClasses.push('bg-muted/50');
    }
    
    return baseClasses.join(' ');
  };

  // Render loading state
  if (loading) {
    return <div className={cn('w-full', className)}>{loadingComponent}</div>;
  }

  // Render empty state
  if (data.length === 0 && !loading) {
    return <div className={cn('w-full', className)}>{emptyComponent}</div>;
  }

  return (
    <div className={cn('w-full overflow-hidden rounded-md border', className)}>
      <Table style={{ tableLayout: layout }}>
        {showHeader && (
          <TableHeader className={headerClassName}>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  sortable={column.sortable}
                  sortDirection={sort?.key === column.key ? sort.direction : false}
                  onSort={() => handleSort(column.key)}
                  className={column.headerClassName}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody className={bodyClassName}>
          {data.map((row, rowIndex) => (
            <TableRow
              key={getRowKey(row, rowIndex)}
              className={getRowClassName(row, rowIndex)}
              selected={highlightSelected && isRowSelected(row, rowIndex)}
              onClick={() => onRowClick?.(row, rowIndex)}
            >
              {columns.map((column) => {
                const cellContent = column.cell
                  ? column.cell(row, rowIndex)
                  : row[column.key];
                
                const cellClassName = typeof column.cellClassName === 'function'
                  ? column.cellClassName(row, rowIndex)
                  : column.cellClassName;
                
                return (
                  <TableCell
                    key={`${getRowKey(row, rowIndex)}-${column.key}`}
                    className={cellClassName}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {cellContent}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Loading component for the table
const TableLoading: React.FC = () => (
  <div className="flex h-32 items-center justify-center">
    <div className="flex flex-col items-center space-y-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-muted-foreground">Loading data...</p>
    </div>
  </div>
);

// Empty state component for the table
const TableEmpty: React.FC<{ message?: string }> = ({
  message = 'No data available',
}) => (
  <div className="flex h-32 items-center justify-center">
    <p className="text-muted-foreground">{message}</p>
  </div>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEnhanced,
  TableLoading,
  TableEmpty,
};

// Example usage:
/*
// Basic usage
const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
];

const columns = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'role',
    header: 'Role',
    cell: (row) => (
      <Badge variant={row.role === 'Admin' ? 'default' : 'outline'}>
        {row.role}
      </Badge>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: (row) => (
      <div className="flex space-x-2">
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

function UsersTable() {
  const [sort, setSort] = React.useState({ key: 'name', direction: 'asc' });
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<number[]>([]);
  
  const handleSort = (newSort: { key: string; direction: 'asc' | 'desc' }) => {
    setSort(newSort);
    // You would typically fetch sorted data here
  };
  
  const handleRowClick = (row: any) => {
    console.log('Row clicked:', row);
  };
  
  return (
    <TableEnhanced
      columns={columns}
      data={data}
      rowKey="id"
      sort={sort}
      onSortChange={handleSort}
      selectedRowKeys={selectedRowKeys}
      onRowClick={handleRowClick}
      className="mt-4"
    />
  );
}

// With loading state
function UsersTableWithLoading() {
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <TableEnhanced
      columns={columns}
      data={loading ? [] : data}
      rowKey="id"
      loading={loading}
      loadingComponent={
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-lg font-medium">Loading users...</p>
            <p className="text-sm text-muted-foreground">Please wait while we load your data</p>
          </div>
        </div>
      }
    />
  );
}

// With empty state
function UsersTableEmpty() {
  return (
    <TableEnhanced
      columns={columns}
      data={[]}
      rowKey="id"
      emptyComponent={
        <div className="flex h-64 flex-col items-center justify-center space-y-4">
          <Users className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg font-medium">No users found</p>
          <p className="text-muted-foreground">
            Get started by creating a new user
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      }
    />
  );
}
*/
