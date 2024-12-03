import React, { useEffect, useState } from 'react'; 
import { deleteCustomer, fetchCustomers, updateCustomer } from '../../actions/AppActions';
import { useDispatch, useSelector } from 'react-redux';

const CustomerList = () => {
  const [state, setState] = useState({
    loadingCustomers: false,
    customers: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State to toggle modal visibility
  const [editableCustomer, setEditableCustomer] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
  }); // State to hold data of customer being edited

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const appState = useSelector((state) => state.app);

  useEffect(() => {
    try {
      setState((prevState) => ({
        ...prevState,
        customers: appState.customers,
        loadingCustomers: appState.loadingCustomers,
      }));
    } catch (e) {
      console.log(e);
    }
  }, [appState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editCustomer = (index) => {
    setEditableCustomer(state.customers[index]); // Load customer data into the modal
    setIsModalOpen(true); // Open the modal
  };

  const updateCustomerData = () => {
    // Dispatch action to update customer info
    dispatch(updateCustomer(editableCustomer.id, editableCustomer));
    setIsModalOpen(false); // Close modal after update
  };

  const onDeleteCustomer = (customerId) => {
    dispatch(deleteCustomer(customerId));
  };

  if (appState.loadingCustomers) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>

      {/* Customer list */}
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone Number</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appState.customers.map((customer, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone_number}</td>
              <td className="px-4 py-2">{customer.address}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => editCustomer(index)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteCustomer(customer.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Customer */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Customer</h2>

            <input
              type="text"
              name="name"
              value={editableCustomer.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="email"
              name="email"
              value={editableCustomer.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              name="phone_number"
              value={editableCustomer.phone_number}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              name="address"
              value={editableCustomer.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border border-gray-300 rounded mb-4 w-full"
            />

            <div className="flex justify-end">
              <button
                onClick={updateCustomerData}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
