export const locationsGeoJSON = {
    type: "FeatureCollection",
    features: Array.from({length: 5}).map(() => ({
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

export const ports = [
    'Shanghai', 'Singapore', 'Shenzhen', 'Ningbo-Zhoushan',
    'Busan', 'Hong Kong', 'Guangzhou', 'Qingdao',
    'Dubai', 'Tianjin', 'Port Klang', 'Rotterdam',
    'Antwerp', 'Dalian', 'Valencia'
];
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Wilson'];


export const generateDeviceData = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-118.2437, 34.0522],  // Los Angeles
                    [-115.1398, 36.1699],  // Las Vegas
                    [-112.0740, 33.4484],  // Phoenix
                    [-104.9903, 39.7392],  // Denver
                    [-95.7129, 37.0902],   // Center of U.S.
                    [-90.1994, 38.6270]    // St. Louis
                ]
            }, // San Francisco
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
            geometry: {
                type: "LineString", coordinates: [
                    [100.5018, 13.7563],   // Bangkok
                    [100.9925, 12.9236],   // Pattaya
                    [104.9160, 11.5564],   // Phnom Penh
                    [106.6297, 10.8231],   // Ho Chi Minh City
                    [101.6869, 3.1390],    // Kuala Lumpur
                    [103.8198, 1.3521]     // Singapore
                ]
            }, // Singapore
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
            geometry: {
                type: "LineString", coordinates: [
                    [2.1734, 41.3851],     // Barcelona
                    [-0.3763, 39.4699],    // Valencia
                    [1.5386, 38.9067],     // Ibiza
                    [13.3625, 38.1157],    // Palermo
                    [14.2674, 40.8518],    // Naples
                    [12.4964, 41.9028]     // Rome
                ]
            }, // Rome
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
            geometry: {
                type: "LineString", coordinates: [
                    [72.8777, 19.0760],    // Mumbai
                    [73.8567, 18.5204],    // Pune
                    [78.4867, 17.3850],    // Hyderabad
                    [77.5946, 12.9716],    // Bangalore
                    [80.2785, 13.0878],    // Chennai
                    [79.0747, 12.2253]     // Tiruvannamalai
                ]
            }, // New Delhi
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
            geometry: {
                type: "LineString", coordinates: [
                    [-43.1729, -22.9068],  // Rio de Janeiro
                    [-46.6333, -23.5505],  // Sao Paulo
                    [-49.2718, -25.4289],  // Curitiba
                    [-48.5044, -27.6146],  // Florianopolis
                    [-51.2177, -30.0346],  // Porto Alegre
                    [-56.1882, -34.9033],  // Montevideo
                    [-58.3816, -34.6037]   // Buenos Aires
                ]
            }, // Buenos Aires
            properties: {
                name: "Device 5",
                temperature: (Math.random() * 15 + 10).toFixed(2), // Random values between 10°C and 25°C
                pressure: (Math.random() * 10 + 990).toFixed(2), // Random values between 990hPa and 1000hPa
                luminosity: (Math.random() * 500).toFixed(2), // Random values between 0 and 500 lux
                shock: (Math.random() * 5).toFixed(2), // Rando
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [151.2093, -33.8688],   // Sydney
                    [153.0251, -27.4698],   // Brisbane
                    [144.9631, -37.8136],   // Melbourne
                    [115.8575, -31.9505]    // Perth
                ]
            },
            properties: {
                name: "Device 6",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [18.4241, -33.9249],    // Cape Town
                    [28.0473, -26.2041],    // Johannesburg
                    [31.5204, -25.2916],    // Mbabane
                    [28.2336, -25.7479]     // Gaborone
                ]
            },
            properties: {
                name: "Device 7",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [126.9780, 37.5665],    // Seoul
                    [139.6917, 35.6895],    // Tokyo
                    [121.4737, 31.2304],    // Shanghai
                    [114.1095, 22.3964]     // Hong Kong
                ]
            },
            properties: {
                name: "Device 8",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-0.1278, 51.5074],     // London
                    [2.3522, 48.8566],      // Paris
                    [13.4050, 52.5200],     // Berlin
                    [4.9041, 52.3676]       // Amsterdam
                ]
            },
            properties: {
                name: "Device 9",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [12.4964, 41.9028],  // Rome
                    [14.2681, 40.8518],  // Naples
                    [13.4105, 38.1321],  // Palermo
                    [9.1900, 45.4642]    // Milan
                ]
            },
            properties: {
                name: "Device 10",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [21.0118, 52.2297],  // Warsaw
                    [21.4241, 52.0693],  // Lodz
                    [18.6445, 50.3104],  // Katowice
                    [17.0385, 51.1079]   // Wroclaw
                ]
            },
            properties: {
                name: "Device 11",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [12.5683, 55.6761],  // Copenhagen
                    [18.6435, 60.1282],  // Stockholm
                    [24.9384, 60.1695],  // Helsinki
                    [10.7522, 59.9139]   // Oslo
                ]
            },
            properties: {
                name: "Device 12",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-0.1284, 51.5074],  // London
                    [-3.7038, 40.4168],  // Madrid
                    [2.3522, 48.8566],   // Paris
                    [4.8357, 45.7640]    // Lyon
                ]
            },
            properties: {
                name: "Device 13",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },

