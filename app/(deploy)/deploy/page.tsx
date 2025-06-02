'use client';

import { useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown, Plus, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Input } from '../../../components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { SidebarToggle } from '../../../components/sidebar-toggle';

// Mock data for deployments
type Deployment = {
  id: string;
  name: string;
  model: string;
  status: 'active' | 'inactive' | 'deploying' | 'failed';
  endpoint: string;
  created: string;
  lastActive: string;
  requests: number;
  cost: string;
};

const data: Deployment[] = [
  {
    id: '1',
    name: 'radium/DeepSeek-R1-0528',
    model: 'DeepSeek-R1-0528',
    status: 'active',
    endpoint: 'https://api.radium.ai/v1/models/deepseek-r1',
    created: '2024-01-15',
    lastActive: '2 hours ago',
    requests: 15420,
    cost: '$125.50',
  },
  {
    id: '2',
    name: 'radium/Qwen3-30B-A3B',
    model: 'Qwen3-30B-A3B',
    status: 'active',
    endpoint: 'https://api.radium.ai/v1/models/qwen3-30b',
    created: '2024-01-10',
    lastActive: '5 minutes ago',
    requests: 28350,
    cost: '$240.00',
  },
  {
    id: '3',
    name: 'radium/DeepSeek-Prover-V2',
    model: 'DeepSeek-Prover-V2-671B',
    status: 'deploying',
    endpoint: 'https://api.radium.ai/v1/models/prover-v2',
    created: '2024-01-20',
    lastActive: 'Deploying...',
    requests: 0,
    cost: '$0.00',
  },
];

export default function DeploymentsPage() {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<Deployment>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <Badge
            variant={
              status === 'active'
                ? 'default'
                : status === 'deploying'
                ? 'secondary'
                : status === 'failed'
                ? 'destructive'
                : 'outline'
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue('model')}</div>,
    },
    {
      accessorKey: 'lastActive',
      header: 'Last Active',
    },
    {
      accessorKey: 'requests',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Requests
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const requests = row.getValue('requests') as number;
        return <div className="text-right">{requests.toLocaleString()}</div>;
      },
    },
    {
      accessorKey: 'cost',
      header: () => <div className="text-right">Cost</div>,
      cell: ({ row }) => {
        const cost = row.getValue('cost') as string;
        return <div className="text-right font-medium">{cost}</div>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const deployment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(deployment.endpoint)}
              >
                Copy endpoint
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>View logs</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete deployment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2">
        <SidebarToggle />
        <h1 className="text-lg font-semibold">Deployments</h1>
        <Button
          className="ml-auto"
          size="sm"
          onClick={() => router.push('/deploy/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Deployment
        </Button>
      </header>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter deployments..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No deployments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}