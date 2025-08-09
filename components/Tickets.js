function Tickets() {
  try {
    const [tickets, setTickets] = React.useState([
      { id: 1, title: 'Error en sistema de facturación', customer: 'TechCorp', priority: 'Alta', status: 'Abierto', assignee: 'Juan Pérez', created: '2024-01-15' },
      { id: 2, title: 'Solicitud de nueva funcionalidad', customer: 'StartupXYZ', priority: 'Media', status: 'En Progreso', assignee: 'María García', created: '2024-01-18' },
      { id: 3, title: 'Problema de conectividad', customer: 'Consultora ABC', priority: 'Alta', status: 'Resuelto', assignee: 'Carlos López', created: '2024-01-20' },
      { id: 4, title: 'Consulta sobre integración', customer: 'Digital Solutions', priority: 'Baja', status: 'Abierto', assignee: 'Ana Martínez', created: '2024-01-22' }
    ]);

    const [showModal, setShowModal] = React.useState(false);
    const [editingTicket, setEditingTicket] = React.useState(null);
    const [newTicket, setNewTicket] = React.useState({
      title: '', customer: '', priority: 'Media', status: 'Abierto', assignee: ''
    });

    const getPriorityColor = (priority) => {
      switch(priority) {
        case 'Alta': return 'bg-red-100 text-red-800';
        case 'Media': return 'bg-yellow-100 text-yellow-800';
        case 'Baja': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusColor = (status) => {
      switch(status) {
        case 'Abierto': return 'bg-blue-100 text-blue-800';
        case 'En Progreso': return 'bg-orange-100 text-orange-800';
        case 'Resuelto': return 'bg-green-100 text-green-800';
        case 'Cerrado': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const handleAddTicket = () => {
      if (newTicket.title && newTicket.customer && newTicket.assignee) {
        if (editingTicket) {
          setTickets(tickets.map(t => t.id === editingTicket.id ? 
            { ...editingTicket, ...newTicket } : t
          ));
          setEditingTicket(null);
        } else {
          setTickets([...tickets, { 
            id: tickets.length + 1, 
            ...newTicket,
            created: new Date().toISOString().split('T')[0]
          }]);
        }
        setNewTicket({ title: '', customer: '', priority: 'Media', status: 'Abierto', assignee: '' });
        setShowModal(false);
      }
    };

    const handleEditTicket = (ticket) => {
      setEditingTicket(ticket);
      setNewTicket(ticket);
      setShowModal(true);
    };

    const handleDeleteTicket = (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar este ticket?')) {
        setTickets(tickets.filter(t => t.id !== id));
      }
    };

    const openTickets = tickets.filter(t => t.status === 'Abierto').length;
    const inProgressTickets = tickets.filter(t => t.status === 'En Progreso').length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resuelto').length;

    return (
      <div className="space-y-6" data-name="tickets" data-file="components/Tickets.js">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Gestión de Tickets</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <div className="icon-plus text-sm"></div>
            <span>Nuevo Ticket</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Total Tickets</h3>
            <p className="text-2xl font-bold text-secondary">{tickets.length}</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Abiertos</h3>
            <p className="text-2xl font-bold text-blue-600">{openTickets}</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">En Progreso</h3>
            <p className="text-2xl font-bold text-orange-600">{inProgressTickets}</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Resueltos</h3>
            <p className="text-2xl font-bold text-green-600">{resolvedTickets}</p>
          </div>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white bg-opacity-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Prioridad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Asignado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-20">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-white hover:bg-opacity-10">
                    <td className="px-6 py-4 text-sm font-medium text-primary">#{ticket.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-primary">{ticket.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.customer}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.assignee}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="btn-group" role="group">
                        <button 
                          onClick={() => handleEditTicket(ticket)}
                          className="btn btn-sm btn-outline-primary"
                          title="Editar"
                        >
                          <div className="bi bi-pencil"></div>
                        </button>
                        <button 
                          onClick={() => handleDeleteTicket(ticket.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar"
                        >
                          <div className="icon-trash-2"></div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-primary">
                    {editingTicket ? 'Editar Ticket' : 'Nuevo Ticket'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setEditingTicket(null);
                      setNewTicket({ title: '', customer: '', priority: 'Media', status: 'Abierto', assignee: '' });
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título del ticket</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTicket.customer}
                      onChange={(e) => setNewTicket({...newTicket, customer: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prioridad</label>
                    <select
                      className="form-select"
                      value={newTicket.priority}
                      onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                    >
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={newTicket.status}
                      onChange={(e) => setNewTicket({...newTicket, status: e.target.value})}
                    >
                      <option value="Abierto">Abierto</option>
                      <option value="En Progreso">En Progreso</option>
                      <option value="Resuelto">Resuelto</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Asignado a</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newTicket.assignee}
                      onChange={(e) => setNewTicket({...newTicket, assignee: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingTicket(null);
                      setNewTicket({ title: '', customer: '', priority: 'Media', status: 'Abierto', assignee: '' });
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddTicket}
                  >
                    {editingTicket ? 'Actualizar' : 'Crear Ticket'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Tickets component error:', error);
    return null;
  }
}