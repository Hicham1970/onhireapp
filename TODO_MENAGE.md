# TODO_MENAGE.md - SAAS User/Admin Dashboard Separation

## 🎯 Objectif
Séparer dashboard_user (tous users) et dashboard_admin (admin seulement)

## 📋 Étapes

### 1. **Restructuration des fichiers**
```
src/pages/
├── Dashboard.jsx → DashboardUser.jsx (user dashboard)
├── Onhire.jsx → DashboardAdmin.jsx (admin dashboard)
└── CreateSurvey.jsx (nouveau - blank survey form)
```

### 2. **Nouvelles routes App.jsx**
```
Route: /dashboard → DashboardUser (tous users)
Route: /admin/dashboard → DashboardAdmin (admin seulement)  
Route: /create-survey → CreateSurvey (accessible depuis DashboardUser)
```

### 3. **DashboardUser.jsx (ex-Dashboard.jsx)**
- Stats utilisateur uniquement  
- Bouton "Créer Expertise" → /create-survey
- Liste des propres rapports/surveys
- Bouton "Inspection Report" → onhire?tab=pictures (user-specific)

### 4. **DashboardAdmin.jsx (ex-Onhire.jsx)**  
- Accès complet (tous users)
- Admin badge navbar
- Tous onglets (surveys, users, settings, etc.)

### 5. **CreateSurvey.jsx (nouveau)**
```
- Formulaire blank survey (FuelCalculator intégré)
- Champs vessel info (name, IMO, etc.)
- Tables sounding par défaut
- Sauvegarde dans Firebase user-specific
- Retour vers DashboardUser
```

### 6. **Firebase Security Rules (database.rules.json)**
```
users/$uid:
  .read: "auth.uid === $uid || isAdmin()"
  .write: "auth.uid === $uid || isAdmin()"

surveys/$uid, reports/$uid, vessels/$uid:
  .read: "auth.uid === $uid || isAdmin()"
  .write: "auth.uid === $uid || isAdmin()"
```

### 7. **Navbar mise à jour**
```
- Si user.role === 'admin' → Badge "ADMIN" + lien /admin/dashboard
- User normal → DashboardUser seulement
```

### 8. **Fonctions manquantes à implémenter**
```
[X] CreateSurvey.jsx (blank form)
[X] Renommer fichiers
[X] Update routing App.jsx  
[X] Update AuthContext isAdmin() logic
[X] Navbar admin detection
[X] Update all imports (Dashboard → DashboardUser)
```

### 9. **Tests**
```
[ ] Login user → /dashboard (DashboardUser)
[ ] "Créer Expertise" → /create-survey (blank form)
[ ] Admin → /admin/dashboard (full access)
[ ] User data isolation
[ ] Navigation back DashboardUser
[ ] Navbar admin badge
```

## 🚀 Ordre d'exécution
1. Créer TODO_MENAGE.md ✅
2. `create_file src/pages/CreateSurvey.jsx`
3. `edit_file src/App.jsx` (routing)
4. `edit_file src/pages/Dashboard.jsx` → DashboardUser
5. `edit_file src/pages/Onhire.jsx` → DashboardAdmin  
6. `edit_file database.rules.json`
7. `edit_file src/components/Navbar.jsx`
8. **Test & Completion**

**Confirm to proceed?**
