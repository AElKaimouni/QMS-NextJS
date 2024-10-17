'use client';

import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from './dropdown';
import { useTypedSelector } from '@/store';

type DropdownOption = {
    label: string;
    onClick: () => void;
};

interface QueueCardDropdownProps {
    dropdownOptions: DropdownOption[];
}

export const QueueCardDropdown = ({ dropdownOptions }: QueueCardDropdownProps) => {
    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    return (
        <Dropdown
            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
            btnClassName="dropdown-toggle"
            button={
                <span>
                    <BsThreeDotsVertical className="mt-2 inline-block size-5 ltr:ml-1 rtl:mr-1" />
                </span>
            }
        >
            <ul className="!min-w-[170px]">
                {dropdownOptions.map((dropdownOption) => (
                    <li key={dropdownOption.label}>
                        <button type="button" onClick={dropdownOption.onClick}>
                            {dropdownOption.label}
                        </button>
                    </li>
                ))}
            </ul>
        </Dropdown>
    );
};
