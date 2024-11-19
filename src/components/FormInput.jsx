import React from 'react';

const FormInput = ({
  htmlFor,
  label,
  id,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  type = 'text',
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-2">
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md border-0 py-1.5 px-2.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm/6 ${
            error
              ? 'text-red-900 ring-red-400 placeholder:text-red-300 focus:ring-red-500'
              : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-teal-600'
          }`}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>

      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};

export default FormInput;
