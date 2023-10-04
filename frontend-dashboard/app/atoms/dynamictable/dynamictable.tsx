import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { TbEdit } from 'react-icons/tb';

interface Column {
  key: string;
  label: string;
  
}

interface DynamicTableProps {
  data: any[]; 
  columns: Column[];
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

function DynamicTable({ data, columns, onEdit, onDelete }: DynamicTableProps) {
  return (
    <table className="w-full border border-collapse mt-20 mx-40">
      <thead>
        <tr className="bg-gray-100 text-left">
          {columns.map((column) => (
            <th key={column.key} className="px-2 py-3">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-collapse text-sm text-left">
            {columns.map((column) => (
              <td key={column.key} className="px-2 py-2 text-gray-500 ">
                {item[column.key]}
              </td>
            ))}
            {onEdit && (
              <td className="">
                <button onClick={() => onEdit(index)} className="text-bgblue text-center">
                  <TbEdit className="text-lg ml-1" /> 
                </button>
              </td>
            )}
            {onDelete && (
              <td className="px-2 py-2">
                <button onClick={() => onDelete(index)} className="text-grey-500 text-center">
                  <AiOutlineDelete className="text-lg" /> 
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DynamicTable;
