// Componente Card reutilizável - Átomo básico
export default function Card({ 
  children, 
  className = '',
  padding = 'medium',
  shadow = true,
  border = true
}) {
  const baseClasses = 'bg-white rounded-lg'
  
  const paddingClasses = {
    none: '',
    small: 'p-3',
    medium: 'p-6',
    large: 'p-8'
  }
  
  const shadowClass = shadow ? 'shadow-sm hover:shadow-md transition-shadow duration-200' : ''
  const borderClass = border ? 'border border-gray-200' : ''
  
  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClass} ${borderClass} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}
