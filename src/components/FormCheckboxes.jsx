import React from 'react';

const FormCheckboxes = ({ legend, required, options, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm/6 font-medium text-gray-900">
        {legend} {required && <span className="text-red-500">*</span>}
      </label>

      <fieldset className="mt-4">
        <legend className="sr-only">{legend}</legend>
        <div className="space-y-5">
          {options.map((option) => (
            <div key={option.id} className="relative flex items-start">
              <div className="flex h-6 items-center">
                <input
                  id={option.id}
                  name={option.name}
                  type="checkbox"
                  aria-describedby={`${option.id}-description`}
                  className="size-4 rounded border-gray-300 text-teal-600 focus:ring-teal-600"
                  onChange={(e) => onChange(option.id, e.target.checked)}
                  checked={option.checked}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor={option.id}
                  className="font-medium text-gray-900"
                >
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};

export default FormCheckboxes;
