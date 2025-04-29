import {useEffect, useState} from 'react';
import {Address} from '../types/Address';
import '../styles/AddressForm.css';

interface AddressFormProps {
    address?: Address;
    onSave: (address: Omit<Address, 'id'>) => void;
    onCancel: () => void;
}

export default function AddressForm({address, onSave, onCancel}: AddressFormProps) {
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
    });

    useEffect(() => {
        if (address) {
            // If an address is provided (edit mode), populate the form
            const {id, ...addressData} = address;
            setFormData(addressData);
        }
    }, [address]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);

        // Reset form if not in edit mode
        if (!address) {
            setFormData({
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            });
        }
    };

    return (
        <form className="address-form" onSubmit={handleSubmit}>
            <h2>{address ? 'Edit Address' : 'Add New Address'}</h2>

            <div className="form-group">
                <label htmlFor="street">Street Address</label>
                <input
                    type="text"
                    id="street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="state">State/Province</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zipCode">Zip/Postal Code</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onCancel}>
                    Cancel
                </button>
                <button type="submit" className="save-btn">
                    {address ? 'Save Changes' : 'Add Address'}
                </button>
            </div>
        </form>
    );
}
