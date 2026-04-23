import { useState, useCallback } from 'react';

const validationRules = {
  required: (value, label) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${label || 'Este campo'} es obligatorio`;
    }
    return '';
  },
  email: (value) => {
    if (!value) return 'El email es obligatorio';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Email inválido (ej: usuario@dominio.com)';
    return '';
  },
  phone: (value) => {
    if (!value) return '';
    if (!/^[+]?[\d\s()-]{6,20}$/.test(value)) return 'Teléfono inválido (ej: +34 600 000 000)';
    return '';
  },
  password: (value) => {
    if (!value) return 'La contraseña es obligatoria';
    if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  },
  confirmPassword: (value, values) => {
    if (!value) return 'Confirma tu contraseña';
    if (value !== values.password) return 'Las contraseñas no coinciden';
    return '';
  },
  url: (value) => {
    if (!value) return '';
    try {
      new URL(value);
      return '';
    } catch {
      return 'URL inválida (ej: https://ejemplo.com)';
    }
  },
  minLength: (value, min, label) => {
    if (value && value.length < min) return `${label || 'Este campo'} debe tener al menos ${min} caracteres`;
    return '';
  }
};

const useForm = (initialValues = {}, validate = null) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: fieldValue }));

    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    if (validate) {
      const validationErrors = validate(values);
      setErrors(prev => ({ ...prev, [name]: validationErrors[name] || '' }));
    }
  }, [values, validate]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTouched(
      Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (error) {
      setErrors(prev => ({ ...prev, general: error.message || 'Error al enviar el formulario' }));
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  const reset = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const hasErrors = Object.keys(errors).some(key => errors[key]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    hasErrors,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setValues
  };
};

export { validationRules };
export default useForm;
