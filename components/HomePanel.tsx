'use client';

import { MdOutlineTimer } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Dropdown from './dropdown';
import { useTypedSelector } from '@/store';
import { useRouter } from 'next/navigation';

export default function HomePanel() {
    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    const router = useRouter();

    return (
        <div className="flex h-full py-6 w-full flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-around mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-around mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-around mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-around mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full max-w-[19rem] rounded border border-[#e0e6ed] bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="relative z-10 px-6 py-7">
                    <div className="flex justify-between">
                        <div className="mb-5 inline-block rounded-full bg-[#D7E8FF] p-2 text-[#2673DD]">
                            <MdOutlineTimer className="size-6" />
                        </div>
                        <div className="dropdown">
                            <Dropdown
                                placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                btnClassName="dropdown-toggle"
                                button={
                                    <>
                                        <span>
                                            <BsThreeDotsVertical className="inline-block ltr:ml-1 rtl:mr-1 size-5 mt-2" />
                                        </span>
                                    </>
                                }
                            >
                                <ul className="!min-w-[170px]">
                                    <li>
                                        <button type="button">Action</button>
                                    </li>
                                    <li>
                                        <button type="button">Another action</button>
                                    </li>
                                    <li>
                                        <button type="button">Something else here</button>
                                    </li>
                                    <li>
                                        <button type="button">Separated link</button>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="flex items-center justify-around mt-5">
                        <h5 className="text-xl font-semibold text-[#3b3f5c] dark:text-white-light">23</h5>
                        <div className="flex items-center gap-2">
                            <svg width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M14.6679 12C14.6679 12.4142 15.0036 12.75 15.4179 12.75H21C21.4142 12.75 21.75 12.4142 21.75 12V6.45417C21.75 6.03995 21.4142 5.70417 21 5.70417C20.5858 5.70417 20.25 6.03995 20.25 6.45417V10.1971L14.1142 4.09871C13.6452 3.63256 13.241 3.23077 12.8739 2.95229C12.4804 2.65378 12.0432 2.42796 11.505 2.42802C10.9668 2.42808 10.5297 2.654 10.1362 2.9526C9.76923 3.23116 9.36512 3.63303 8.89629 4.09928L8.62203 4.37199C8.10787 4.88325 7.77452 5.21249 7.49695 5.42314C7.23672 5.62063 7.11506 5.64266 7.03449 5.64263C6.95393 5.6426 6.83228 5.62048 6.57219 5.4228C6.29478 5.21195 5.96167 4.88247 5.44789 4.37083L1.52922 0.468559C1.23571 0.176281 0.760838 0.177277 0.468559 0.470783C0.176281 0.764289 0.177276 1.23916 0.470783 1.53144L4.42433 5.46845C4.89326 5.93547 5.29742 6.33798 5.66452 6.617C6.05802 6.91609 6.49535 7.14244 7.03395 7.14263C7.57254 7.14283 8.01003 6.9168 8.40375 6.61801C8.77105 6.33926 9.1755 5.93704 9.64477 5.47037L9.91903 5.19765C10.4327 4.68684 10.7658 4.35791 11.0431 4.14743C11.3031 3.95011 11.4247 3.92803 11.5052 3.92802C11.5857 3.92801 11.7073 3.95006 11.9673 4.14732C12.2447 4.35774 12.5778 4.68659 13.0916 5.19728L19.1815 11.25H15.4179C15.0036 11.25 14.6679 11.5858 14.6679 12Z"
                                    fill="#2673DD"
                                />
                            </svg>
                            <p className="text-white-dark">
                                <span className="text-[#2673DD]">45%</span> vs. Last Month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
