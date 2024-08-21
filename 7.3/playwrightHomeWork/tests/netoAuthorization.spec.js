import { test, expect } from "@playwright/test";
const { chromium } = require("playwright");
const { email, password } = require("../user.js");

test("Authorization in your Netology personal account", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await expect(page).toHaveURL("https://netology.ru/profile/8969386");
  await expect (page.getByRole("heading", { name: "Моё обучение" })).toBeVisible();
});

test("Invalid authorization in Netology personal account", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.getByRole("link", { name: "Войти" }).click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test@test");
  await page.getByPlaceholder("Пароль").click();
  await expect(page.getByText("Неверный email")).toBeVisible();
});
