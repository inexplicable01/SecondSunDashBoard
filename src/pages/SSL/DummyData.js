export const locationsGeoJSON = {
        type: "FeatureCollection",
        features: Array.from({ length: 5 }).map(() => ({
            type: "Feature",
            properties: {
                name: `Device ${Math.floor(Math.random() * 1000)}`
            },
            geometry: {
                type: "Point",
                coordinates: [
                    Math.random() * 360 - 180,    // longitude between -180 and 180
                    Math.random() * 180 - 90     // latitude between -90 and 90
                ]
            }
        }))
    };

export const generateDeviceData = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {type: "LineString", coordinates: [
                    [-118.2437, 34.0522],  // Los Angeles
                    [-115.1398, 36.1699],  // Las Vegas
                    [-112.0740, 33.4484],  // Phoenix
                    [-104.9903, 39.7392],  // Denver
                    [-95.7129, 37.0902],   // Center of U.S.
                    [-90.1994, 38.6270]    // St. Louis
                        ]}, // San Francisco
                    properties: {
                        name: "Device 1",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
                    }
                },
                {
                    type: "Feature",
                    geometry: {type: "LineString", coordinates: [
                    [100.5018, 13.7563],   // Bangkok
                    [100.9925, 12.9236],   // Pattaya
                    [104.9160, 11.5564],   // Phnom Penh
                    [106.6297, 10.8231],   // Ho Chi Minh City
                    [101.6869, 3.1390],    // Kuala Lumpur
                    [103.8198, 1.3521]     // Singapore
                        ]}, // Singapore
                    properties: {
                        name: "Device 2",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
                    }
                },
                {
                    type: "Feature",
                    geometry: {type: "LineString", coordinates: [
                   [2.1734, 41.3851],     // Barcelona
                    [-0.3763, 39.4699],    // Valencia
                    [1.5386, 38.9067],     // Ibiza
                    [13.3625, 38.1157],    // Palermo
                    [14.2674, 40.8518],    // Naples
                    [12.4964, 41.9028]     // Rome
                        ]}, // Rome
                    properties: {
                        name: "Device 3",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
                    }
                },
                {
                    type: "Feature",
                    geometry: {type: "LineString", coordinates: [
                   [72.8777, 19.0760],    // Mumbai
                    [73.8567, 18.5204],    // Pune
                    [78.4867, 17.3850],    // Hyderabad
                    [77.5946, 12.9716],    // Bangalore
                    [80.2785, 13.0878],    // Chennai
                    [79.0747, 12.2253]     // Tiruvannamalai
                        ]}, // New Delhi
                    properties: {
                        name: "Device 4",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
                    }
                },
                {
                    type: "Feature",
                    geometry: {type: "LineString", coordinates: [
                    [-43.1729, -22.9068],  // Rio de Janeiro
                    [-46.6333, -23.5505],  // Sao Paulo
                    [-49.2718, -25.4289],  // Curitiba
                    [-48.5044, -27.6146],  // Florianopolis
                    [-51.2177, -30.0346],  // Porto Alegre
                    [-56.1882, -34.9033],  // Montevideo
                    [-58.3816, -34.6037]   // Buenos Aires
                        ]}, // Buenos Aires
                    properties: {
                        name: "Device 5",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
                    }
                }
            ]
        };





export const ports = [
    'Shanghai', 'Singapore', 'Shenzhen', 'Ningbo-Zhoushan',
    'Busan', 'Hong Kong', 'Guangzhou', 'Qingdao',
    'Dubai', 'Tianjin', 'Port Klang', 'Rotterdam',
    'Antwerp', 'Dalian', 'Valencia'
];