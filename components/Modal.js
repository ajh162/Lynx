function Modal({ children, onClose, title, size = 'md' }) {
  try {
    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md', 
      lg: 'max-w-lg',
      xl: 'max-w-xl'
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="modal" data-file="components/Modal.js">
        <div className={`glass-effect p-6 rounded-lg w-full ${sizeClasses[size]} max-h-96 overflow-y-auto`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <div className="icon-x text-xl"></div>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Modal component error:', error);
    return null;
  }
}