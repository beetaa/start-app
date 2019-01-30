describe('百度', () => {
  beforeAll(async () => {
    await page.goto('https://www.baidu.com')
  })

  it('should display "百度" text on page', async () => {
    await expect(page).toMatch('百度')
  })
})
