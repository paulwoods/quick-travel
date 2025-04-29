import {useState} from 'react';
import {Address} from '../types/Address';
import AddressList from './AddressList';
import AddressForm from './AddressForm';
import '../styles/AddressManager.css';

export const AddressManager = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Generate a unique ID for new addresses
    const generateId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    };

    const handleAddAddress = (addressData: Omit<Address, 'id'>) => {
        const newAddress: Address = {
            id: generateId(),
            ...addressData
        };

        setAddresses([...addresses, newAddress]);
        setIsFormVisible(false);
    };

    const handleEditAddress = (addressData: Omit<Address, 'id'>) => {
        if (!editingAddress) return;

        const updatedAddresses = addresses.map((address) =>
            address.id === editingAddress.id
                ? {...address, ...addressData}
                : address
        );

        setAddresses(updatedAddresses);
        setEditingAddress(null);
        setIsFormVisible(false);
    };

    const handleDeleteAddress = (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this address?');

        if (confirmDelete) {
            setAddresses(addresses.filter((address) => address.id !== id));
        }
    };

    const startEditing = (address: Address) => {
        setEditingAddress(address);
        setIsFormVisible(true);
    };

    const cancelForm = () => {
        setEditingAddress(null);
        setIsFormVisible(false);
    };

    return (
        <div className="address-manager">
            <div className="address-manager-header">
                <h1>Address Management</h1>
                {!isFormVisible && (
                    <button
                        className="add-address-btn"
                        onClick={() => setIsFormVisible(true)}
                    >
                        Add New Address
                    </button>
                )}
            </div>

            {isFormVisible ? (
                <AddressForm
                    address={editingAddress || undefined}
                    onSave={editingAddress ? handleEditAddress : handleAddAddress}
                    onCancel={cancelForm}
                />
            ) : (
                <AddressList
                    addresses={addresses}
                    onEdit={startEditing}
                    onDelete={handleDeleteAddress}
                />
            )}
        </div>
    );
};