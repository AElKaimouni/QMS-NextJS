'use client';

import Dropdown from '@/components/dropdown';
import IconCreditCard from '@/components/icon/icon-credit-card';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconInbox from '@/components/icon/icon-inbox';
import IconShoppingCart from '@/components/icon/icon-shopping-cart';
import IconTag from '@/components/icon/icon-tag';
import { useTypedSelector } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import IconClock from '@/components/icon/icon-clock';

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
                <div className="mb-6 grid gap-6 xl:grid-cols-3">
                    <div className="panel h-full xl:col-span-2">
                        <div className="mb-5 flex items-center justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold">Queue Traffic</h5>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 1]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    button={<IconHorizontalDots className="text-black/70 hover:!text-primary dark:text-white/70" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">Hourly</button>
                                        </li>
                                        <li>
                                            <button type="button">Daily</button>
                                        </li>
                                        <li>
                                            <button type="button">Weekly</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
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

                <div className="mb-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="panel h-full sm:col-span-2 xl:col-span-1">
                        <div className="mb-5 flex items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Average Wait Times
                                <span className="block text-sm font-normal text-white-dark">By queue.</span>
                            </h5>
                            <div className="relative ltr:ml-auto rtl:mr-auto">
                                <div className="grid h-11 w-11 place-content-center rounded-full bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                    <IconClock />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="rounded-lg bg-white dark:bg-black">
                                {isMounted ? (
                                    <ReactApexChart series={waitingTimes.series} options={waitingTimes.options} type="bar" height={160} width={'100%'} />
                                ) : (
                                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full">
                        <div className="mb-5 flex items-center justify-between dark:text-white-light">
                            <h5 className="text-lg font-semibold">Summary</h5>
                            <div className="dropdown">
                                <Dropdown
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    button={<IconHorizontalDots className="h-5 w-5 text-black/70 hover:!text-primary dark:text-white/70" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">View Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Edit Report</button>
                                        </li>
                                        <li>
                                            <button type="button">Mark as Done</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="space-y-9">
                            <div className="flex items-center">
                                <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                    <div className="grid h-9 w-9 place-content-center  rounded-full bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light">
                                        <IconInbox />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex font-semibold text-white-dark">
                                        <h6>Income</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$92,600</p>
                                    </div>
                                    <div className="h-2 rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                        <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-[#7579ff] to-[#b224ef]"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                    <div className="grid h-9 w-9 place-content-center rounded-full bg-success-light text-success dark:bg-success dark:text-success-light">
                                        <IconTag />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex font-semibold text-white-dark">
                                        <h6>Profit</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$37,515</p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360]" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                    <div className="grid h-9 w-9 place-content-center rounded-full bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                        <IconCreditCard />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 flex font-semibold text-white-dark">
                                        <h6>Expenses</h6>
                                        <p className="ltr:ml-auto rtl:mr-auto">$55,085</p>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                        <div className="h-full w-full rounded-full bg-gradient-to-r from-[#f09819] to-[#ff5858]" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel h-full p-0">
                        <div className="absolute flex w-full items-center justify-between p-5">
                            <div className="relative">
                                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-success-light text-success dark:bg-success dark:text-success-light">
                                    <IconShoppingCart />
                                </div>
                            </div>
                            <h5 className="text-2xl font-semibold dark:text-white-light ltr:text-right rtl:text-left">
                                3,192
                                <span className="block text-sm font-normal">Total Orders</span>
                            </h5>
                        </div>
                        <div className="rounded-lg bg-transparent">
                            <>
                                {isMounted ? (
                                    <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} width={'100%'} />
                                ) : (
                                    <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                        <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                    </div>
                                )}
                            </>
                        </div>
                    </div>
                </div>

                <div className="panel h-full w-full">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Recent Orders</h5>
                    </div>
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th className="ltr:rounded-l-md rtl:rounded-r-md">Customer</th>
                                    <th>Product</th>
                                    <th>Invoice</th>
                                    <th>Price</th>
                                    <th className="ltr:rounded-r-md rtl:rounded-l-md">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="min-w-[150px] text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-6.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Luke Ivory</span>
                                        </div>
                                    </td>
                                    <td className="text-primary">Headphone</td>
                                    <td>
                                        <Link href="/apps/invoice/preview">#46894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                                <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-7.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Andy King</span>
                                        </div>
                                    </td>
                                    <td className="text-info">Nike Sport</td>
                                    <td>
                                        <Link href="/apps/invoice/preview">#76894</Link>
                                    </td>
                                    <td>$126.04</td>
                                    <td>
                                        <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                    </td>
                                </tr>
                                <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-8.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Laurie Fox</span>
                                        </div>
                                    </td>
                                    <td className="text-warning">Sunglasses</td>
                                    <td>
                                        <Link href="/apps/invoice/preview">#66894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                                <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-9.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Ryan Collins</span>
                                        </div>
                                    </td>
                                    <td className="text-danger">Sport</td>
                                    <td>
                                        <button type="button">#75844</button>
                                    </td>
                                    <td>$110.00</td>
                                    <td>
                                        <span className="badge bg-secondary shadow-md dark:group-hover:bg-transparent">Shipped</span>
                                    </td>
                                </tr>
                                <tr className="group text-white-dark hover:text-black dark:hover:text-white-light/90">
                                    <td className="text-black dark:text-white">
                                        <div className="flex items-center">
                                            <img className="h-8 w-8 rounded-md object-cover ltr:mr-3 rtl:ml-3" src="/assets/images/profile-10.jpeg" alt="avatar" />
                                            <span className="whitespace-nowrap">Irene Collins</span>
                                        </div>
                                    </td>
                                    <td className="text-secondary">Speakers</td>
                                    <td>
                                        <Link href="/apps/invoice/preview">#46894</Link>
                                    </td>
                                    <td>$56.07</td>
                                    <td>
                                        <span className="badge bg-success shadow-md dark:group-hover:bg-transparent">Paid</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentsDashboard;
