import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

interface DataTableProps {
  columns: ColumnDef<any, any>[];
  data: any[];
  onEndReached?: () => void;
  isFetchingNextPage?: boolean;
}

export function DataTable({
  columns,
  data,
  onEndReached,
  isFetchingNextPage,
}: DataTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const virtualizer = useVirtualizer({
    count: data.length + (isFetchingNextPage ? 1 : 0),
    estimateSize: () => 35,
    getScrollElement: () => scrollRef.current,
    overscan: 5,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const rows = table.getRowModel().rows;

  // Infinite scroll trigger
  useEffect(() => {
    if (!virtualItems.length || !onEndReached) return;
    const lastItem = virtualItems[virtualItems.length - 1];
    if (lastItem.index >= data.length - 1) {
      onEndReached();
    }
  }, [virtualItems, data.length, onEndReached]);

  return (
    <div className="rounded-md border">
      <div ref={scrollRef} className="overflow-auto h-[80dvh]">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const width = header.column.columnDef.size;
                  return (
                    <TableHead
                      key={header.id}
                      style={
                        width ? { width, maxWidth: width, minWidth: width } : {}
                      }
                    >
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
            {/* Spacer */}
            {virtualItems.length > 0 && virtualItems[0].start > 0 && (
              <tr
                style={{ height: virtualItems[0].start }}
                className="opacity-0"
              >
                <td colSpan={columns.length} className="p-0 border-none" />
              </tr>
            )}{" "}
            {virtualItems.map(({ index }) => {
              if (index >= data.length) {
                return (
                  <TableRow key="loader-row">
                    <TableCell
                      colSpan={columns.length}
                      className="text-center py-4"
                    >
                      Cargando más...
                    </TableCell>
                  </TableRow>
                );
              }
              const row = rows[index];
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected?.() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const width = cell.column.columnDef.size;
                    return (
                      <TableCell
                        key={cell.id}
                        className="truncate"
                        style={
                          width
                            ? { width, maxWidth: width, minWidth: width }
                            : {}
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
            {/* Spacer */}
            {virtualItems.length > 0 &&
              virtualizer.getTotalSize() -
                virtualItems[virtualItems.length - 1].end >
                0 && (
                <tr
                  style={{
                    height:
                      virtualizer.getTotalSize() -
                      virtualItems[virtualItems.length - 1].end,
                  }}
                  className="opacity-0"
                >
                  <td colSpan={columns.length} className="p-0 border-none" />
                </tr>
              )}
            {/* No results fallback */}
            {virtualItems.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
