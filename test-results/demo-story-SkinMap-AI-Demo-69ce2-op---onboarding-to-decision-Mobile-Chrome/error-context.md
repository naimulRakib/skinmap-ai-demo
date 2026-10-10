# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: demo-story.spec.ts >> SkinMap AI Demo Story >> Complete user loop - onboarding to decision
- Location: e2e/demo-story.spec.ts:4:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*\/onboarding/
Received string:  "http://localhost:3000/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × locator resolved to <html lang="en">…</html>
       - unexpected value "http://localhost:3000/"

```

```yaml
- text: People's Republic of Bangladesh|Agricultural & Environmental Monitoring
- banner:
  - link "AgroSentinel Govt. Monitoring Portal":
    - /url: /
    - img
    - text: AgroSentinel Govt. Monitoring Portal
  - navigation:
    - link "Log In":
      - /url: /login
    - link "Register Portal":
      - /url: /signup
- main:
  - text: NSYSS 2026 — Official System
  - heading "Integrated Agro-Environmental Monitoring Network" [level=1]
  - paragraph: AgroSentinel detects crop diseases and industrial pollution in peri-urban agricultural zones of Bangladesh using multi-modal remote sensing, GIS mapping, and machine learning diagnostics.
  - link "Initialize Portal Access":
    - /url: /signup
  - link "Secure Sign In":
    - /url: /login
  - text: 3 Disease Categories Detected 94.2% Diagnostic Accuracy 27 Industrial Hotspots Mapped 50+ Validated Field Cases Core Capabilities
  - heading "Comprehensive Surveillance Parameters" [level=2]
  - img
  - heading "Biotic Disease Detection" [level=3]
  - paragraph: Identifies fungal, bacterial, viral, and pest-induced crop stresses using image analysis and environmental context. Covers 30+ disease types across 12 major crops.
  - img
  - heading "Pollution & Abiotic Stress" [level=3]
  - paragraph: Detects heavy metal contamination (Cr, Pb, As) from tannery and garment effluents. Maps pollution plumes using wind data and NDVI suppression patterns.
  - img
  - heading "GIS Spatial Mapping" [level=3]
  - paragraph: Satellite-derived NDWI and turbidity indices overlaid with industrial zone boundaries. Visualizes contamination spread across land parcels in real time.
  - img
  - heading "Weekly Field Surveys" [level=3]
  - paragraph: Structured survey methodology capturing soil pH, water quality, pest levels, and environmental stressors. Data feeds the diagnostic model as prior context.
  - img
  - heading "Water Quality Alerts" [level=3]
  - paragraph: Crowdsourced and satellite-verified water source monitoring. Generates risk alerts for irrigation canals, ponds, and rivers near agricultural plots.
  - img
  - heading "Risk Prediction & Reports" [level=3]
  - paragraph: Crop loss estimates and risk scores derived from multi-source data fusion. Exportable reports for submission to DAE, DOE, and other government bodies.
  - text: Framework
  - heading "Research & Analytical Methodology" [level=2]
  - paragraph: Our approach combines on-ground reality with high-altitude satellite reconnaissance, creating an immutable ledger of environmental data.
  - heading "Study Area" [level=3]
  - paragraph: Savar–Hemayetpur corridor, Dhaka, Bangladesh — a peri-urban zone adjacent to the Savar EPZ and Hazaribagh tannery relocation site. Characterized by high industrial effluent load and mixed smallholder agriculture.
  - heading "Validation" [level=3]
  - paragraph: Ground-truth validation conducted with agronomist-verified scan logs. Benchmark tested across 100+ simulated cases spanning biotic disease, heavy metal toxicity, and compound stress scenarios.
  - heading "Data Sources" [level=3]
  - text: ▶ Sentinel-2 NDVI / NDWI ▶ Open-Meteo Atmos Data ▶ DoE Industrial Boundaries ▶ Primary Field Surveys (N=50+) ▶ Gemini Vision API Model
  - heading "Access the Monitoring Dashboard" [level=2]
  - paragraph: Authorized personnel and registered agricultural workers may access the portal to view live pollution maps, submit field observations, and generate diagnostic reports.
  - link "Initialize Account":
    - /url: /signup
