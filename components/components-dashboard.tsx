'use client';

import { useTypedSelector } from '@/store';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import IconEye from './icon/icon-eye';

const ComponentsDashboard = () => {
    const isDark = useTypedSelector((state) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useTypedSelector((state) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Queue Traffic Chart
    const queueTrafficChart: any = {
        series: [
            {
                name: 'Queue A',
                data: [45, 55, 75, 85, 65, 70, 85, 60, 55, 70, 50, 65],
            },
            {
                name: 'Queue B',
                data: [30, 45, 35, 50, 40, 55, 40, 45, 40, 50, 45, 55],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#e7515a'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value + ' people';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };

    // Queue Distribution
    const queueDistribution: any = {
        series: [45, 30, 25],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val + '%';
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce((a: any, b: any) => a + b, 0) + '%';
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Queue A', 'Queue B', 'Queue C'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    // Waiting Times
    const waitingTimes: any = {
        series: [
            {
                name: 'Current',
                data: [15, 20, 12, 25, 18, 21, 14],
            },
            {
                name: 'Last Week',
                data: [12, 18, 14, 15, 17, 19, 16],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Queue A', 'Queue B', 'Queue C', 'Queue D', 'Queue E', 'Queue F', 'Queue G'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };

    return (
        <div>
            <div className="pt-5">
                <div className="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                    {/* Total Queue */}
                    <div className="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                        <div className="flex justify-between">
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Queue</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 7 </div>
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
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Active Queues</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 3 </div>
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
                            <div className="text-md font-semibold ltr:mr-1 rtl:ml-1">Total Reservations</div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 876 </div>
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
                        </div>
                        <div className="mt-5 flex items-center">
                            <div className="text-3xl font-bold ltr:mr-3 rtl:ml-3"> 756 </div>
                            <div className="badge bg-white/30">+ 10% </div>
                        </div>
                        <div className="mt-5 flex items-center font-semibold">
                            <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
                            Last Hour: 45
                        </div>
                    </div>
                </div>
                <div className="mb-6 grid gap-6 xl:grid-cols-3">
                    <div className="panel h-full xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold">Queue Traffic</h5>
                        </div>
                        <p className="text-lg dark:text-white-light/90">
                            Total People in Queue <span className="ml-2 text-primary">157</span>
                        </p>
                        <div className="relative">
                            <div className="rounded-lg bg-white dark:bg-black">
                                {isMounted ? (
                                    <ReactApexChart series={queueTrafficChart.series} options={queueTrafficChart.options} type="area" height={325} width={'100%'} />
                                ) : (
                                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="panel h-full">
                        <div className="mb-5 flex items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">Queue Distribution</h5>
                        </div>
                        <div>
                            <div className="rounded-lg bg-white dark:bg-black">
                                {isMounted ? (
                                    <ReactApexChart series={queueDistribution.series} options={queueDistribution.options} type="donut" height={460} width={'100%'} />
                                ) : (
                                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
                    
                    <div className="panel h-full w-full">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Recent Reservations</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">John</span>
                                        </td>
                                        <td>Doe</td>
                                        <td>john.doe@example.com</td>
                                        <td>
                                            <span className="badge bg-warning shadow-md dark:group-hover:bg-transparent">Waiting</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Jane</span>
                                        </td>
                                        <td>Smith</td>
                                        <td>jane.smith@example.com</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Served</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Emily</span>
                                        </td>
                                        <td>Johnson</td>
                                        <td>emily.johnson@example.com</td>
                                        <td>
                                            <span className="badge bg-warning shadow-md dark:group-hover:bg-transparent">Waiting</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Michael</span>
                                        </td>
                                        <td>Brown</td>
                                        <td>michael.brown@example.com</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Served</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Sarah</span>
                                        </td>
                                        <td>Wilson</td>
                                        <td>sarah.wilson@example.com</td>
                                        <td>
                                            <span className="badge bg-warning shadow-md dark:group-hover:bg-transparent">Waiting</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="panel h-full w-full">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Recent Reservations</h5>
                        </div>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="ltr:rounded-l-md rtl:rounded-r-md">Queue</th>
                                        <th>Reservations</th>
                                        <th>Served</th>
                                        <th>Total Time</th>
                                        <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Queue #1</span>
                                        </td>
                                        <td>532</td>
                                        <td>452</td>
                                        <td>2 min</td>
                                        <td>
                                            <span className="badge bg-warning shadow-md dark:group-hover:bg-transparent">Paused</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Queue #2</span>
                                        </td>
                                        <td>235</td>
                                        <td>189</td>
                                        <td>3 min</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Queue #3</span>
                                        </td>
                                        <td>198</td>
                                        <td>157</td>
                                        <td>3 min</td>
                                        <td>
                                            <span className="badge bg-danger shadow-md dark:group-hover:bg-transparent">Stopped</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Queue #4</span>
                                        </td>
                                        <td>155</td>
                                        <td>102</td>
                                        <td>20 min</td>
                                        <td>
                                            <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Active</span>
                                        </td>
                                    </tr>
                                    <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                        <td className="min-w-[150px] text-black dark:text-white">
                                            <span className="whitespace-nowrap">Queue #5</span>
                                        </td>
                                        <td>122</td>
                                        <td>89</td>
                                        <td>7 min</td>
                                        <td>
                                            <span className="badge bg-warning shadow-md dark:group-hover:bg-transparent">Paused</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ComponentsDashboard;
