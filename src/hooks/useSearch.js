import { useState, useMemo, useCallback } from 'react';
import useDebounce, { SEARCH_DEBOUNCE_DELAY } from './useDebounce';

const useSearch = (items, searchFields = [], filterConfig = {}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(
    Object.keys(filterConfig).reduce((acc, key) => ({ ...acc, [key]: '' }), {})
  );
  const debouncedSearch = useDebounce(searchTerm, SEARCH_DEBOUNCE_DELAY);

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setFilters(Object.keys(filterConfig).reduce((acc, key) => ({ ...acc, [key]: '' }), {}));
  }, [filterConfig]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = !debouncedSearch || searchFields.some(field => {
        const value = item[field];
        return value && value.toLowerCase().includes(debouncedSearch.toLowerCase());
      });

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        const matcher = filterConfig[key];
        if (typeof matcher === 'function') {
          return matcher(item, value);
        }
        return item[key] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [items, debouncedSearch, searchFields, filters, filterConfig]);

  const uniqueValues = useCallback((field) => {
    return [...new Set(items.map(item => item[field]).filter(Boolean))];
  }, [items]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    clearFilters,
    filteredItems,
    uniqueValues,
    totalResults: filteredItems.length,
    totalItems: items.length
  };
};

export default useSearch;
