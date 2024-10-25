const FormInput = ({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  className = "",
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`block w-full rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 px-3 py-2.5 text-gray-900 dark:text-gray-100 
        shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none 
        focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 
        ${className}`}
    />
  </div>
);

export default FormInput;