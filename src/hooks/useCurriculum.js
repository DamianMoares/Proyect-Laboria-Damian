import { useState, useEffect, useCallback } from 'react';
import useLocalStorage, { getUserStorageKey } from './useLocalStorage';

const CURRICULUM_KEY = 'curriculum';

const defaultCurriculum = {
  experience: [],
  education: [],
  skills: [],
  projects: [],
  languages: []
};

const createItem = (section) => {
  const id = Date.now();
  const sendToApplication = true;

  switch (section) {
    case 'experience':
      return { id, company: '', position: '', startDate: '', endDate: '', description: '', sendToApplication };
    case 'education':
      return { id, institution: '', degree: '', field: '', startDate: '', endDate: '', description: '', sendToApplication };
    case 'skills':
      return { id, name: '', level: 'intermedio', sendToApplication };
    case 'projects':
      return { id, name: '', description: '', technologies: '', link: '', sendToApplication };
    case 'languages':
      return { id, language: '', level: 'intermedio', sendToApplication };
    default:
      return { id, sendToApplication };
  }
};

const useCurriculum = (userId) => {
  const storageKey = userId ? getUserStorageKey(CURRICULUM_KEY, userId) : null;
  const [curriculum, setCurriculum] = useLocalStorage(
    storageKey || 'curriculum_empty',
    defaultCurriculum
  );

  const addItem = useCallback((section) => {
    const newItem = createItem(section);
    setCurriculum(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem]
    }));
  }, [setCurriculum]);

  const updateItem = useCallback((section, id, field, value) => {
    setCurriculum(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, [setCurriculum]);

  const removeItem = useCallback((section, id) => {
    setCurriculum(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== id)
    }));
  }, [setCurriculum]);

  const toggleSendToApplication = useCallback((section, id) => {
    setCurriculum(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item =>
        item.id === id ? { ...item, sendToApplication: !item.sendToApplication } : item
      )
    }));
  }, [setCurriculum]);

  const getItemsForApplication = useCallback((section) => {
    return (curriculum[section] || []).filter(item => item.sendToApplication);
  }, [curriculum]);

  const getSectionCount = useCallback((section) => {
    return (curriculum[section] || []).length;
  }, [curriculum]);

  const resetCurriculum = useCallback(() => {
    setCurriculum(defaultCurriculum);
  }, [setCurriculum]);

  return {
    curriculum,
    setCurriculum,
    addItem,
    updateItem,
    removeItem,
    toggleSendToApplication,
    getItemsForApplication,
    getSectionCount,
    resetCurriculum
  };
};

export default useCurriculum;
