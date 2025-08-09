function EmailModal({ isOpen, onClose, contactEmail, contactName }) {
  try {
    if (!isOpen) return null;

    const handleOpenOutlook = () => {
      const subject = encodeURIComponent(`Contacto desde CRM - ${contactName}`);
      const body = encodeURIComponent(`Hola ${contactName},\n\nEspero que te encuentres bien.\n\nSaludos cordiales.`);
      const outlookUrl = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      
      window.open(outlookUrl, '_blank');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="glass-effect p-6 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-primary">Enviar Email</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <div className="icon-x text-xl"></div>
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="icon-mail text-4xl text-primary mb-4"></div>
              <p className="text-gray-600 mb-2">¿Deseas enviar un email a:</p>
              <p className="font-semibold text-primary">{contactName}</p>
              <p className="text-sm text-gray-500">{contactEmail}</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleOpenOutlook}
                className="flex-1 btn-primary flex items-center justify-center space-x-2"
              >
                <div className="icon-mail text-sm"></div>
                <span>Abrir Outlook</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EmailModal component error:', error);
    return null;
  }
}