import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { I18nProvider } from '../i18n/I18nContext';
import { ThemeProvider } from '../theme/ThemeContext';
import '../globals.css';

function LayoutInner() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Home page manages its own layout (no header, self-contained)
  if (isHome) {
    return <Outlet />;
  }

  // Other pages get the standard layout with Header + Footer
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <LayoutInner />
      </I18nProvider>
    </ThemeProvider>
  );
}
