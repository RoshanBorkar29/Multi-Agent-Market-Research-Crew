import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { DashboardPage } from './pages/DashboardPage';
import { PastReportsPage } from './pages/PastReportsPage';
import { SavedIdeasPage } from './pages/SavedIdeasPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="history" element={<PastReportsPage />} />
          <Route path="saved" element={<SavedIdeasPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
