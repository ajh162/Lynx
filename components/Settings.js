function Settings({ onViewChange }) {
  try {
    const [activeTab, setActiveTab] = React.useState('general');
    const [settings, setSettings] = React.useState({
      companyName: 'CRM Pro',
      companyEmail: 'admin@crm.com',
      timezone: 'Europe/Madrid',
      currency: 'EUR',
      language: 'es',
      notifications: true,
      emailAlerts: true,
      darkMode: false
    });

    const handleSettingChange = (key, value) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    const tabs = [
      { id: 'general', label: 'General', icon: 'settings' },
      { id: 'users', label: 'Usuarios', icon: 'users' },
      { id: 'integrations', label: 'Integraciones', icon: 'link' },
      { id: 'security', label: 'Seguridad', icon: 'shield' }
    ];

    return (
      <div className="space-y-6" data-name="settings" data-file="components/Settings.js">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Configuración</h1>
            <p className="text-gray-600">Administra la configuración del sistema</p>
          </div>
          <button
            onClick={() => onViewChange('dashboard')}
            className="btn-primary flex items-center space-x-2"
          >
            <div className="icon-arrow-left text-sm"></div>
            <span>Volver</span>
          </button>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden">
          <div className="flex border-b border-white border-opacity-20">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-primary hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <div className={`icon-${tab.icon} text-sm`}></div>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Configuración General</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de la Empresa
                    </label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange('companyName', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email de la Empresa
                    </label>
                    <input
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleSettingChange('companyEmail', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona Horaria
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                      <option value="America/New_York">Nueva York (GMT-5)</option>
                      <option value="Asia/Tokyo">Tokio (GMT+9)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moneda
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) => handleSettingChange('currency', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dólar ($)</option>
                      <option value="GBP">Libra (£)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-primary">Preferencias</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                        className="rounded"
                      />
                      <span>Activar notificaciones del sistema</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.emailAlerts}
                        onChange={(e) => handleSettingChange('emailAlerts', e.target.checked)}
                        className="rounded"
                      />
                      <span>Recibir alertas por email</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={settings.darkMode}
                        onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                        className="rounded"
                      />
                      <span>Modo oscuro</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-primary">Gestión de Usuarios</h3>
                  <button className="btn-primary">Nuevo Usuario</button>
                </div>
                <div className="text-center py-8">
                  <div className="icon-users text-4xl text-gray-400 mb-4"></div>
                  <p className="text-gray-500">Funcionalidad de usuarios en desarrollo</p>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Integraciones</h3>
                <div className="text-center py-8">
                  <div className="icon-link text-4xl text-gray-400 mb-4"></div>
                  <p className="text-gray-500">Integraciones disponibles próximamente</p>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary">Configuración de Seguridad</h3>
                <div className="text-center py-8">
                  <div className="icon-shield text-4xl text-gray-400 mb-4"></div>
                  <p className="text-gray-500">Configuración de seguridad en desarrollo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">Guardar Cambios</button>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Settings component error:', error);
    return null;
  }
}