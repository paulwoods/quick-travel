import {Address} from '../types/Address';
import '../styles/AddressItem.css';

interface AddressItemProps {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (id: number) => void;
}

export const AddressItem = ({address, onEdit, onDelete}: AddressItemProps) => {
    return (
        <div className="address-item">
            <div className="address-content">
                <p className="address-street">{address.street}</p>
                <p className="address-city-state">
                    {address.city}, {address.state} {address.zipCode}
                </p>
                <p className="address-country">{address.country}</p>
            </div>

            <div className="address-actions">
                <button
                    className="edit-btn"
                    onClick={() => onEdit(address)}
                    title="Edit Address"
                >
                    Edit
                </button>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(address.id)}
                    title="Delete Address"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};