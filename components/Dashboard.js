function Dashboard() {
  try {
    const stats = [
      { title: 'Total Contactos', value: '1,247', icon: 'users', color: 'bg-azul-oscuro', trend: 'up', trendValue: '+12%' },
      { title: 'Negocios Activos', value: '89', icon: 'briefcase', color: 'bg-rosa-viejo', trend: 'up', trendValue: '+8%' },
      { title: 'Compras Este Mes', value: '$45,230', icon: 'shopping-cart', color: 'bg-rosa-claro', trend: 'down', trendValue: '-3%' },
      { title: 'Tickets Abiertos', value: '23', icon: 'ticket', color: 'bg-azul-cielo', trend: 'up', trendValue: '+5%' },
      { title: 'Ingresos Mensuales', value: '$128,450', icon: 'dollar-sign', color: 'bg-azul-grisaceo', trend: 'up', trendValue: '+15%' },
      { title: 'Tasa Conversión', value: '12.5%', icon: 'target', color: 'bg-azul-profundo', trend: 'up', trendValue: '+2.1%' }
    ];



    const recentActivities = [
      { action: 'Nuevo contacto agregado', user: 'Juan Pérez', time: 'Hace 2 horas', type: 'contact' },
      { action: 'Negocio cerrado exitosamente', user: 'María García', time: 'Hace 4 horas', type: 'deal' },
      { action: 'Ticket resuelto', user: 'Carlos López', time: 'Hace 1 día', type: 'ticket' },
      { action: 'Nueva compra registrada', user: 'Ana Martínez', time: 'Hace 2 días', type: 'purchase' },
      { action: 'Reunión programada', user: 'Diego Ruiz', time: 'Hace 3 horas', type: 'meeting' },
      { action: 'Propuesta enviada', user: 'Laura Sánchez', time: 'Hace 6 horas', type: 'proposal' }
    ];

    return (
      <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.js">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
          <div className="text-sm text-gray-600">
            Última actualización: {new Date().toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <KPICard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              trend={stat.trend}
              trendValue={stat.trendValue}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Actividad Reciente</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'contact' ? 'bg-blue-500' :
                    activity.type === 'deal' ? 'bg-green-500' :
                    activity.type === 'ticket' ? 'bg-orange-500' :
                    activity.type === 'purchase' ? 'bg-purple-500' :
                    activity.type === 'meeting' ? 'bg-indigo-500' : 'bg-gray-500'
                  }`}>
                    <div className={`icon-${
                      activity.type === 'contact' ? 'user-plus' :
                      activity.type === 'deal' ? 'handshake' :
                      activity.type === 'ticket' ? 'alert-circle' :
                      activity.type === 'purchase' ? 'shopping-bag' :
                      activity.type === 'meeting' ? 'calendar' : 'file-text'
                    } text-white text-sm`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary">{activity.action}</p>
                    <p className="text-sm text-gray-600">por {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Métricas Rápidas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tasa de Conversión</span>
                <span className="font-semibold text-green-600">12.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Satisfacción Cliente</span>
                <span className="font-semibold text-blue-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tiempo Respuesta</span>
                <span className="font-semibold text-orange-600">2.3h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ventas Mensuales</span>
                <span className="font-semibold text-purple-600">$128,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Dashboard component error:', error);
    return null;
  }
}