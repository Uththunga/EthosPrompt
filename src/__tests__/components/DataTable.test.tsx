import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DataTable } from '@/components/ui/DataTable'

// Mock data for testing
const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
]

const mockColumns = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    cell: (row: any) => row.name,
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    cell: (row: any) => row.email,
  },
  {
    key: 'age',
    header: 'Age',
    sortable: true,
    cell: (row: any) => row.age,
  },
]

describe('DataTable Component', () => {
  describe('Basic Rendering', () => {
    it('renders table with data', () => {
      render(<DataTable columns={mockColumns} data={mockData} rowKey="id" />)
      
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('jane@example.com')).toBeInTheDocument()
      expect(screen.getByText('35')).toBeInTheDocument()
    })

    it('renders column headers', () => {
      render(<DataTable columns={mockColumns} data={mockData} rowKey="id" />)
      
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Age')).toBeInTheDocument()
    })

    it('renders empty state when no data', () => {
      render(<DataTable columns={mockColumns} data={[]} rowKey="id" />)

      expect(screen.getByText('No data available')).toBeInTheDocument()
    })

    it('renders loading state', () => {
      render(<DataTable columns={mockColumns} data={[]} rowKey="id" loading />)
      
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  describe('Custom Components', () => {
    it('renders custom loading component', () => {
      const CustomLoading = () => <div>Custom Loading...</div>
      render(
        <DataTable 
          columns={mockColumns} 
          data={[]} 
          rowKey="id" 
          loading 
          loadingComponent={<CustomLoading />}
        />
      )
      
      expect(screen.getByText('Custom Loading...')).toBeInTheDocument()
    })

    it('renders custom empty component', () => {
      const CustomEmpty = () => <div>No items found</div>
      render(
        <DataTable 
          columns={mockColumns} 
          data={[]} 
          rowKey="id" 
          emptyComponent={<CustomEmpty />}
        />
      )
      
      expect(screen.getByText('No items found')).toBeInTheDocument()
    })
  })

  describe('Styling and Classes', () => {
    it('applies custom className', () => {
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          className="custom-table"
        />
      )
      
      const table = screen.getByRole('table')
      expect(table.parentElement).toHaveClass('custom-table')
    })

    it('applies header className', () => {
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          headerClassName="custom-header"
        />
      )
      
      const header = screen.getByRole('rowgroup')
      expect(header).toHaveClass('custom-header')
    })

    it('applies body className', () => {
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          bodyClassName="custom-body"
        />
      )
      
      const tbody = screen.getAllByRole('rowgroup')[1]
      expect(tbody).toHaveClass('custom-body')
    })
  })

  describe('Row Interactions', () => {
    it('handles row click events', () => {
      const handleRowClick = vi.fn()
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          onRowClick={handleRowClick}
        />
      )
      
      const firstRow = screen.getByText('John Doe').closest('tr')
      fireEvent.click(firstRow!)
      
      expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0)
    })

    it('applies row className function', () => {
      const rowClassName = (row: any) => row.age > 30 ? 'old-person' : 'young-person'
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          rowClassName={rowClassName}
        />
      )
      
      const johnRow = screen.getByText('John Doe').closest('tr')
      const janeRow = screen.getByText('Jane Smith').closest('tr')
      const bobRow = screen.getByText('Bob Johnson').closest('tr')
      
      expect(johnRow).toHaveClass('young-person') // age 30
      expect(janeRow).toHaveClass('young-person') // age 25
      expect(bobRow).toHaveClass('old-person')    // age 35
    })
  })

  describe('Features Configuration', () => {
    it('disables sorting when enableSorting is false', () => {
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          enableSorting={false}
        />
      )
      
      const nameHeader = screen.getByText('Name')
      expect(nameHeader.closest('th')).not.toHaveClass('cursor-pointer')
    })

    it('disables pagination when enablePagination is false', () => {
      render(
        <DataTable 
          columns={mockColumns} 
          data={mockData} 
          rowKey="id" 
          enablePagination={false}
        />
      )
      
      expect(screen.queryByText('Previous')).not.toBeInTheDocument()
      expect(screen.queryByText('Next')).not.toBeInTheDocument()
    })

    it('enables sticky header when stickyHeader is true', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          rowKey="id"
          stickyHeader={true}
        />
      )

      const headers = screen.getAllByRole('rowgroup')
      const headerGroup = headers[0] // First rowgroup is the header
      expect(headerGroup).toHaveClass('sticky')
    })

    it('applies striped rows when striped is true', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          rowKey="id"
          striped={true}
        />
      )

      const rows = screen.getAllByRole('row')
      const dataRows = rows.slice(1) // Skip header row

      expect(dataRows[1]).toHaveClass('bg-muted/25') // Second data row should be striped (index 1 % 2 !== 0)
    })
  })

  describe('Pagination', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 40),
    }))

    it('shows pagination controls with large dataset', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={largeData}
          rowKey="id"
          pageSize={10}
        />
      )

      // Check for pagination elements by their structure
      expect(screen.getByText('Rows per page:')).toBeInTheDocument()
      expect(screen.getByText('Page')).toBeInTheDocument()
      expect(screen.getByText('1')).toBeInTheDocument() // Page number
      expect(screen.getByText('of')).toBeInTheDocument()
    })

    it('respects custom page size', () => {
      render(
        <DataTable
          columns={mockColumns}
          data={largeData}
          rowKey="id"
          pageSize={5}
        />
      )

      const rows = screen.getAllByRole('row')
      // Skip header row and footer row - should have 5 data rows
      const dataRows = rows.slice(1, -1) // Skip first (header) and last (footer)

      expect(dataRows).toHaveLength(5)
    })
  })

  describe('Error Handling', () => {
    it('handles missing rowKey gracefully', () => {
      const dataWithoutId = [
        { name: 'John', email: 'john@example.com' },
        { name: 'Jane', email: 'jane@example.com' },
      ]
      
      expect(() => {
        render(
          <DataTable 
            columns={mockColumns} 
            data={dataWithoutId} 
            rowKey="id"
          />
        )
      }).not.toThrow()
    })

    it('handles empty columns array', () => {
      expect(() => {
        render(
          <DataTable 
            columns={[]} 
            data={mockData} 
            rowKey="id"
          />
        )
      }).not.toThrow()
    })
  })
})
