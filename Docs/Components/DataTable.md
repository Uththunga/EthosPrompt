# DataTable Component

A highly customizable and feature-rich table component for React applications, built with TypeScript and Tailwind CSS.

## Features

- **Sorting**: Sort data by clicking on column headers
- **Pagination**: Control the number of rows displayed per page
- **Row Selection**: Select single or multiple rows with checkboxes
- **Custom Rendering**: Customize cell, header, and row rendering
- **Loading States**: Built-in loading state with custom loading text
- **Empty States**: Customizable empty state when no data is available
- **Fully Typed**: Built with TypeScript for better developer experience
- **Responsive**: Works on all screen sizes
- **Accessible**: Follows WAI-ARIA patterns for data tables

## Installation

Make sure you have the required dependencies installed:

```bash
npm install @headlessui/react @heroicons/react
```

## Basic Usage

```tsx
import { DataTable } from '@/components/ui/DataTable';

const columns = [
  {
    key: 'id',
    header: 'ID',
    cell: (row) => row.id,
    sortable: true,
  },
  {
    key: 'name',
    header: 'Name',
    cell: (row) => row.name,
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    cell: (row) => row.email,
  },
];

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

function UserTable() {
  return <DataTable columns={columns} data={data} />;
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `columns` | `ColumnDef<T>[]` | Yes | - | Array of column definitions |
| `data` | `T[]` | Yes | - | Array of data objects |
| `loading` | `boolean` | No | `false` | Show loading state |
| `loadingText` | `string` | No | `'Loading...'` | Text to display when loading |
| `emptyText` | `string` | No | `'No data available'` | Text to display when no data is available |
| `selectable` | `boolean` | No | `false` | Enable row selection |
| `selectedRowKeys` | `(string \| number)[]` | No | `[]` | Array of selected row keys |
| `onSelectionChange` | `(selectedKeys: (string \| number)[]) => void` | No | - | Callback when selection changes |
| `rowKey` | `string \| ((row: T) => string \| number)` | No | `'id'` | Key or function to get unique row identifier |
| `pagination` | `PaginationState` | No | - | Pagination configuration |
| `onPaginationChange` | `(pagination: PaginationState) => void` | No | - | Callback when pagination changes |
| `sorting` | `SortState` | No | - | Current sort state |
| `onSortingChange` | `(sorting: SortState) => void` | No | - | Callback when sort changes |
| `className` | `string` | No | - | Additional classes for the table |
| `headerClassName` | `string` | No | - | Additional classes for the table header |
| `rowClassName` | `string \| ((row: T, index: number) => string)` | No | - | Additional classes for table rows |

## Column Definition

Each column in the `columns` array can have the following properties:

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `key` | `string` | Yes | - | Unique identifier for the column |
| `header` | `string \| ReactNode \| ((column: ColumnDef<T>) => ReactNode)` | No | - | Column header content |
| `cell` | `(row: T) => ReactNode` | No | - | Function to render cell content |
| `sortable` | `boolean` | No | `false` | Whether the column is sortable |
| `width` | `string \| number` | No | - | Column width |
| `minWidth` | `string \| number` | No | - | Minimum column width |
| `maxWidth` | `string \| number` | No | - | Maximum column width |
| `align` | `'left' \| 'center' \| 'right'` | No | `'left'` | Text alignment |
| `headerClassName` | `string` | No | - | Additional classes for the column header |
| `cellClassName` | `string \| ((row: T) => string)` | No | - | Additional classes for column cells |

## Pagination

To enable pagination, pass a `pagination` object with the following properties:

```tsx
const [pagination, setPagination] = useState({
  pageIndex: 0,          // Current page index (0-based)
  pageSize: 10,         // Number of items per page
  pageCount: 5,          // Total number of pages
  totalItems: 50,        // Total number of items
});

<DataTable
  columns={columns}
  data={data}
  pagination={pagination}
  onPaginationChange={setPagination}
/>
```

## Row Selection

To enable row selection, set `selectable` to `true` and provide `onSelectionChange` handler:

```tsx
const [selectedRows, setSelectedRows] = useState<number[]>([]);

<DataTable
  columns={columns}
  data={data}
  selectable
  selectedRowKeys={selectedRows}
  onSelectionChange={setSelectedRows}
  rowKey="id"
/>
```

## Custom Rendering

You can customize the rendering of cells, headers, and rows:

```tsx
const columns = [
  {
    key: 'status',
    header: 'Status',
    cell: (row) => (
      <span className={`px-2 py-1 text-xs rounded-full ${
        row.status === 'active' ? 'bg-green-100 text-green-800' :
        row.status === 'inactive' ? 'bg-red-100 text-red-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {row.status}
      </span>
    ),
  },
  {
    key: 'actions',
    header: 'Actions',
    cell: (row) => (
      <div className="flex space-x-2">
        <button className="text-blue-600 hover:text-blue-800">Edit</button>
        <button className="text-red-600 hover:text-red-800">Delete</button>
      </div>
    ),
  },
];
```

## Styling

The component uses Tailwind CSS for styling. You can customize the appearance using the following classes:

- `.data-table`: The main table container
- `.data-table-header`: Table header
- `.data-table-row`: Table row
- `.data-table-cell`: Table cell
- `.data-table-header-cell`: Table header cell
- `.data-table-sortable`: Sortable column header
- `.data-table-sorted`: Sorted column header
- `.data-table-sort-icon`: Sort icon
- `.data-table-loading`: Loading state
- `.data-table-empty`: Empty state

## Accessibility

The DataTable component follows WAI-ARIA patterns for data tables:

- Uses `role="table"` for the table element
- Uses `role="row"`, `role="columnheader"`, and `role="cell"` for table structure
- Implements keyboard navigation for sortable columns
- Provides proper ARIA attributes for sortable columns
- Supports screen readers with appropriate ARIA labels

## Examples

### Basic Table with Sorting

```tsx
<DataTable
  columns={[
    { key: 'id', header: 'ID', sortable: true },
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
  ]}
  data={users}
/>
```

### Table with Pagination

```tsx
const [pagination, setPagination] = useState({
  pageIndex: 0,
  pageSize: 10,
  pageCount: 5,
  totalItems: 50,
});

<DataTable
  columns={columns}
  data={users}
  pagination={pagination}
  onPaginationChange={setPagination}
/>
```

### Table with Row Selection

```tsx
const [selectedRows, setSelectedRows] = useState<number[]>([]);

<DataTable
  columns={columns}
  data={users}
  selectable
  selectedRowKeys={selectedRows}
  onSelectionChange={setSelectedRows}
  rowKey="id"
/>
```

## Troubleshooting

### Table not updating when data changes

Make sure the `data` prop is a new reference when it changes. If you're updating the data in place, create a new array:

```tsx
// Instead of:
// data.push(newItem);
// setData(data); // This won't trigger a re-render

// Do this:
setData([...data, newItem]); // This will trigger a re-render
```

### Sorting not working

Make sure you've set `sortable: true` on the columns you want to be sortable and that you're handling the `onSortingChange` callback:

```tsx
const [sorting, setSorting] = useState<SortState>({ key: 'name', direction: 'asc' });

<DataTable
  columns={columns}
  data={data}
  sorting={sorting}
  onSortingChange={setSorting}
/>
```

## Browser Support

The DataTable component supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
