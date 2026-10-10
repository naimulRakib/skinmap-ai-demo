import { test, expect } from '@playwright/test';

test.describe('SkinMap AI Demo Story', () => {
  test('Complete user loop - onboarding to decision', async ({ page }) => {
    // Navigate to root (which redirects to /bn/onboarding or /bn/home)
    await page.goto('/');

    // Ensure we start at onboarding or home
    const url = page.url();
    
    // For the demo, we assume the user might already be onboarded due to Zustand persist
    // So let's reset via Demo Director first
    await page.keyboard.press('d');
    
    // Click Reset button inside Demo Director
    const resetButton = page.locator('#demo-reset');
    if (await resetButton.isVisible()) {
      await resetButton.click();
    }
    
    // Now we should definitely be at onboarding
    await expect(page).toHaveURL(/.*\/onboarding/);
    
    // 1. Onboarding
    await page.getByRole('button', { name: 'শুরু করুন' }).click();
    await expect(page).toHaveURL(/.*\/profile/);
    
    // 2. Profile
    await page.getByRole('button', { name: 'সংরক্ষণ করুন' }).click();
    await expect(page).toHaveURL(/.*\/home/);
    
    // 3. Home
    await expect(page.getByText('আজকের পরিস্থিতি')).toBeVisible();
    
    // 4. Tab Navigation -> Routine
    await page.locator('a[href="/bn/routine"]').click();
    await expect(page).toHaveURL(/.*\/routine/);
    await expect(page.getByText('সকালের রুটিন')).toBeVisible();
    
    // 5. Tab Navigation -> Check-in
    await page.locator('a[href="/bn/checkin"]').click();
    await expect(page).toHaveURL(/.*\/checkin/);
    
    // Submit check-in
    await page.getByRole('button', { name: 'চেক-ইন সম্পন্ন করুন' }).click();
    
    // 6. Redirects to Decision
    await expect(page).toHaveURL(/.*\/decision/);
    await expect(page.getByText('কেন এই সিদ্ধান্ত?')).toBeVisible();
    
    // 7. Demo Director -> Time Travel
    await page.keyboard.press('d');
    await page.getByText('+5').click();
    
    // 8. Demo Director -> Change Persona
    await page.keyboard.press('d');
    await page.locator('#demo-persona-persona-c').click();
    
    // Should reload and have persona C
    await page.goto('/bn/decision');
    await expect(page.getByText('সতর্কতা: সাবধানে পর্যালোচনা করুন বা বিশেষজ্ঞের পরামর্শ নিন').or(page.getByText('জরুরি পরামর্শ নিন'))).toBeVisible();
    
    // 9. Expert Handoff
    await page.goto('/bn/expert');
    await expect(page.getByText('চর্মরোগ বিশেষজ্ঞের সঙ্গে কথা বলুন')).toBeVisible();
  });
});
