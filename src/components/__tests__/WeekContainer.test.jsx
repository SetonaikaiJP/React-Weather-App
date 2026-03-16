import { render, screen } from '@testing-library/react'
import WeekContainer from '../WeekContainer'

describe('WeekContainer', () => {
  it('shows loader when data is missing', () => {
    render(<WeekContainer data={null} />)

    expect(screen.getByText('Loading Data...')).toBeInTheDocument()
  })

  it('renders exactly 7 forecast cards', () => {
    const data = {
      days: Array.from({ length: 10 }, (_, index) => ({
        temp: index + 1,
        icon: 'rain',
      })),
    }

    render(<WeekContainer data={data} />)

    expect(screen.getByRole('heading', { name: 'Week Weather' })).toBeInTheDocument()
    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getByText('Tomorrow')).toBeInTheDocument()
    expect(screen.getByText('in 6 days')).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(7)
  })
})
