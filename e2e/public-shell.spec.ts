import { expect, test } from "@playwright/test";

test.describe("public shell", () => {
  test("home exposes trust and ODS fit language", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByText(/seu desafio esg vira/i)
    ).toBeVisible();
    await expect(
      page.getByText(/desafios corporativos/i)
    ).toBeVisible();
    await expect(page.getByText(/campinas/i).first()).toBeVisible();
    await expect(page.getByText(/ods fit score/i).first()).toBeVisible();
  });

  test("manifesto page renders editorial narrative", async ({ page }) => {
    await page.goto("/manifesto");

    await expect(page.getByText(/manifesto/i).first()).toBeVisible();
    await expect(page.getByText(/sem caixa-preta/i)).toBeVisible();
  });
});
