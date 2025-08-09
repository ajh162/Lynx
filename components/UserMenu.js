function UserMenu({ onLogout }) {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(false);

    const menuItems = [
      { label: 'Mi Perfil', icon: 'user', action: () => setShowProfile(true) },
      { label: 'Configuración', icon: 'settings', action: () => window.location.hash = 'settings' },
      { label: 'Notificaciones', icon: 'bell', action: () => {} },
      { label: 'Ayuda', icon: 'help-circle', action: () => {} },
      { label: 'Cerrar Sesión', icon: 'log-out', action: onLogout }
    ];

    return (
      <div className="relative" data-name="user-menu" data-file="components/UserMenu.js">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 glass-effect p-3 rounded-lg hover:bg-white hover:bg-opacity-30 transition-all"
        >
          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
            <div className="icon-user text-white"></div>
          </div>
          <div className="text-left">
            <p className="font-medium text-primary">Admin User</p>
            <p className="text-sm text-gray-600">admin@crm.com</p>
          </div>
          <div className={`icon-chevron-down text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}></div>
        </button>

        {isOpen && (
          <div className="user-menu glass-effect mt-2 rounded-lg overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-white hover:bg-opacity-20 flex items-center space-x-3 text-primary"
              >
                <div className={`icon-${item.icon} text-sm`}></div>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {showProfile && (
          <Modal onClose={() => setShowProfile(false)} title="Mi Perfil">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="icon-user text-white text-2xl"></div>
                </div>
                <h3 className="text-xl font-semibold text-primary">Admin User</h3>
                <p className="text-gray-600">Administrador del Sistema</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" value="admin@crm.com" className="w-full px-3 py-2 border rounded-lg" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input type="tel" value="+34 600 123 456" className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  } catch (error) {
    console.error('UserMenu component error:', error);
    return null;
  }
}