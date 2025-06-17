import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DataTable } from '../DataTable';
import '@testing-library/jest-dom';

describe('DataTable', () => {
  // Sample data for testing
  const columns = [
    {
      key: 'id',
      header: 'ID',
      cell: (row: any) => row.id,
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      cell: (row: any) => row.name,
      sortable: true,
    },
    {
      key: 'email',
      header: 'Email',
      cell: (row: any) => row.email,
    },
  ];

  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
  ];

  it('renders the table with correct headers', () => {
    render(<DataTable columns={columns} data={data} />);
    
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
    const { container } = render(<DataTable columns={columns} data={data} />);
    
    // Click on the Name column header to sort
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    
    // Get all name cells after sorting
    const nameCells = container.querySelectorAll('tbody td:nth-child(2)');
    
    // Check if names are sorted in ascending order
    expect(nameCells[0].textContent).toBe('Bob Johnson');
    expect(nameCells[1].textContent).toBe('Jane Smith');
    expect(nameCells[2].textContent).toBe('John Doe');
    
    // Click again to sort in descending order
    fireEvent.click(nameHeader);
    
    const nameCellsDesc = container.querySelectorAll('tbody td:nth-child(2)');
    expect(nameCellsDesc[0].textContent).toBe('John Doe');
    expect(nameCellsDesc[1].textContent).toBe('Jane Smith');
    expect(nameCellsDesc[2].textContent).toBe('Bob Johnson');
  });

  it('displays the loading state when loading prop is true', () => {
    render(
      <DataTable 
        columns={columns} 
        data={[]} 
        loading={true} 
        loadingText="Loading..." 
      />
    );
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays the empty state when no data is provided', () => {
    render(
      <DataTable 
        columns={columns} 
        data={[]} 
        emptyText="No data available" 
      />
    );
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('handles row selection when selectable is true', async () => {
    const onSelectionChange = vi.fn();
    
    render(
      <DataTable 
        columns={columns} 
        data={data} 
        selectable={true}
        onSelectionChange={onSelectionChange}
        rowKey="id"
      />
    );
    
    // Wait for the table to render
    await waitFor(() => {
      // Click on the first row's checkbox
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // First checkbox is the header checkbox
      
      expect(onSelectionChange).toHaveBeenCalledWith([1]);
      
      // Click on the header checkbox to select all
      fireEvent.click(checkboxes[0]);
      expect(onSelectionChange).toHaveBeenCalledWith([1, 2, 3]);
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
      />
    );
    
    expect(container.querySelector('.custom-table')).toBeInTheDocument();
    expect(container.querySelector('.custom-header')).toBeInTheDocument();
    expect(container.querySelectorAll('.custom-row').length).toBe(data.length);
  });
});
