import { useState, useEffect, useCallback, useRef } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const { enabled = true, method = 'GET', headers = {}, body = null, cache = true } = options;

  const fetchData = useCallback(async (overrideOptions = {}) => {
    const finalUrl = overrideOptions.url || url;
    const finalMethod = overrideOptions.method || method;
    const finalHeaders = { 'Content-Type': 'application/json', ...headers, ...overrideOptions.headers };
    const finalBody = overrideOptions.body || body;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const fetchOptions = {
        method: finalMethod,
        headers: finalHeaders,
        signal: controller.signal
      };

      if (finalBody && finalMethod !== 'GET') {
        fetchOptions.body = JSON.stringify(finalBody);
      }

      const response = await fetch(finalUrl, fetchOptions);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
      return { success: true, data: result };
    } catch (err) {
      if (err.name === 'AbortError') return { success: false, aborted: true };
      setError(err.message || 'Error de conexión');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [url, method, headers, body]);

  const postData = useCallback(async (postData) => {
    return fetchData({ method: 'POST', body: postData });
  }, [fetchData]);

  const putData = useCallback(async (putData) => {
    return fetchData({ method: 'PUT', body: putData });
  }, [fetchData]);

  const patchData = useCallback(async (patchData) => {
    return fetchData({ method: 'PATCH', body: patchData });
  }, [fetchData]);

  const deleteData = useCallback(async () => {
    return fetchData({ method: 'DELETE' });
  }, [fetchData]);

  useEffect(() => {
    if (enabled && url) {
      fetchData();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [enabled, url]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    patchData,
    deleteData,
    reset
  };
};

export default useFetch;
