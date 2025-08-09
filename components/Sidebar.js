function Sidebar({ currentView, onViewChange, onLogout }) {
  try {
    const menuItems = [
      { id: 'dashboard', label: 'Panel Principal', icon: 'chart-bar' },
      { id: 'contacts', label: 'Contactos', icon: 'users' },
      { id: 'deals', label: 'Negocios', icon: 'briefcase' },
      { id: 'purchases', label: 'Compras', icon: 'shopping-cart' },
      { id: 'tickets', label: 'Tickets', icon: 'ticket' },
      { id: 'settings', label: 'Configuración', icon: 'settings' }
    ];

    return (
      <div 
        className="w-64 sidebarbg text-white min-h-screen p-6"
        data-name="sidebar" 
        data-file="components/Sidebar.js"
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Lynx</h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map(item => (
            <div
              key={item.id}
              className={`sidebar-item flex items-center space-x-3 ${
                currentView === item.id ? 'active' : ''
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <div className={`icon-${item.icon} text-xl`}></div>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-gray-600 pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <div className="icon-user text-white"></div>
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-sm text-gray-300">admin@crm.com</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <div className="icon-log-out"></div>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Sidebar component error:', error);
    return null;
  }
}
