import React from 'react';
import { getTranslation } from '@/i18n';
import { useTypedSelector, useAppDispatch } from '@/store';
import { addField, removeField } from '@/store/createQueueSlice';
import { FieldType } from '@/types/queue';

const allFields = [
    { key: 'first_name', label: 'First Name', type: FieldType.TEXT },
    { key: 'last_name', label: 'Last Name', type: FieldType.TEXT },
    { key: 'email', label: 'Email', type: FieldType.EMAIL },
    { key: 'phone', label: 'Phone', type: FieldType.PHONE },
    { key: 'address', label: 'Address', type: FieldType.TEXT },
    { key: 'city', label: 'City', type: FieldType.TEXT },
    { key: 'state', label: 'State', type: FieldType.TEXT },
    { key: 'zip', label: 'Zip', type: FieldType.TEXT },
    { key: 'country', label: 'Country', type: FieldType.TEXT },
    { key: 'company', label: 'Company', type: FieldType.TEXT },
    { key: 'job_title', label: 'Job Title', type: FieldType.TEXT },
    { key: 'notes', label: 'Notes', type: FieldType.TEXT },
];

export default function QueueClientFields() {
    const { t } = getTranslation();

    const { fields } = useTypedSelector((state) => state.createQueue.config);
    const dispatch = useAppDispatch();

    const handleOnChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>, field: typeof allFields[0]) => {
        const { checked } = e.target;

        if (checked) {
            dispatch(
                addField({
                    name: field.key,
                    type: field.type,
                    required: true,
                })
            ); 
        } else {
            dispatch(removeField(field.key));
        }
    }

    return (
        <div className="flex flex-col gap-2 bg-white shadow p-4 rounded">
            <div className="space-y-2">
                <h2 className="text-lg font-semibold">{t('User Fields')}</h2>
                {allFields.map((field) => (
                    <div key={field.key}>
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="form-checkbox" 
                                onChange={(e) => handleOnChangeCheckbox(e, field)}
                                checked={fields?.some(f => f.name === field.key)}
                            />
                            <span className="ml-2">{t(field.label)}</span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}