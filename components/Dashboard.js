// 1. Configuración de actividad (Igual que antes)
const getActivityConfig = (type) => {
  const config = {
    contact: { color: 'bg-blue-500', icon: 'user-plus' },
    deal: { color: 'bg-green-500', icon: 'handshake' },
    ticket: { color: 'bg-orange-500', icon: 'alert-circle' },
    purchase: { color: 'bg-purple-500', icon: 'shopping-bag' },
    meeting: { color: 'bg-indigo-500', icon: 'calendar' },
    proposal: { color: 'bg-gray-500', icon: 'file-text' }
  };
  
  return config[type] || { color: 'bg-gray-500', icon: 'file-text' };
};

function Dashboard() {
  // Datos estáticos (Stats) - AGREGAMOS ID A CADA UNO
  const stats = [
    { id: 1, title: 'Total Contactos', value: '1,247', icon: 'users', color: 'bg-azul-oscuro', trend: 'up', trendValue: '+12%' },
    { id: 2, title: 'Negocios Activos', value: '89', icon: 'briefcase', color: 'bg-rosa-viejo', trend: 'up', trendValue: '+8%' },
    { id: 3, title: 'Compras Este Mes', value: '$45,230', icon: 'shopping-cart', color: 'bg-rosa-claro', trend: 'down', trendValue: '-3%' },
    { id: 4, title: 'Tickets Abiertos', value: '23', icon: 'ticket', color: 'bg-azul-cielo', trend: 'up', trendValue: '+5%' },
    { id: 5, title: 'Ingresos Mensuales', value: '$128,450', icon: 'dollar-sign', color: 'bg-azul-grisaceo', trend: 'up', trendValue: '+15%' },
    { id: 6, title: 'Tasa Conversión', value: '12.5%', icon: 'target', color: 'bg-azul-profundo', trend: 'up', trendValue: '+2.1%' }
  ];

  // Datos estáticos (Activities) - AGREGAMOS ID A CADA UNO
  const recentActivities = [
    { id: 1, action: 'Nuevo contacto agregado', user: 'Juan Pérez', time: 'Hace 2 horas', type: 'contact' },
    { id: 2, action: 'Negocio cerrado exitosamente', user: 'María García', time: 'Hace 4 horas', type: 'deal' },
    { id: 3, action: 'Ticket resuelto', user: 'Carlos López', time: 'Hace 1 día', type: 'ticket' },
    { id: 4, action: 'Nueva compra registrada', user: 'Ana Martínez', time: 'Hace 2 días', type: 'purchase' },
    { id: 5, action: 'Reunión programada', user: 'Diego Ruiz', time: 'Hace 3 horas', type: 'meeting' },
    { id: 6, action: 'Propuesta enviada', user: 'Laura Sánchez', time: 'Hace 6 horas', type: 'proposal' }
  ];

  return (
    <div className="space-y-6" data-name="dashboard" data-file="components/Dashboard.js">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <div className="text-sm text-gray-600">
          Última actualización: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Grid de Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CORRECCIÓN: Usamos stat.id en lugar de index */}
        {stats.map((stat) => (
          <KPICard
            key={stat.id} 
            {...stat}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sección Actividad Reciente */}
        <div className="glass-effect p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">Actividad Reciente</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {/* CORRECCIÓN: Usamos activity.id en lugar de index */}
            {recentActivities.map((activity) => {
              const { color, icon } = getActivityConfig(activity.type);
              
              return (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color}`}>
                    <div className={`icon-${icon} text-white text-sm`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-primary">{activity.action}</p>
                    <p className="text-sm text-gray-600">por {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sección Métricas Rápidas */}
        <div className="glass-effect p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-primary mb-4">Métricas Rápidas</h3>
          <div className="space-y-4">
            <MetricRow label="Tasa de Conversión" value="12.5%" color="text-green-600" />
            <MetricRow label="Satisfacción Cliente" value="94%" color="text-blue-600" />
            <MetricRow label="Tiempo Respuesta" value="2.3h" color="text-orange-600" />
            <MetricRow label="Ventas Mensuales" value="$128,450" color="text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar
const MetricRow = ({ label, value, color }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className={`font-semibold ${color}`}>{value}</span>
  </div>
);
