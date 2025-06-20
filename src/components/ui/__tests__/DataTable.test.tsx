import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable } from '../DataTable';
import '@testing-library/jest-dom';

type TestData = {
  id: number;
  name: string;
  email: string;
};

describe('DataTable', () => {
  // Sample data for testing
  const columns: Array<{
    key: string;
    header: string;
    cell: (row: TestData) => string | number;
    sortable?: boolean;
  }> = [
    {
      key: 'id',
      header: 'ID',
      cell: (row: TestData) => row.id,
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      cell: (row: TestData) => row.name,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (row: TestData) => row.email,
    },
  ];

  const data: TestData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  it('renders the table with correct headers', () => {
    render(<DataTable columns={columns} data={data} rowKey="id" />);
    
    // Check if all headers are rendered
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    
    // Check if all data rows are rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('handles sorting when column header is clicked', () => {
    const onSortChange = vi.fn();
    render(
      <DataTable 
        columns={columns} 
        data={data} 
        rowKey="id" 
        onSortChange={onSortChange}
        enableSorting={true}
      />
    );
    
    // Click on the Name column header to sort
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Check if sort change was called with the correct values
    expect(onSortChange).toHaveBeenCalledWith({
      key: 'name',
      direction: 'asc',
    });
    
    // Click again to sort in descending order
    fireEvent.click(nameHeader);
    expect(onSortChange).toHaveBeenCalledWith({
      key: 'name',
      direction: 'desc',
    });
  });

  it('displays the loading state when loading prop is true', () => {
    render(
      <DataTable 
        columns={columns} 
        data={[]} 
        loading={true}
        loadingComponent={<div>Loading...</div>}
        rowKey="id"
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the empty state when no data is provided', () => {
    render(
      <DataTable 
        columns={columns} 
        data={[]} 
        emptyComponent={<div>No data available</div>}
        rowKey="id"
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles row selection when selectable is true', async () => {
    const onRowSelectionChange = vi.fn();
    
    render(
      <DataTable 
        columns={columns} 
        data={data} 
        enableRowSelection={true}
        onRowSelectionChange={onRowSelectionChange}
        rowKey="id"
      />
    );
    
    // Wait for the table to render
    await waitFor(() => {
      // Click on the first row's checkbox
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // First checkbox is the header checkbox
      
      // The first row has id: 1
      expect(onRowSelectionChange).toHaveBeenCalledWith([expect.objectContaining({ id: 1 })]);
    });
  });

  it('applies custom class names', () => {
    const { container } = render(
      <DataTable 
        columns={columns} 
        data={data} 
        className="custom-table"
        headerClassName="custom-header"
        rowClassName="custom-row"
        rowKey="id"
      />
    );
    
    expect(container.querySelector('.custom-table')).toBeInTheDocument();
    expect(container.querySelector('.custom-header')).toBeInTheDocument();
    expect(container.querySelectorAll('.custom-row').length).toBe(data.length);
  });
});
