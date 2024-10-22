'use client';

import { getTranslation } from '@/i18n';
import { useTypedSelector, useAppDispatch } from '@/store';
import { updateDays } from '@/store/createQueueSlice';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaysCheckbox: React.FC = () => {
    const { t } = getTranslation();

    const config = useTypedSelector((state) => state.createQueue.config);
    const dispatch = useAppDispatch();

    const handleCheckboxChange = (day: number) => {
        dispatch(updateDays(day));
    };

    return (
        <div className="space-y-2">
            <h3 className="text-lg font-medium">Days</h3>
            <div className="grid grid-cols-2 gap-4">
                {daysOfWeek.map((day, dayIndex) => (
                    <label key={day} className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600"
                            checked={config.time?.days.some((d) => d === dayIndex)}
                            onChange={() => handleCheckboxChange(dayIndex)}
                        />
                        <span className={`ml-2 ${config.time?.days.some((d) => d === dayIndex) ? 'font-semibold text-blue-600' : ''}`}>{t(day)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default DaysCheckbox;