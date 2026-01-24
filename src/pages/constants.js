export const INITIAL_VESSELS = [
  {
    id: 'v1',
    name: 'Vessel Alpha',
    imo: '9123456',
    type: 'Bulk Carrier',
    flag: 'Marshall Islands',
    client: 'Pacific Shipping Co.',
    owner: 'Global Maritime Ltd.',
    charterer: 'Ocean Transport Inc.',
    yearBuilt: 2015,
    callSign: 'WPXA',
    tonnage: 45000,
    tanks: [
      { id: 't1', name: '1C', capacity: 500, fuelType: 'HFO' },
      { id: 't2', name: '2C', capacity: 150, fuelType: 'MGO' },
      { id: 't3', name: '3C', capacity: 500, fuelType: 'HFO' },
      { id: 't4', name: 'VLSFO Tk', capacity: 400, fuelType: 'VLSFO' },
      { id: 't5', name: 'LSMGO Tk', capacity: 100, fuelType: 'LSMGO' }
    ]
  },
  {
    id: 'v2',
    name: 'Vessel Beta',
    imo: '9876543',
    type: 'Oil Tanker',
    flag: 'Singapore',
    client: 'Asian Logistics',
    owner: 'Horizon Shipping Ltd.',
    charterer: 'Energy Traders Co.',
    yearBuilt: 2018,
    callSign: 'SSXB',
    tonnage: 85000,
    tanks: [
      { id: 't1', name: '1P', capacity: 800, fuelType: 'HFO' },
      { id: 't2', name: '1S', capacity: 800, fuelType: 'HFO' }
    ]
  }
];

export const MOCK_SURVEYS = [];