# TODO-TWEAK: Draft Survey Evolution

## 1. Logic & Data Structure
- [x] Add `operationType` ('Loading' | 'Unloading') to `DraftSurvey` type and context.
- [x] Implement cargo calculation based on operation type:
    - **Loading**: `Cargo = Final Net - Initial Net`
    - **Unloading**: `Cargo = Initial Net - Final Net`
- [x] Add `interpolation` data to `SurveyStep` type (Hydrostatic inputs).

## 2. UI Refactoring (Sidebar Navigation)
- [x] Create a `DraftSurveyLayout.tsx` which includes a persistent sidebar.
- [x] Implement Navigation Sidebar with the following items:
    - **Général**: Infos Générales & Client.
    - **Caractéristiques**: LBP, Distances marques, Epaisseur quille.
    - **Draft Initial**:
        - Lectures (Draft lues)
        - Corrections & MOM (Calculation sub-step)
        - Hydrostatiques & Interpolation
        - Déductibles
    - **Draft Final**: (Same sub-items as Initial)
    - **Récapitulatif**: Final results, Firebase Save, PDF Export.

## 3. Component Updates
- [x] Refactor `Infos.tsx` to include `operationType` selection.
- [x] Update `Calculation.tsx` to display sub-step calculations (Trim corr, MOM).
- [x] Enhance `Displacement.tsx` / `Hydrostatics` to include interpolation notes.
- [x] Ensure all pages respond to the sidebar navigation state.

## 4. Finalization
- [x] Update `DraftSurveyReport.tsx` (Recap) to follow the new UI style.
- [ ] Update `ToPdf.ts` to match the comprehensive report format. (Pending actual PDF design request)
- [x] Final end-to-end testing of the "Loading vs Unloading" scenarios.
