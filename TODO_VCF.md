# VCF Calculator Implementation - Petrocal Enhancement

## Status: In Progress

## Approved Plan Summary
User confirmed: Separate inputs for A54/B54 sections. Density t/m³ (default 0.8365). VCF to 5 decimal places.

## Breakdown Steps:
### 1. [x] Implement calculateVCF_A54 in src/utils/vcfCalculator.js (Table 54A Crude coeffs)
### 2. [x] Rename current to calculateVCF_B54, export both + helper
### 3. [x] Update src/pages/Petrocal.jsx: VCF category with 2 sections (separate temp/density inputs)
### 4. [x] Add live calculation useEffect for both tables (5 decimals)
### 5. [x] French labels: Température (°C), Densité @15°C (t/m³), CVF calculé Table A54 (Brut), Table B54 (Produits finis)
### 6. [x] Test: npm run dev → Petrocal → VCF → verify calcs
### 7. [x] Update this TODO + attempt_completion

## Status: COMPLETE ✅

