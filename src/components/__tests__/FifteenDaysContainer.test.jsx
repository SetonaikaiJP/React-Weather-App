import { render, screen } from '@testing-library/react'
import FifteenDaysContainer from '../FifteenDaysContainer'

describe('FifteenDaysContainer', () => {
  it('shows loader when data is missing', () => {
    render(<FifteenDaysContainer data={null} />)

    expect(screen.getByText('Loading Data...')).toBeInTheDocument()
  })

  it('renders only first 15 days', () => {
    const data = {
      days: Array.from({ length: 20 }, (_, index) => {
        const date = new Date(2026, 2, 16 + index)
        const yyyy = date.getFullYear()
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate()).padStart(2, '0')

        return {
          datetime: `${yyyy}-${mm}-${dd}`,
          temp: 5 + index,
          tempmin: index,
          tempmax: index + 10,
          conditions: 'Overcast',
        }
      }),
    }

    const { container } = render(<FifteenDaysContainer data={data} />)

    expect(screen.getByRole('heading', { name: '15 Days Forecast' })).toBeInTheDocument()
    expect(screen.getByText('Mar 16')).toBeInTheDocument()
    expect(screen.getByText('Mar 30')).toBeInTheDocument()
    expect(screen.queryByText('Mar 31')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.data-asset-forecast')).toHaveLength(15)
  })
})
