'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTypedSelector } from '@/store';
import { useGetAllQueuesQuery } from '@/store/services/queue';
import Select from 'react-select';
import { getTranslation } from '@/i18n';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import Dropdown from '@/components/dropdown';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconEye from '@/components/icon/icon-eye';
import Link from 'next/link';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ColumnChart = {
    series: { name: string; data: number[] }[];
    options: ApexOptions;
};

const { t } = getTranslation();

export default function WorkspaceMetricsPage() {
    const { data: queues = [], isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllQueuesQuery({ wid: '1' });

    const [queueId, setQueueId] = useState('');

    const handleQueueChange = (option: any) => {
        setQueueId(option.value);
    };

    const isDark = useTypedSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const columnChart = useMemo(() => {
        const columnChart: ColumnChart = {
            series: [
                {
                    name: 'Net Profit',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
                },
                {
                    name: 'Revenue',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
                },
            ],
            options: {
                chart: {
                    height: 300,
                    type: 'bar',
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#805dca', '#e7515a'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent'],
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        borderRadius: 5,
                        borderRadiusApplication: 'end',
                    },
                },
                grid: {
                    borderColor: isDark ? '#191e3a' : '#e0e6ed',
                },
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    axisBorder: {
                        color: isDark ? '#191e3a' : '#e0e6ed',
                    },
                },
                yaxis: {
                    opposite: isRtl ? true : false,
                    labels: {
                        offsetX: isRtl ? -10 : 0,
                    },
                },
                tooltip: {
                    theme: isDark ? 'dark' : 'light',
                    y: {
                        formatter: function (val: any) {
                            return val;
                        },
                    },
                },
            },
        };
        return columnChart;
    }, [isDark, isRtl]);

    const selectOptionsQueues = useMemo(() => {
        return queues.map((queue) => ({
            label: queue.title,
            value: queue.id,
        }));
    }, [queues]);

    return (
        <div className="flex min-h-[calc(100dvh-6rem)] w-full justify-center p-4">
            <div className="flex w-full max-w-screen-xl flex-col space-y-4">
                <ul className="flex space-x-2 sm:text-lg rtl:space-x-reverse">
                    <li>
                        <Link href="/" className="text-primary hover:underline">
                            Dashboard
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <Link href="/queues" className="text-primary hover:underline">
                            Queues
                        </Link>
                    </li>
                    <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                        <span>Metrics</span>
                    </li>
                </ul>

                <Select
                    className="w-full"
                    // @ts-ignore
                    options={selectOptionsQueues}
                    placeholder={t('Select a Queue')}
                    // value={queues.find((queue) => String(queue.id) === queueId)}
                    onChange={handleQueueChange}
                    isSearchable={false}
                    isDisabled={loadingWorkspaces}
                />
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    {/* Queue Length */}
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Queue Length</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Details</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Metrics</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 12 </div>
                            <div className="badge bg-white/30">+ 8% </div>
                        </div>
                        <div className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Last Hour: 10
                        </div>
                    </div>

                    {/* Average Wait Time */}
                    <div className="panel bg-gradient-to-r from-violet-500 to-violet-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Avg Wait Time</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Details</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Metrics</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 18 min </div>
                            <div className="badge bg-white/30">- 5% </div>
                        </div>
                        <div className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Last Hour: 20 min
                        </div>
                    </div>

                    {/* Active Queues */}
                    <div className="panel bg-gradient-to-r from-blue-500 to-blue-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Active Queues</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Details</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Metrics</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 5 </div>
                            <div className="badge bg-white/30">+ 2 </div>
                        </div>
                        <div className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Last Hour: 3
                        </div>
                    </div>

                    {/* Served Customers */}
                    <div className="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Served Customers</div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:opacity-80"
                                    button={<IconHorizontalDots className="opacity-70 hover:opacity-80" />}
                                >
                                    <ul className="text-black dark:text-white-dark">
                                        <li>
                                            <button type="button">View Details</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Metrics</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 54 </div>
                            <div className="badge bg-white/30">+ 10% </div>
                        </div>
                        <div className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Last Hour: 45
                        </div>
                    </div>
                </div>
                <div className="grid h-[50vh] grid-cols-1 sm:grid-cols-2">
                    <div>{isMounted && <ReactApexChart series={columnChart.series} options={columnChart.options} type="bar" height="100%" width="100%" />}</div>
                    <div>{isMounted && <ReactApexChart series={columnChart.series} options={columnChart.options} type="bar" height="100%" width="100%" />}</div>
                </div>
            </div>
        </div>
    );
}
