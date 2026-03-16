import { render, screen } from '@testing-library/react'
import TodayContainer from '../TodayContainer'

describe('TodayContainer', () => {
  it('shows loader when data is missing', () => {
    render(<TodayContainer data={null} />)

    expect(screen.getByText('Loading Data...')).toBeInTheDocument()
  })

  it('renders current weather data', () => {
    const data = {
      currentConditions: {
        temp: 10.1,
        humidity: 98,
        windspeed: 32.3,
        conditions: 'Overcast',
      },
    }

    render(<TodayContainer data={data} />)

    expect(screen.getByRole('heading', { name: 'Current Weather' })).toBeInTheDocument()
    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('Humidity')).toBeInTheDocument()
    expect(screen.getByText('Wind speed')).toBeInTheDocument()
    expect(screen.getByText('Conditions')).toBeInTheDocument()
    expect(screen.getByText('Overcast')).toBeInTheDocument()
  })
})
