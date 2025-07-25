import type { ReactNode } from 'react';
import { useState } from 'react'; // Removed unused useMemo
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import Tabs, { TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'; // Tabs is a default export
import { Badge } from '@/components/ui/Badge';

// Temporary type fix for JSX elements
type JSXElement = ReactNode;

// Wrapper component to handle JSX elements with proper typing
const Fragment = ({ 
  children, 
  className, 
  ...props 
}: { 
  children: ReactNode; 
  className?: string; 
  [key: string]: unknown; 
}): JSXElement => {
  return <div className={className} {...props}>{children}</div>;
};

// Sample data for the demo
const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin', lastLogin: '2025-06-15T10:30:00Z' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'User', lastLogin: '2025-06-10T14:20:00Z' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'Editor', lastLogin: '2025-06-14T09:15:00Z' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'pending', role: 'User', lastLogin: '2025-06-05T16:45:00Z' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', status: 'active', role: 'Viewer', lastLogin: '2025-06-16T11:10:00Z' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', status: 'inactive', role: 'User', lastLogin: '2025-05-20T13:25:00Z' },
  { id: 7, name: 'Bruce Wayne', email: 'bruce@example.com', status: 'active', role: 'Admin', lastLogin: '2025-06-16T08:05:00Z' },
  { id: 8, name: 'Clark Kent', email: 'clark@example.com', status: 'active', role: 'Editor', lastLogin: '2025-06-15T17:30:00Z' },
];

const orderData = [
  { id: 'ORD-001', customer: 'John Doe', date: '2025-06-10', amount: 125.99, status: 'completed', items: 3 },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2025-06-12', amount: 89.50, status: 'shipped', items: 2 },
  { id: 'ORD-003', customer: 'Bob Johnson', date: '2025-06-13', amount: 234.75, status: 'processing', items: 5 },
  { id: 'ORD-004', customer: 'Alice Williams', date: '2025-06-14', amount: 56.20, status: 'pending', items: 1 },
  { id: 'ORD-005', customer: 'Charlie Brown', date: '2025-06-15', amount: 178.30, status: 'shipped', items: 4 },
];

export default function DataTableDemo() {
  const [users, setUsers] = useState(userData);
  const [orders, setOrders] = useState(orderData);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  // User table columns with proper typing
  const userColumns: Array<{
    key: string;
    header: string | React.ReactNode;
    cell: (row: any) => React.ReactNode;
    sortable?: boolean;
  }> = [
    {
      key: 'id',
      header: 'ID',
      cell: ({ getValue }: { getValue: () => number }): JSX.Element => (
        <div className="font-medium">#{getValue()}</div>
      ),
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
    {
      key: 'role',
      header: 'Role',
      cell: (row) => (
        <div className="inline-block">
          <Badge 
            variant={
              row.role === 'Admin' ? 'default' : 
              row.role === 'Editor' ? 'secondary' : 'outline'
            }
          >
            {row.role}
          </Badge>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => (
        <div className="inline-block">
          <Badge variant={row.status === 'active' ? 'success' : 'destructive'}>
            {String(row.status).charAt(0).toUpperCase() + String(row.status).slice(1)}
          </Badge>
        </div>
      ),
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      cell: (row) => (
        <div className="font-medium">{new Date(row.lastLogin).toLocaleString()}</div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: () => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50 hover:text-red-700">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Order table columns with proper typing
  const orderColumns: Array<{
    key: string;
    header: string | React.ReactNode;
    cell: (row: any) => React.ReactNode;
    sortable?: boolean;
  }> = [
    {
      key: 'id',
      header: 'Order ID',
      cell: (row) => row.id,
      sortable: true,
    },
    {
      key: 'customer',
      header: 'Customer',
      cell: (row) => row.customer,
    },
    {
      key: 'date',
      header: 'Order Date',
      cell: (row) => (
        <div className="font-medium">{new Date(row.date).toLocaleDateString()}</div>
      ),
    },
    {
      key: 'items',
      header: 'Items',
      cell: (row) => row.items.toString(),
    },
    {
      key: 'amount',
      header: 'Amount',
      cell: (row) => `$${Number(row.amount).toFixed(2)}`,
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row) => {
        const variant = 
          row.status === 'completed' ? 'success' : 
          row.status === 'shipped' ? 'secondary' : 
          row.status === 'processing' ? 'outline' : 'destructive';
        
        return (
          <div className="inline-block">
            <Badge variant={variant}>
              {String(row.status).charAt(0).toUpperCase() + String(row.status).slice(1)}
            </Badge>
          </div>
        );
      },
    },
  ];

  // Handle user actions
  const handleDeleteUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]);
  };

  const handleDeleteOrders = () => {
    setOrders(orders.filter(order => !selectedOrders.includes(order.id)));
    setSelectedOrders([]);
  };

  return (
    <Fragment className="container mx-auto py-8 px-4">
      <Fragment className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">DataTable Component Demo</h1>
        <p className="text-gray-600">A highly customizable and feature-rich table component for React applications</p>
      </Fragment>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage your application users with ease</CardDescription>
                </div>
                <div className="flex space-x-2">
                  {selectedUsers.length > 0 && (
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={handleDeleteUsers}
                    >
                      Delete Selected ({selectedUsers.length})
                    </Button>
                  )}
                  <Button size="sm">Add User</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={userColumns}
                data={users}
                rowKey="id"
                className="border rounded-lg overflow-hidden"
                headerClassName="bg-gray-50"
                rowClassName={(_row, index) => 
                  `transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`
                }
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>View and manage customer orders</CardDescription>
                </div>
                <div className="flex space-x-2">
                  {selectedOrders.length > 0 && (
                    <Button 
                      variant="danger" 
                      size="sm" 
                      onClick={handleDeleteOrders}
                    >
                      Cancel Orders ({selectedOrders.length})
                    </Button>
                  )}
                  <Button size="sm">Export</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={orderColumns}
                data={orders}
                rowKey="id"
                className="border rounded-lg overflow-hidden"
                headerClassName="bg-gray-50"
                rowClassName={(_row, index) => 
                  `transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Fragment className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About This Component</h2>
        <p className="mb-4 text-gray-700">
          The DataTable component is a flexible and powerful table component that supports:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
          <li>Sorting by column</li>
          <li>Row selection (single or multiple)</li>
          <li>Pagination</li>
          <li>Custom cell rendering</li>
          <li>Loading and empty states</li>
          <li>Fully responsive design</li>
          <li>Accessibility support</li>
        </ul>
        <Fragment className="flex space-x-4">
          <Button asChild>
            <a href="/docs/datatable">View Documentation</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/your-org/your-repo/tree/main/src/components/ui/DataTable" target="_blank" rel="noopener noreferrer">
              View Source Code
            </a>
          </Button>
        </Fragment>
      </Fragment>
    </Fragment>
  );
}
