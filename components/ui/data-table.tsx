'use client';

import { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({ 
  columns, 
  data, 
  onRowClick,
  className = ''
}: DataTableProps<T>) {
  return (
    <div className={`bg-white border border-[#E5D5C3] rounded-xl overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F5EFE7]">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-[#6B5B3D] uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5D5C3]">
            {data.map((item, idx) => (
              <tr 
                key={idx}
                onClick={() => onRowClick?.(item)}
                className={`hover:bg-[#F5EFE7] transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column) => (
                  <td 
                    key={column.key}
                    className={`px-6 py-4 ${column.className || ''}`}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
