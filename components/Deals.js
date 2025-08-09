function Deals() {
  try {
    const [deals, setDeals] = React.useState([
      { id: 1, title: 'Proyecto Web Corporativa', client: 'TechCorp', value: 25000, stage: 'Negociación', probability: 80, closeDate: '2024-02-15' },
      { id: 2, title: 'Sistema CRM Personalizado', client: 'StartupXYZ', value: 45000, stage: 'Propuesta', probability: 60, closeDate: '2024-03-01' },
      { id: 3, title: 'Consultoría Digital', client: 'Consultora ABC', value: 15000, stage: 'Calificado', probability: 40, closeDate: '2024-02-28' },
      { id: 4, title: 'Aplicación Móvil', client: 'Digital Solutions', value: 35000, stage: 'Cerrado', probability: 100, closeDate: '2024-01-20' }
    ]);

    const getStageColor = (stage) => {
      switch(stage) {
        case 'Prospecto': return 'bg-gray-100 text-gray-800';
        case 'Calificado': return 'bg-yellow-100 text-yellow-800';
        case 'Propuesta': return 'bg-blue-100 text-blue-800';
        case 'Negociación': return 'bg-orange-100 text-orange-800';
        case 'Cerrado': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const [showModal, setShowModal] = React.useState(false);
    const [editingDeal, setEditingDeal] = React.useState(null);
    const [newDeal, setNewDeal] = React.useState({
      title: '', client: '', value: '', stage: 'Prospecto', probability: 20, closeDate: ''
    });

    const handleAddDeal = () => {
      if (newDeal.title && newDeal.client && newDeal.value) {
        if (editingDeal) {
          setDeals(deals.map(d => d.id === editingDeal.id ? { ...editingDeal, ...newDeal, value: parseFloat(newDeal.value) } : d));
          setEditingDeal(null);
        } else {
          setDeals([...deals, { 
            id: deals.length + 1, 
            ...newDeal,
            value: parseFloat(newDeal.value)
          }]);
        }
        setNewDeal({ title: '', client: '', value: '', stage: 'Prospecto', probability: 20, closeDate: '' });
        setShowModal(false);
      }
    };

    const handleEditDeal = (deal) => {
      setEditingDeal(deal);
      setNewDeal({ ...deal, value: deal.value.toString() });
      setShowModal(true);
    };

    const handleDeleteDeal = (id) => {
      setDeals(deals.filter(d => d.id !== id));
    };

    return (
      <div className="space-y-6" data-name="deals" data-file="components/Deals.js">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Gestión de Negocios</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <div className="icon-plus text-sm"></div>
            <span>Nuevo Negocio</span>
          </button>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white bg-opacity-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Etapa</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Probabilidad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Cierre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-20">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white hover:bg-opacity-10">
                    <td className="px-6 py-4 text-sm font-medium text-primary">{deal.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{deal.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${deal.value.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(deal.stage)}`}>
                        {deal.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{deal.probability}%</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{deal.closeDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="btn-group" role="group">
                        <button 
                          onClick={() => handleEditDeal(deal)}
                          className="btn btn-sm btn-outline-primary"
                          title="Editar">
                          <div className="bi bi-pencil"></div>
                        </button>
                        <button 
                          onClick={() => handleDeleteDeal(deal.id)}
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar">
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
                    {editingDeal ? 'Editar Negocio' : 'Nuevo Negocio'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setEditingDeal(null);
                      setNewDeal({ title: '', client: '', value: '', stage: 'Prospecto', probability: 20, closeDate: '' });
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Título del negocio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newDeal.title}
                      onChange={(e) => setNewDeal({...newDeal, title: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newDeal.client}
                      onChange={(e) => setNewDeal({...newDeal, client: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Valor ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newDeal.value}
                      onChange={(e) => setNewDeal({...newDeal, value: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Etapa</label>
                    <select
                      className="form-select"
                      value={newDeal.stage}
                      onChange={(e) => setNewDeal({...newDeal, stage: e.target.value})}
                    >
                      <option value="Prospecto">Prospecto</option>
                      <option value="Calificado">Calificado</option>
                      <option value="Propuesta">Propuesta</option>
                      <option value="Negociación">Negociación</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha de cierre</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newDeal.closeDate}
                      onChange={(e) => setNewDeal({...newDeal, closeDate: e.target.value})}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingDeal(null);
                      setNewDeal({ title: '', client: '', value: '', stage: 'Prospecto', probability: 20, closeDate: '' });
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddDeal}
                  >
                    {editingDeal ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Deals component error:', error);
    return null;
  }
}
