const productName = 'Кавомашина NIVONA CafeRomatica NICR 790';
const buyerPhone = '+38(098) 098 09 80';
const buyerEmail = 'email@test.com';
const buyerName = 'Anna';
const buyerSurname = 'Maria';

const { test, expect } = require('@playwright/test');
const { on } = require('ws');

test.use({
  video: 'on',
});

test('shopping', async ({ page }) => {
  await page.goto('https://www.foxtrot.com.ua/uk');

  // Serching for the product
  await page.click('[placeholder="Я\\ шукаю\\ \\.\\.\\."]');
  await page.fill('[placeholder="Я\\ шукаю\\ \\.\\.\\."]', productName);
  await Promise.all([
    page.waitForNavigation(),
    page.click('text=Знайти')
  ]);
  await page.click('img[alt="Кавомашина\\ NIVONA\\ CafeRomatica\\ NICR\\ 790"]');

  // Adding product to the Cart
  await expect(page).toHaveURL(/.*shop/);
  await page.click('#anchor-1 >> text=Купити');
  await page.click('#anchor-1 >> text=В кошику');
  //await page.pause();
  await page.click('#product-minimap-container >> :nth-match(div:has-text("В кошику"), 2)');
  await page.click('text=Оформити замовлення');
  await expect(page).toHaveURL('https://www.foxtrot.com.ua/uk/cart/checkout');

  // Check out
  await page.click('[placeholder="Ваш\\ телефон"]');
  await page.fill('[placeholder="Ваш\\ телефон"]', buyerPhone);

  await page.click('[placeholder="Ім\\\'я"]');
  await page.fill('[placeholder="Ім\\\'я"]', buyerName);

  await page.click('[placeholder="Прізвище"]');
  await page.fill('[placeholder="Прізвище"]', buyerSurname);

  await page.click('[placeholder="email\\@foxtrot\\.ua"]');
  await page.fill('[placeholder="email\\@foxtrot\\.ua"]', buyerEmail);

  await page.click('text=Львів');
  await page.click('text=Самовивіз з 8 магазинів');
  await page.click('span[role="textbox"]:has-text("Вкажіть точку самовивозу")');
  await page.click('li[role="option"]:has-text("ТРЦ King Cross, вул. Стрийська, 30, 10:00:00 - 22:00:00")');
  await page.click('text=Оплата карткою при отриманні');

  await page.click('button:has-text("ПІДТВЕРДИТИ ЗАМОВЛЕННЯ")');

});