import {useEffect, useState} from 'react';
import {Address} from '../types/Address';
import {AddressList} from './AddressList';
import {AddressForm} from './AddressForm';
import {addressService} from '../api/addressService';
import '../styles/AddressManager.css';

export const AddressManager = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch addresses from the API when component mounts
    useEffect(() => {
        const fetchAddresses = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await addressService.getAll();
                setAddresses(data);
            } catch (err) {
                console.error('Failed to fetch addresses:', err);
                setError('Failed to load addresses. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    const handleAddAddress = async (addressData: Omit<Address, 'id'>) => {
        setIsLoading(true);
        setError(null);
        try {
            const newAddress = await addressService.create(addressData);
            setAddresses([...addresses, newAddress]);
            setIsFormVisible(false);
        } catch (err) {
            console.error('Failed to create address:', err);
            setError('Failed to create address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditAddress = async (addressData: Omit<Address, 'id'>) => {
        if (!editingAddress) return;

        setIsLoading(true);
        setError(null);
        try {
            const updatedAddress = await addressService.update(editingAddress.id, addressData);

            const updatedAddresses = addresses.map((address) =>
                address.id === editingAddress.id ? updatedAddress : address
            );

            setAddresses(updatedAddresses);
            setEditingAddress(null);
            setIsFormVisible(false);
        } catch (err) {
            console.error('Failed to update address:', err);
            setError('Failed to update address. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAddress = async (id: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this address?');

        if (confirmDelete) {
            setIsLoading(true);
            setError(null);
            try {
                await addressService.delete(id);
                setAddresses(addresses.filter((address) => address.id !== id));
            } catch (err) {
                console.error('Failed to delete address:', err);
                setError('Failed to delete address. Please try again.');
            } finally {
                setIsLoading(false);
            }
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

    const handleSubmitAddresses = async (selectedAddresses: Address[]) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await addressService.submitAddresses(selectedAddresses);
            alert(`Success: ${response}`);
            console.log('Submitted addresses:', selectedAddresses);
        } catch (err) {
            console.error('Failed to submit addresses:', err);
            setError('Failed to submit addresses. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="address-manager">
            <div className="address-manager-header">
                <h1>Address Management</h1>
                {!isFormVisible && (
                    <button
                        className="add-address-btn"
                        onClick={() => setIsFormVisible(true)}
                        disabled={isLoading}
                    >
                        Add New Address
                    </button>
                )}
            </div>

            {error && <div className="error-message">{error}</div>}

            {isLoading && !isFormVisible ? (
                <div className="loading-indicator">Loading addresses...</div>
            ) : isFormVisible ? (
                <AddressForm
                    address={editingAddress || undefined}
                    onSave={editingAddress ? handleEditAddress : handleAddAddress}
                    onCancel={cancelForm}
                    // isSubmitting={isLoading}
                />
            ) : (
                <AddressList
                    addresses={addresses}
                    onEdit={startEditing}
                    onDelete={handleDeleteAddress}
                    onSubmit={handleSubmitAddresses}
                />
            )}
        </div>
    );
};
