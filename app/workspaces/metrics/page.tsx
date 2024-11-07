'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTypedSelector } from '@/store';
import { useGetAllWorkspacesQuery } from '@/store/services/workspaces';
import Select from 'react-select';
import { IoMdMore } from 'react-icons/io';
import { IoEye } from 'react-icons/io5';
import { getTranslation } from '@/i18n';
import dynamic from 'next/dynamic';

const { t } = getTranslation();
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function WorkspaceMetricsPage() {
    const { data: workspaces = [], isLoading: loadingWorkspaces, error: errorWorkspaces } = useGetAllWorkspacesQuery(undefined);

    const [wid, setWid] = useState('');

    const handleWidChange = (option: any) => {
        setWid(option.value);
    };

    const isDark = useTypedSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const columnChart: any = useMemo(() => {
        const columnChart: any = {
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
                        endingShape: 'rounded',
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

    const selectOptionsWorkspaces = useMemo(() => {
        return workspaces.map((workspace) => ({
            label: workspace.title,
            value: workspace.id,
        }));
    }, [workspaces]);

    return (
        <div className="min-h-[calc(100dvh - 72px)] flex flex-col items-center space-y-2 p-4">
            <h1>{t('Workspace Metrics')}</h1>

            {/* @ts-ignore */}
            <Select className="w-full" options={selectOptionsWorkspaces} value={workspaces.find((workspace) => String(workspace.id) === wid)} onChange={handleWidChange} isSearchable={false} />

            <MetricCard title="Average Wait Time" value={15} change={10} unit="min" color="bg-cyan-500" />
            <MetricCard title="People Served" value={1025} change={-5} unit="" color="bg-purple-500" />

            {isMounted && <ReactApexChart series={columnChart.series} options={columnChart.options} className="w-full rounded-lg bg-white dark:bg-black" type="bar" height={300} width={'100%'} />}
        </div>
    );
}

const MetricCard = ({ title, value, change, unit = '', color }: { title: string; value: number; change: number; unit?: string; color: string }) => {
    const isPositive = change > 0;
    const absChange = Math.abs(change);

    return (
        <div className={`rounded-xl p-6 ${color} w-full text-white`}>
            <div className="mb-6 flex items-start justify-between">
                <h2 className="text-lg font-medium">{title}</h2>
                <IoMdMore className="h-6 w-6" />
            </div>

            <div className="mb-4 text-4xl font-semibold">{`${value} ${unit}`}</div>

            <div className="flex items-center gap-2">
                <IoEye className="h-5 w-5" />
                <div className="flex items-center gap-2">
                    <span>Compared Last week</span>
                    <span className={`rounded-md px-2 py-1 ${isPositive ? 'bg-white/20' : 'bg-white/20'}`}>
                        {isPositive ? '+' : '-'}
                        {absChange}%
                    </span>
                </div>
            </div>
        </div>
    );
};
