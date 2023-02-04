import { displayBooleanValues } from '../display/displayBooleanValues';

export const columnsConfig = [
    {
        dataIndex: 'name',
        key: 'name', 
        title: 'Name'
    },
    {
        dataIndex: 'date',
        key: 'date', 
        title: 'Date'
    },
    {
        dataIndex: 'time',
        key: 'time', 
        title: 'Local Time'
    },
    {
        dataIndex: 'description',
        key: 'description', 
        title: 'Description'
    },
    {
        dataIndex: 'latitude',
        key: 'latitude', 
        title: 'Latitude'
    },
    {
        dataIndex: 'longitude',
        key: 'longitude', 
        title: 'Longitude'
    },
    {
        dataIndex: 'approximateRealLocation',
        key: 'approximateRealLocation', 
        render: (value) => displayBooleanValues(value),
        title:'Real Location'
    }
]