- contentinfo:
  - img
  - text: AgroSentinel
  - paragraph: Advanced agro-environmental monitoring system for detecting crop disease and industrial pollution in peri-urban agricultural zones. An initiative for a resilient agricultural future.
  - paragraph: NSYSS 2026 Research Project
  - paragraph: Dept. of Computer Science & Engineering, BUET
  - paragraph: © 2026 GreenHydra Research Group. All rights reserved.
  - text: Classified as Research Prototype For Demonstration Purposes Only
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('SkinMap AI Demo Story', () => {
  4  |   test('Complete user loop - onboarding to decision', async ({ page }) => {
  5  |     // Navigate to root (which redirects to /bn/onboarding or /bn/home)
  6  |     await page.goto('/');
  7  | 
  8  |     // Ensure we start at onboarding or home
  9  |     const url = page.url();
  10 |     
  11 |     // For the demo, we assume the user might already be onboarded due to Zustand persist
  12 |     // So let's reset via Demo Director first
  13 |     await page.keyboard.press('d');
  14 |     
  15 |     // Click Reset button inside Demo Director
  16 |     const resetButton = page.locator('#demo-reset');
  17 |     if (await resetButton.isVisible()) {
  18 |       await resetButton.click();
  19 |     }
  20 |     
  21 |     // Now we should definitely be at onboarding
> 22 |     await expect(page).toHaveURL(/.*\/onboarding/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  23 |     
  24 |     // 1. Onboarding
  25 |     await page.getByRole('button', { name: 'শুরু করুন' }).click();
  26 |     await expect(page).toHaveURL(/.*\/profile/);
  27 |     
  28 |     // 2. Profile
  29 |     await page.getByRole('button', { name: 'সংরক্ষণ করুন' }).click();
  30 |     await expect(page).toHaveURL(/.*\/home/);
  31 |     
  32 |     // 3. Home
  33 |     await expect(page.getByText('আজকের পরিস্থিতি')).toBeVisible();
  34 |     
  35 |     // 4. Tab Navigation -> Routine
  36 |     await page.locator('a[href="/bn/routine"]').click();
  37 |     await expect(page).toHaveURL(/.*\/routine/);
  38 |     await expect(page.getByText('সকালের রুটিন')).toBeVisible();
  39 |     
  40 |     // 5. Tab Navigation -> Check-in
  41 |     await page.locator('a[href="/bn/checkin"]').click();
  42 |     await expect(page).toHaveURL(/.*\/checkin/);
  43 |     
  44 |     // Submit check-in
  45 |     await page.getByRole('button', { name: 'চেক-ইন সম্পন্ন করুন' }).click();
  46 |     
  47 |     // 6. Redirects to Decision
  48 |     await expect(page).toHaveURL(/.*\/decision/);
  49 |     await expect(page.getByText('কেন এই সিদ্ধান্ত?')).toBeVisible();
  50 |     
  51 |     // 7. Demo Director -> Time Travel
  52 |     await page.keyboard.press('d');
  53 |     await page.getByText('+5').click();
  54 |     
  55 |     // 8. Demo Director -> Change Persona
  56 |     await page.keyboard.press('d');
  57 |     await page.locator('#demo-persona-persona-c').click();
  58 |     
  59 |     // Should reload and have persona C
  60 |     await page.goto('/bn/decision');
  61 |     await expect(page.getByText('সতর্কতা: সাবধানে পর্যালোচনা করুন বা বিশেষজ্ঞের পরামর্শ নিন').or(page.getByText('জরুরি পরামর্শ নিন'))).toBeVisible();
  62 |     
  63 |     // 9. Expert Handoff
  64 |     await page.goto('/bn/expert');
  65 |     await expect(page.getByText('চর্মরোগ বিশেষজ্ঞের সঙ্গে কথা বলুন')).toBeVisible();
  66 |   });
  67 | });
  68 | 
```