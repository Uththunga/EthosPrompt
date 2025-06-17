import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import { useState, useMemo } from 'react';

const meta: Meta<typeof DataTable> = {
  title: 'Components/UI/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DataTable>;

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', lastLogin: '2025-06-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive', lastLogin: '2025-06-10' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', lastLogin: '2025-06-14' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Pending', lastLogin: '2025-06-05' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'Active', lastLogin: '2025-06-16' },
];

// Basic Table
export const Basic: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', cell: (row) => row.id },
      { key: 'name', header: 'Name', cell: (row) => row.name },
      { key: 'email', header: 'Email', cell: (row) => row.email },
      { 
        key: 'status', 
        header: 'Status', 
        cell: (row) => (
          <span className={`px-2 py-1 text-xs rounded-full ${
            row.status === 'Active' ? 'bg-green-100 text-green-800' :
            row.status === 'Inactive' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {row.status}
          </span>
        ) 
      },
      { key: 'lastLogin', header: 'Last Login', cell: (row) => new Date(row.lastLogin).toLocaleDateString() },
    ],
    data: sampleData,
  },
};

// Sortable Table
export const Sortable: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', cell: (row) => row.id, sortable: true },
      { key: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
      { key: 'email', header: 'Email', cell: (row) => row.email, sortable: true },
      { key: 'lastLogin', header: 'Last Login', cell: (row) => new Date(row.lastLogin).toLocaleDateString(), sortable: true },
    ],
    data: sampleData,
  },
};

// Selectable Table
export const Selectable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          Selected IDs: {selectedRows.join(', ') || 'None'}
        </div>
        <DataTable
          columns={[
            { key: 'id', header: 'ID', cell: (row) => row.id },
            { key: 'name', header: 'Name', cell: (row) => row.name },
            { key: 'email', header: 'Email', cell: (row) => row.email },
          ]}
          data={sampleData}
          selectable={true}
          selectedRowKeys={selectedRows}
          onSelectionChange={setSelectedRows}
          rowKey="id"
        />
      </div>
    );
  },
};

// Paginated Table
export const Paginated: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID', cell: (row) => row.id },
      { key: 'name', header: 'Name', cell: (row) => row.name },
      { key: 'email', header: 'Email', cell: (row) => row.email },
    ],
    data: sampleData,
    pagination: {
      pageSize: 2,
      pageIndex: 0,
      pageCount: Math.ceil(sampleData.length / 2),
    },
  },
};

// Loading State
export const Loading: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    data: [],
    loading: true,
    loadingText: 'Loading user data...',
  },
};

// Empty State
export const Empty: Story = {
  args: {
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Name' },
      { key: 'email', header: 'Email' },
    ],
    data: [],
    emptyText: 'No users found. Try adjusting your search criteria.',
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    columns: [
      { 
        key: 'id', 
        header: 'ID', 
        cell: (row) => row.id,
        headerClassName: 'bg-gray-100 font-bold',
        cellClassName: 'font-mono',
      },
      { 
        key: 'name', 
        header: 'Full Name', 
        cell: (row) => row.name,
        headerClassName: 'bg-gray-100 font-bold',
      },
      { 
        key: 'email', 
        header: 'Email Address', 
        cell: (row) => row.email,
        headerClassName: 'bg-gray-100 font-bold',
      },
    ],
    data: sampleData,
    className: 'border border-gray-200 rounded-lg overflow-hidden',
    headerClassName: 'bg-gray-50',
    rowClassName: 'hover:bg-gray-50 transition-colors',
  },
};
