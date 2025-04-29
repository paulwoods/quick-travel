import {Address} from '../types/Address';
import {AddressItem} from './AddressItem';
import '../styles/AddressList.css';

interface AddressListProps {
    addresses: Address[];
    onEdit: (address: Address) => void;
    onDelete: (id: number) => void;
}

export const AddressList = ({addresses, onEdit, onDelete}: AddressListProps) => {
    if (addresses.length === 0) {
        return (
            <div className="empty-list">
                <p>No addresses found. Add a new address to get started.</p>
            </div>
        );
    }

    return (
        <div className="address-list">
            <h2>Your Addresses</h2>
            {addresses.map((address) => (
                <AddressItem
                    key={address.id}
                    address={address}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};