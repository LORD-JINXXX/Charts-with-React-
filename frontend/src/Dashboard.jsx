import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:8000/api/fetch';
            const response = await axios.get(url);
            console.log(response.data.data);
            setData(response.data.data)
        };

        fetchData();
    }, []);

    const initialFilters = {
        endYear: '',
        topics: [],
        sector: '',
        region: '',
        pest: '',
        source: '',
        country: '',
    };

    const [filters, setFilters] = useState(initialFilters);

    const filterData = (data) => {
        return data.filter(item => {
            return (
                (!filters.endYear || item.end_year === filters.endYear) &&
                (!filters.topics.length || filters.topics.includes(item.topic)) &&
                (!filters.sector || item.sector === filters.sector) &&
                (!filters.region || item.region === filters.region) &&
                (!filters.pest || item.pestle === filters.pest) &&
                (!filters.source || item.source === filters.source) &&
                (!filters.country || item.country === filters.country)
            );
        });
    };

    const filteredData = filterData(data);

    const chartData = {
        labels: filteredData.map(item => item.title),
        datasets: [
            {
                label: 'Intensity',
                data: filteredData.map(item => item.intensity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Likelihood',
                data: filteredData.map(item => item.likelihood),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Relevance',
                data: filteredData.map(item => item.relevance),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
        ],
    };

    const handleFilterChange = (filterName, selectedOption) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: selectedOption ? (Array.isArray(selectedOption) ? selectedOption.map(option => option.value) : selectedOption.value) : (filterName === 'topics' ? [] : ''),
        }));
    };

    const getUniqueOptions = (key) => {
        const options = [...new Set(data.map(item => item[key]))];
        return options.map(option => ({ value: option, label: option }));
    };

    const resetFilters = () => {
        setFilters(initialFilters);
    };

    const options = {
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: 'teal',
                    maxRotation: 90,
                    minRotation: 90
                },
                grid: {
                    color: 'black'
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: 'teal'
                },
                grid: {
                    color: 'black'
                }
            },
        },
        plugins: {
            title: {
                text: "Bar Chart for Intensity, Likelihood and Relevance",
                color: 'teal',
                font: {
                    weight: 'bold',
                    size: 18
                },
                align: 'center',
                display: true
            },
            legend: {
                labels: {
                    color: 'teal'
                }
            }
        }
    };

    return (
        <div className='w-[100vw] h-[auto] flex justify-center items-center flex-col'>
            <div className='w-[100%] h-[50px] flex justify-center items-center bg-teal-400'>
                <h1 className='w-[auto] text-white text-2xl text-center font-semibold'>Data Visualisation</h1>
            </div>
            <div className="flex flex-col flex-wrap w-[100vw] justify-center items-center my-3 md:flex-row ">
                <Select
                    placeholder="End Year"
                    options={getUniqueOptions('end_year')}
                    onChange={option => handleFilterChange('endYear', option)}
                    value={filters.endYear ? { value: filters.endYear, label: filters.endYear } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[auto]'
                />
                <Select
                    placeholder="Sector"
                    options={getUniqueOptions('sector')}
                    onChange={option => handleFilterChange('sector', option)}
                    value={filters.sector ? { value: filters.sector, label: filters.sector } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[200px]'
                />
                <Select
                    placeholder="Region"
                    options={getUniqueOptions('region')}
                    onChange={option => handleFilterChange('region', option)}
                    value={filters.region ? { value: filters.region, label: filters.region } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[200px]'
                />
                <Select
                    placeholder="PEST"
                    options={getUniqueOptions('pestle')}
                    onChange={option => handleFilterChange('pest', option)}
                    value={filters.pest ? { value: filters.pest, label: filters.pest } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[200px]'
                />
                <Select
                    placeholder="Source"
                    options={getUniqueOptions('source')}
                    onChange={option => handleFilterChange('source', option)}
                    value={filters.source ? { value: filters.source, label: filters.source } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[200px]'
                />
                <Select
                    placeholder="Country"
                    options={getUniqueOptions('country')}
                    onChange={option => handleFilterChange('country', option)}
                    value={filters.country ? { value: filters.country, label: filters.country } : null}
                    className='w-[90%] my-2 shadow-md md:mx-2 md:w-[200px]'
                />

                <button onClick={resetFilters} className='w-[auto] h-[30px] px-5 my-2 md:mx-2 shadow-md bg-teal-400 text-white rounded-md font-mono font-semibold'>Reset Filters</button>
            </div>
            <div className='w-[95vw] h-[300px] flex justify-start items-center my-3 md:w-[95vw] md:h-[500px] md:justify-center md:items-center'>
                <Bar data={chartData} options={options}/>
            </div>
        </div>
    )
}

export default Dashboard;