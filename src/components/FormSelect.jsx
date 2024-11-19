import React from 'react';

const FormSelect = ({
  id,
  name,
  options,
  defaultValue,
  onChange,
  label,
  required = false,
  className = '',
  labelClassName = '',
  error,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-medium text-gray-900 ${labelClassName}`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`mt-2 block w-full rounded-md border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-teal-600 sm:text-sm ${className}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};

export default FormSelect;
