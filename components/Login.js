function Login({ onLogin }) {
  try {
    const [formData, setFormData] = React.useState({
      email: '',
      password: ''
    });
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      if (!formData.email || !formData.password) {
        setError('Por favor completa todos los campos');
        setLoading(false);
        return;
      }

      const success = onLogin(formData);
      if (!success) {
        setError('Credenciales inválidas');
      }
      setLoading(false);
    };

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div 
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")'
        }}
        data-name="login-container" 
        data-file="components/Login.js"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        <div className="relative z-10 min-h-screen grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1">
          <div className="hidden md:flex items-center justify-center p-8">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-6">Lynx</h1>
              <p className="text-xl opacity-90">Gestiona tus relaciones comerciales de manera inteligente</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-8">
            <div className="glass-effect p-8 w-full max-w-md">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h2>
                <p className="text-gray-200">Accede a tu panel de control</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@crm.com"
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="admin123"
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                </div>

                {error && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
              </form>

              <div className="mt-6 text-center text-gray-300 text-sm">
                <p>Demo: admin@crm.com / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Login component error:', error);
    return null;
  }
}