import { test, expect } from '@playwright/test'
import weatherResponse from './fixtures/weatherResponse'

test.describe('Weather app', () => {
  const mockSuccessWeather = async (page: import('@playwright/test').Page) => {
    await page.route('**/VisualCrossingWebServices/rest/services/timeline/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(weatherResponse),
      })
    })
  }

  const mockNotFoundWeather = async (page: import('@playwright/test').Page) => {
    await page.route('**/VisualCrossingWebServices/rest/services/timeline/**', async (route) => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Not found' }),
      })
    })
  }

  test('loads city weather and switches forecast periods', async ({ page }) => {
    await mockSuccessWeather(page)
    await page.goto('/')

    await page.getByPlaceholder('Enter your city').fill('Yekaterinburg')
    await page.getByRole('button', { name: 'Search' }).click()

    await expect(page.locator('.city-name')).toHaveText('Yekaterinburg')
    await expect(page.getByRole('heading', { name: 'Current Weather' })).toBeVisible()

    await page.getByRole('button', { name: 'Week' }).click()
    await expect(page.getByRole('heading', { name: 'Week Weather' })).toBeVisible()
    await expect(page.getByText('in 6 days')).toBeVisible()

    await page.getByRole('button', { name: '15 Days' }).click()
    await expect(page.getByRole('heading', { name: '15 Days Forecast' })).toBeVisible()
    await expect(page.locator('.data-asset-forecast')).toHaveCount(15)
    await expect(page.getByText('Mar 16')).toBeVisible()
  })

  test('shows "City not found" and keeps forecast container hidden when backend returns 404', async ({
    page,
  }) => {
    await mockNotFoundWeather(page)
    await page.goto('/')

    await page.getByPlaceholder('Enter your city').fill('UnknownCity')
    await page.getByRole('button', { name: 'Search' }).click()

    await expect(page.locator('.city-name')).toHaveText('City not found')
    await expect(page.locator('.container-table')).toHaveCount(0)
  })

  test('shows forecast container after search', async ({ page }) => {
    await mockSuccessWeather(page)
    await page.goto('/')

    await expect(page.locator('.container-table')).toHaveCount(0)

    await page.getByPlaceholder('Enter your city').fill('Yekaterinburg')
    await page.getByRole('button', { name: 'Search' }).click()

    await expect(page.locator('.container-nav')).toHaveClass(/with-results/)
    await expect(page.locator('.container-table')).toBeVisible()
    await expect(page.locator('.mode-content')).toBeVisible()
  })

  test('smoke: all period tabs are clickable and render expected headings', async ({ page }) => {
    await mockSuccessWeather(page)
    await page.goto('/')

    await page.getByPlaceholder('Enter your city').fill('Yekaterinburg')
    await page.getByRole('button', { name: 'Search' }).click()

    await page.getByRole('button', { name: 'Today' }).click()
    await expect(page.getByRole('heading', { name: 'Current Weather' })).toBeVisible()

    await page.getByRole('button', { name: '3 Days' }).click()
    await expect(page.getByRole('heading', { name: '3 Days Weather' })).toBeVisible()

    await page.getByRole('button', { name: 'Week' }).click()
    await expect(page.getByRole('heading', { name: 'Week Weather' })).toBeVisible()

    await page.getByRole('button', { name: '15 Days' }).click()
    await expect(page.getByRole('heading', { name: '15 Days Forecast' })).toBeVisible()
  })
})
