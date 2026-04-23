import { useState, useEffect, useCallback } from 'react';

const STORAGE_PREFIX = 'laboria_';

const getFullKey = (key) => `${STORAGE_PREFIX}${key}`;

const useLocalStorage = (key, initialValue) => {
  const fullKey = getFullKey(key);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(fullKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${fullKey}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (storedValue === null || storedValue === undefined) {
        localStorage.removeItem(fullKey);
      } else {
        localStorage.setItem(fullKey, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.warn(`Error writing localStorage key "${fullKey}":`, error);
    }
  }, [fullKey, storedValue]);

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(fullKey);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${fullKey}":`, error);
    }
  }, [fullKey, initialValue]);

  return [storedValue, setStoredValue, remove];
};

export const getUserStorageKey = (key, userId) => `${key}_${userId}`;

export const clearLaboriaStorage = () => {
  Object.keys(localStorage)
    .filter(k => k.startsWith(STORAGE_PREFIX))
    .forEach(k => localStorage.removeItem(k));
};

export default useLocalStorage;
