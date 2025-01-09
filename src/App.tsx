import React, { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm';
import { Pagination } from './components/Pagination';
import { ApiResponse, DataItem } from './types';
import { Loader2 } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async (query: string, start: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://demo.dataverse.org/api/search?q=${encodeURIComponent(query || 'data')}&start=${start}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result: ApiResponse = await response.json();
      setData(result.data.items);
      setTotalItems(result.data.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, (currentPage - 1) * ITEMS_PER_PAGE);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(searchQuery, 0);
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Publications Search</h1>

        <SearchForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSubmit={handleSearch}
        />

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
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
                        <div className="text-sm text-gray-900">
                          {item.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.published_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {data.length === 0 && !loading && (
              <div className="text-center text-gray-500">
                No publications found. Try a different search term.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
