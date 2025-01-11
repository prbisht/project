import React, { useState, useEffect } from 'react';
import { SearchForm } from './components/SearchForm';
import { Pagination } from './components/Pagination';
import { ApiResponse, DataItem } from './types';
import { Loader2 } from 'lucide-react';
import { ErrorMessage } from './components/ErrorMessage';
import { DataTable } from './components/DataTable';

const ITEMS_PER_PAGE = 10;

function App() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState(false); // New state to control when to fetch data

  const fetchData = async (query: string, start: number) => {
    setLoading(true);
    setError(null);

    try {
      console.log('API called');
      const response = await fetch(
        `https://demo.dataverse.org/api/search?q=${encodeURIComponent(query)}&start=${start}`
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
    if (hasSearched) {
      fetchData(searchQuery, (currentPage - 1) * ITEMS_PER_PAGE);
    }
  }, [currentPage, triggerSearch]); // Use triggerSearch to avoid duplicate calls

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setCurrentPage(1);
    setTriggerSearch((prev) => !prev); // Toggle triggerSearch to ensure a single API call
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold">Publications Search</h1>
        </header>

        <section>
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSubmit={handleSearch}
          />
        </section>

        <ErrorMessage error={error} />

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <section>
            <DataTable data={data} loading={loading} hasSearched={hasSearched} />

            {data.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}

            {data.length === 0 && !loading && hasSearched && (
              <div className="text-center text-gray-500">
                No publications found. Try a different search term.
              </div>
            )}

            {!hasSearched && !loading && (
              <div className="text-center text-gray-500">
                Search for a publication.
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

export default App;
