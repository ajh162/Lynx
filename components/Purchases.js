function Purchases() {
  try {
    const [purchases, setPurchases] = React.useState([
      { id: 1, product: 'Licencias Software Office', supplier: 'Microsoft Corp', amount: 1200, date: '2024-01-15', status: 'Completada' },
      { id: 2, product: 'Equipos de Cómputo', supplier: 'Dell Technologies', amount: 8500, date: '2024-01-20', status: 'Pendiente' },
      { id: 3, product: 'Servicios Cloud AWS', supplier: 'Amazon Web Services', amount: 2300, date: '2024-01-25', status: 'Completada' },
      { id: 4, product: 'Mobiliario Oficina', supplier: 'IKEA Business', amount: 3200, date: '2024-01-30', status: 'En Proceso' }
    ]);

    const [showModal, setShowModal] = React.useState(false);
    const [editingPurchase, setEditingPurchase] = React.useState(null);
    const [newPurchase, setNewPurchase] = React.useState({
      product: '', supplier: '', amount: '', date: '', status: 'Pendiente'
    });

    const getStatusColor = (status) => {
      switch(status) {
        case 'Completada': return 'bg-green-100 text-green-800';
        case 'Pendiente': return 'bg-yellow-100 text-yellow-800';
        case 'En Proceso': return 'bg-blue-100 text-blue-800';
        case 'Cancelada': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const handleAddPurchase = () => {
      if (newPurchase.product && newPurchase.supplier && newPurchase.amount) {
        if (editingPurchase) {
          setPurchases(purchases.map(p => p.id === editingPurchase.id ? 
            { ...editingPurchase, ...newPurchase, amount: parseFloat(newPurchase.amount) } : p
          ));
          setEditingPurchase(null);
        } else {
          setPurchases([...purchases, { 
            id: purchases.length + 1, 
            ...newPurchase,
            amount: parseFloat(newPurchase.amount)
          }]);
        }
        setNewPurchase({ product: '', supplier: '', amount: '', date: '', status: 'Pendiente' });
        setShowModal(false);
      }
    };

    const handleEditPurchase = (purchase) => {
      setEditingPurchase(purchase);
      setNewPurchase({ ...purchase, amount: purchase.amount.toString() });
      setShowModal(true);
    };

    const handleDeletePurchase = (id) => {
      if (confirm('¿Estás seguro de que deseas eliminar esta compra?')) {
        setPurchases(purchases.filter(p => p.id !== id));
      }
    };

    const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

    return (
      <div className="space-y-6" data-name="purchases" data-file="components/Purchases.js">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">Gestión de Compras</h1>
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <div className="icon-plus text-sm"></div>
            <span>Nueva Compra</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Total Compras</h3>
            <p className="text-2xl font-bold text-secondary">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Este Mes</h3>
            <p className="text-2xl font-bold text-blue-600">${(totalAmount * 0.3).toFixed(0)}</p>
          </div>
          <div className="glass-effect p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-primary">Pendientes</h3>
            <p className="text-2xl font-bold text-orange-600">{purchases.filter(p => p.status === 'Pendiente').length}</p>
          </div>
        </div>

        <div className="glass-effect rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white bg-opacity-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Proveedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Fecha</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-primary uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white divide-opacity-20">
                {purchases.map((purchase) => (
                  <tr key={purchase.id} className="hover:bg-white hover:bg-opacity-10">
                    <td className="px-6 py-4 text-sm font-medium text-primary">{purchase.product}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{purchase.supplier}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${purchase.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{purchase.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(purchase.status)}`}>
                        {purchase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="btn-group" role="group">
                        <button 
                          onClick={() => handleEditPurchase(purchase)}
                          className="btn btn-sm btn-outline-primary"
                          title="Editar"
                        >
                          <div className="bi bi-pencil"></div>
                        </button>
                        <button 
                          onClick={() => handleDeletePurchase(purchase.id)}
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
                    {editingPurchase ? 'Editar Compra' : 'Nueva Compra'}
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => {
                      setShowModal(false);
                      setEditingPurchase(null);
                      setNewPurchase({ product: '', supplier: '', amount: '', date: '', status: 'Pendiente' });
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Producto o servicio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newPurchase.product}
                      onChange={(e) => setNewPurchase({...newPurchase, product: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Proveedor</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newPurchase.supplier}
                      onChange={(e) => setNewPurchase({...newPurchase, supplier: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Monto ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newPurchase.amount}
                      onChange={(e) => setNewPurchase({...newPurchase, amount: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      value={newPurchase.date}
                      onChange={(e) => setNewPurchase({...newPurchase, date: e.target.value})}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Estado</label>
                    <select
                      className="form-select"
                      value={newPurchase.status}
                      onChange={(e) => setNewPurchase({...newPurchase, status: e.target.value})}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditingPurchase(null);
                      setNewPurchase({ product: '', supplier: '', amount: '', date: '', status: 'Pendiente' });
                    }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={handleAddPurchase}
                  >
                    {editingPurchase ? 'Actualizar' : 'Guardar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Purchases component error:', error);
    return null;
  }
}