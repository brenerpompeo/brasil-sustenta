import { expect, test } from "@playwright/test";

test.describe("dashboard empresa preview", () => {
  test("renders ai match workspace in preview mode", async ({ page }) => {
    await page.goto("/dashboard/empresa?preview=true");

    const fitIaButton = page.getByRole("button", { name: /fit ia/i });
    await expect(fitIaButton).toBeVisible();
    await fitIaButton.click();
    await expect(page.getByText(/fit ia por desafio/i)).toBeVisible();
  });
});
