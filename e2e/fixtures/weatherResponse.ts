const weatherResponse = {
  address: 'yekaterinburg',
  currentConditions: {
    temp: 10.1,
    humidity: 98,
    windspeed: 32.3,
    conditions: 'Overcast',
  },
  days: [
    { datetime: '2026-03-16', temp: 2, tempmin: -6, tempmax: 11, conditions: 'Snow, Rain, Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-17', temp: 1, tempmin: 1, tempmax: 3, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-18', temp: 1, tempmin: 0, tempmax: 2, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-19', temp: 0, tempmin: -1, tempmax: 2, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-20', temp: -1, tempmin: -1, tempmax: 1, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-21', temp: -1, tempmin: -2, tempmax: 2, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-22', temp: 0, tempmin: -2, tempmax: 1, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-23', temp: 1, tempmin: -1, tempmax: 2, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-24', temp: -1, tempmin: -3, tempmax: 1, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-25', temp: -2, tempmin: -5, tempmax: 1, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-26', temp: -2, tempmin: -5, tempmax: 2, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-27', temp: -1, tempmin: -1, tempmax: 1, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-28', temp: 0, tempmin: -1, tempmax: 2, conditions: 'Overcast', icon: 'rain' },
    { datetime: '2026-03-29', temp: 1, tempmin: 0, tempmax: 3, conditions: 'Partially cloudy', icon: 'rain' },
    { datetime: '2026-03-30', temp: 2, tempmin: 1, tempmax: 4, conditions: 'Overcast', icon: 'rain' },
  ],
}

export default weatherResponse
