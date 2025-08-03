// Componente Input reutilizável - Átomo básico
export default function Input({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  className = '',
  ...props
}) {
  const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200'
  
  const stateClasses = error 
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
    
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
  
  const classes = `${baseClasses} ${stateClasses} ${disabledClasses} ${className}`
  
  return (
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={classes}
      {...props}
    />
  )
}
