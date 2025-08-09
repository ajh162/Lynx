function KPICard({ title, value, icon, color, trend, trendValue }) {
  try {
    return (
      <div className={`glass-effect p-6 rounded-lg kpi-card ${color}`} data-name="kpi-card" data-file="components/KPICard.js">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm mb-1">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
            {trend && (
              <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`icon-${trend === 'up' ? 'trending-up' : 'trending-down'} text-xs mr-1`}></div>
                <span>{trendValue}</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
            <div className={`icon-${icon} text-xl text-white`}></div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('KPICard component error:', error);
    return null;
  }
}