// American Journeys
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-122.4194, 37.7749],  // San Francisco
                    [-118.2437, 34.0522],  // Los Angeles
                    [-122.3321, 47.6062],  // Seattle
                    [-116.2146, 43.6121]   // Boise
                ]
            },
            properties: {
                name: "Device 14",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-74.0060, 40.7128],   // New York
                    [-71.0589, 42.3601],   // Boston
                    [-77.0369, 38.9072],   // Washington D.C.
                    [-80.1918, 25.7617]    // Miami
                ]
            },
            properties: {
                name: "Device 15",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-86.2908, 15.2000],   // Honduras
                    [-90.5069, 14.6349],   // Guatemala
                    [-89.1872, 13.6894],   // El Salvador
                    [-83.7534, 9.7489]     // Costa Rica
                ]
            },
            properties: {
                name: "Device 16",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2)
            }
        },
        {
            type: "Feature",
            geometry: {
                type: "LineString", coordinates: [
                    [-70.6483, -33.4592],  // Santiago
                    [-68.8458, -32.8895],  // Mendoza
                    [-58.3816, -34.6037],  // Buenos Aires
                    [-51.9253, -14.2350]   // Brazil
                ]
            },
            properties: {
                name: "Device 17",
                temperature: (Math.random() * 15 + 10).toFixed(2),
                pressure: (Math.random() * 10 + 990).toFixed(2),
                luminosity: (Math.random() * 500).toFixed(2),
                shock: (Math.random() * 5).toFixed(2),
            }
        }
    ]
};

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

function generateHexSerial() {
    let serial = "";
    for (let i = 0; i < 12; i++) {
        const randomHex = Math.floor(Math.random() * 16).toString(16);
        serial += randomHex;
    }
    return serial.toUpperCase(); // If you want it in uppercase
}

for (let feature of generateDeviceData.features) {
    feature.properties.name = feature.properties.name || 'John Bob';
    feature.properties.company = feature.properties.company || 'Bob Shipping';
    feature.properties.serialNumber = generateHexSerial();
    feature.properties.lastTransmitted = `2023-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')} 12:00`;
    feature.properties.batteryLife = Math.floor(10 + Math.random() * 91);
    feature.properties.registeredDate = `2023-${Math.floor(1 + Math.random() * 12).toString().padStart(2, '0')}-${Math.floor(1 + Math.random() * 28).toString().padStart(2, '0')}`;
    feature.properties.registeredBy = getRandomItem(names);
    feature.properties.startPort = getRandomItem(ports);
    feature.properties.endPort = getRandomItem(ports);
}