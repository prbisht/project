import React from 'react';
import { DataItem } from '../types';

interface DataTableProps {
  data: DataItem[];
  loading: boolean;
  hasSearched: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, loading}) => {
  if (loading) return null;

  return (
    <section aria-labelledby="publications-list">
      <table className="min-w-full divide-y divide-gray-200">
        <caption id="publications-list" className="sr-only">
          Publications List
        </caption>
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.identifier} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-normal break-words">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  {item.name}
                </a>
              </td>
              <td className="px-6 py-4 whitespace-normal break-words">
                <div className="text-sm text-gray-900">{item.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(item.published_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
