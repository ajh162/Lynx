function Contacts() {
  try {
    const [emailModal, setEmailModal] = React.useState({ isOpen: false, contact: null });
    const [contacts, setContacts] = React.useState([
      { id: 1, name: 'Juan Carlos Pérez', email: 'juan.perez@abccorp.com', phone: '+1234567890', company: 'Empresa ABC Corp', status: 'Cliente', position: 'Gerente General', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', created: '9/1/2024', notes: 'Cliente VIP con historial de compras importantes' },
      { id: 2, name: 'María Elena González', email: 'maria.gonzalez@innovacionxyz.com', phone: '+0987654321', company: 'Innovación XYZ S.A.', status: 'Prospecto', position: 'Directora de Compras', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150', created: '8/1/2024', notes: 'Interesada en soluciones tecnológicas' },
      { id: 3, name: 'Roberto Silva', email: 'roberto.silva@techstart.com', phone: '+1122334455', company: 'TechStart Solutions', status: 'Socio', position: 'CEO', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', created: '7/1/2024', notes: 'Socio estratégico para proyectos de tecnología' },
      { id: 4, name: 'Ana Martínez', email: 'ana.martinez@deltaent.com', phone: '+5566778899', company: 'Delta Enterprises', status: 'Cliente', position: 'Jefa de Proyectos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', created: '9/1/2024', notes: 'Cliente con historial de compras importantes' },
      { id: 5, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@megacorp.com', phone: '+9988776655', company: 'Mega Corp International', status: 'Prospecto', position: 'Director Comercial', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', created: '8/1/2024', notes: 'Interesado en servicios de consultoría' },
      { id: 6, name: 'Laura Fernández', email: 'laura.fernandez@efficientsys.com', phone: '+3344556677', company: 'Efficient Systems Ltd', status: 'Proveedor', position: 'Gerente de Operaciones', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', created: '7/1/2024', notes: 'Proveedor de servicios de sistemas' }
    ]);
    const [showModal, setShowModal] = React.useState(false);
    const [editingContact, setEditingContact] = React.useState(null);
    const [viewingContact, setViewingContact] = React.useState(null);
    const [filters, setFilters] = React.useState({
      category: 'Todas las categorías',
      name: '',
      company: ''
    });
    const [newContact, setNewContact] = React.useState({
      name: '', email: '', phone: '', company: '', status: 'Prospecto', position: '', notes: ''
    });

    const handleAddContact = () => {
      if (newContact.name && newContact.email) {
        if (editingContact) {
          setContacts(contacts.map(c => c.id === editingContact.id ? { ...editingContact, ...newContact } : c));
          setEditingContact(null);
        } else {
          setContacts([...contacts, { 
            id: contacts.length + 1, 
            ...newContact,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
            created: new Date().toLocaleDateString()
          }]);
        }
        setNewContact({ name: '', email: '', phone: '', company: '', status: 'Prospecto', position: '', notes: '' });
        setShowModal(false);
      }
    };

    const handleEditContact = (contact) => {
      setEditingContact(contact);
      setNewContact(contact);
      setShowModal(true);
    };

    const handleDeleteContact = (id) => {
      setContacts(contacts.filter(c => c.id !== id));
    };

    const getStatusColor = (status) => {
      switch(status) {
        case 'Cliente': return 'bg-green-100 text-green-800';
        case 'Prospecto': return 'bg-orange-100 text-orange-800';
        case 'Socio': return 'bg-purple-100 text-purple-800';
        case 'Proveedor': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const filteredContacts = contacts.filter(contact => {
      return (filters.category === 'Todas las categorías' || contact.status === filters.category) &&
             contact.name.toLowerCase().includes(filters.name.toLowerCase()) &&
             contact.company.toLowerCase().includes(filters.company.toLowerCase());
    });

    const statusCounts = {
      total: contacts.length,
      clientes: contacts.filter(c => c.status === 'Cliente').length,
      prospectos: contacts.filter(c => c.status === 'Prospecto').length,
      socios: contacts.filter(c => c.status === 'Socio').length
    };

    return (
      <div className="space-y-6" data-name="contacts" data-file="components/Contacts.js">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">Gestión de Contactos</h1>
            <p className="text-gray-600">Administra tu red de contactos comerciales</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center space-x-2">
              <div className="icon-download text-sm"></div>
              <span>Exportar</span>
            </button>
            <button
              onClick={() => {
                setEditingContact(null);
                setNewContact({ name: '', email: '', phone: '', company: '', status: 'Prospecto', position: '', notes: '' });
                setShowModal(true);
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <div className="icon-plus text-sm"></div>
              <span>Nuevo Contacto</span>
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="glass-effect p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Categoría</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Todas las categorías">Todas las categorías</option>
                <option value="Cliente">Clientes</option>
                <option value="Prospecto">Prospectos</option>
                <option value="Socio">Socios</option>
                <option value="Proveedor">Proveedores</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por Nombre</label>
              <input
                type="text"
                placeholder="Nombre del contacto"
                value={filters.name}
                onChange={(e) => setFilters({...filters, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Buscar por Empresa</label>
              <input
                type="text"
                placeholder="Nombre de la empresa"
                value={filters.company}
                onChange={(e) => setFilters({...filters, company: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-effect p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-primary">{statusCounts.total}</div>
            <div className="text-sm text-gray-600">Total Contactos</div>
          </div>
          <div className="glass-effect p-6 rounded-lg text-center bg-green-50">
            <div className="text-3xl font-bold text-green-600">{statusCounts.clientes}</div>
            <div className="text-sm text-gray-600">Clientes</div>
          </div>
          <div className="glass-effect p-6 rounded-lg text-center bg-orange-50">
            <div className="text-3xl font-bold text-orange-600">{statusCounts.prospectos}</div>
            <div className="text-sm text-gray-600">Prospectos</div>
          </div>
          <div className="glass-effect p-6 rounded-lg text-center bg-purple-50">
            <div className="text-3xl font-bold text-purple-600">{statusCounts.socios}</div>
            <div className="text-sm text-gray-600">Socios</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="glass-effect p-6 rounded-lg hover:shadow-lg transition-all">
              <div className="flex items-start space-x-4 mb-4">
                <img 
                  src={contact.avatar} 
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{contact.name}</h3>
                  <p className="text-sm text-gray-600">{contact.position}</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contact.status)} mt-1`}>
                    {contact.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="icon-building"></div>
                  <span>{contact.company}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="icon-mail"></div>
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="icon-phone"></div>
                  <span>{contact.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <div className="icon-calendar"></div>
                  <span>Creado: {contact.created}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditContact(contact)}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center justify-center space-x-1"
                >
                  <div className="icon-edit text-sm"></div>
                  <span>Editar</span>
                </button>
                <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                  <div className="icon-phone text-sm"></div>
                </button>
                <button 
                  onClick={() => setEmailModal({ isOpen: true, contact })}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                >
                  <div className="icon-mail text-sm"></div>
                </button>
                <button 
                  onClick={() => handleDeleteContact(contact.id)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                  <div className="icon-trash-2 text-sm"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="glass-effect p-6 rounded-lg w-full max-w-md max-h-96 overflow-y-auto">
              <h3 className="text-xl font-semibold text-primary mb-4">
                {editingContact ? 'Editar Contacto' : 'Nuevo Contacto'}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Empresa"
                  value={newContact.company}
                  onChange={(e) => setNewContact({...newContact, company: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Posición"
                  value={newContact.position}
                  onChange={(e) => setNewContact({...newContact, position: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={newContact.status}
                  onChange={(e) => setNewContact({...newContact, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Prospecto">Prospecto</option>
                  <option value="Cliente">Cliente</option>
                  <option value="Socio">Socio</option>
                  <option value="Proveedor">Proveedor</option>
                </select>
                <textarea
                  placeholder="Notas adicionales"
                  value={newContact.notes}
                  onChange={(e) => setNewContact({...newContact, notes: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows="3"
                />
              </div>
              <div className="flex space-x-3 mt-6">
                <button onClick={handleAddContact} className="btn-primary flex-1">Guardar</button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <EmailModal
          isOpen={emailModal.isOpen}
          onClose={() => setEmailModal({ isOpen: false, contact: null })}
          contactEmail={emailModal.contact?.email}
          contactName={emailModal.contact?.name}
        />
      </div>
    );
  } catch (error) {
    console.error('Contacts component error:', error);
    return null;
  }
}