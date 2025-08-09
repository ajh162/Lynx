class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-black"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  try {
    const [currentView, setCurrentView] = React.useState('dashboard');

    const handleLogout = () => {
      localStorage.removeItem('crm_token');
      window.location.reload();
    };

    const renderContent = () => {
      switch(currentView) {
        case 'contacts': return <Contacts />;
        case 'deals': return <Deals />;
        case 'purchases': return <Purchases />;
        case 'tickets': return <Tickets />;
        case 'settings': return <Settings onViewChange={setCurrentView} />;
        default: return <Dashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-300" data-name="app" data-file="app.js">
        <div className="flex">
          <Sidebar 
            currentView={currentView} 
            onViewChange={setCurrentView}
            onLogout={handleLogout} 
          />
          <main className="flex-1 p-6 relative">
            <div className="absolute top-4 right-6 z-50">
              <UserMenu onLogout={handleLogout} />
            </div>
            <div className="pt-16">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AppContent component error:', error);
    return null;
  }
}

function App() {
  try {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const checkAuth = () => {
        const token = localStorage.getItem('crm_token');
        setIsAuthenticated(!!token);
        setLoading(false);
      };
      checkAuth();
    }, []);

    const handleLogin = (credentials) => {
      if (credentials.email === 'admin@crm.com' && credentials.password === 'admin123') {
        localStorage.setItem('crm_token', 'mock_token_123');
        setIsAuthenticated(true);
        return true;
      }
      return false;
    };

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
    }

    return <AppContent />;
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
