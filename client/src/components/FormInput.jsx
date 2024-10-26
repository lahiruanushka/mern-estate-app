import React from 'react';

const FormInput = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  min,
  max,
  required,
  className = "",
  suffix,
  rows,
}) => {
  const inputClasses = `block w-full rounded-lg border border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 
    shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200
    ${suffix ? 'pr-16' : ''} 
    ${className}`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {label}
      </label>
      
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows || 4}
            className={inputClasses}
            required={required}
          />
        ) : (
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            max={max}
            required={required}
            className={inputClasses}
          />
        )}
        {suffix && (
          <span className="absolute right-3 top-3 text-sm text-gray-500 dark:text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormInput;