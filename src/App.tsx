import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store, type RootState } from './store/store';
import { toggleTheme } from './store/settingsSlice';
import { fetchRestMetrics, fetchGraphqlActivity } from './api/apiService';
// @ts-ignore
import './i18n/i18n';

const queryClient = new QueryClient();

const DashboardContent: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.settings.theme);

  // TanStack Query for REST API metrics
  const { data: restData, isLoading: restLoading } = useQuery({
    queryKey: ['restMetrics'],
    queryFn: fetchRestMetrics,
  });

  // TanStack Query for GraphQL activity
  const { data: gqlData, isLoading: gqlLoading } = useQuery({
    queryKey: ['graphqlActivity'],
    queryFn: fetchGraphqlActivity,
  });

  const changeLanguage = () => {
    const newLang = i18n.language === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
  };

  // Compact modern pill button style
  const pillButtonStyle = {
    backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
    color: theme === 'dark' ? '#f9fafb' : '#1f2937',
    border: theme === 'dark' ? '1px solid #4b5563' : '1px solid #d1d5db',
    padding: '0.4rem 0.8rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.85rem',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease-in-out',
  };

  // Modern Chic Card Container Style
  const modernCardStyle = {
    background: theme === 'dark' ? '#1f2937' : '#ffffff',
    padding: '1.5rem',
    borderRadius: '16px',
    boxShadow: theme === 'dark' ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    border: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
    overflow: 'hidden',
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ background: theme === 'dark' ? '#111827' : '#f3f4f6', color: theme === 'dark' ? '#f9fafb' : '#1f2937', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', boxSizing: 'border-box', overflowX: 'hidden' }}>

      {/* Top Right Controls Bar safely pinned inside the screen container */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => dispatch(toggleTheme())}
          style={pillButtonStyle}
        >
          🎨 {theme === 'dark' ? t('themeDark') : t('themeLight')}
        </button>
        <button
          onClick={changeLanguage}
          style={pillButtonStyle}
        >
          🌐 {i18n.language === 'en' ? 'አማርኛ' : 'English'}
        </button>
      </div>

      {/* Centered Modern Main Header */}
      <header style={{
        marginTop: '1.5rem',
        marginBottom: '2.5rem',
        paddingBottom: '1.5rem',
        borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #e5e7eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            lineHeight: '1.4',
            paddingBottom: '0.2rem',
            display: 'inline-block'
          }}>
            {t('dashboardTitle')}
          </span>
          <span style={{
            backgroundColor: theme === 'dark' ? '#1e3a8a' : '#dbeafe',
            color: theme === 'dark' ? '#93c5fd' : '#1d4ed8',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '0.2rem 0.6rem',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Live v1.0
          </span>
        </div>
        <p style={{
          margin: 0,
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          fontSize: '0.95rem',
          fontWeight: 400,
          maxWidth: '600px'
        }}>
          {t('subtitle')}
        </p>
      </header>

      {/* Fully Responsive Dashboard Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>

        {/* REST API Card */}
        <div style={modernCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6', paddingBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, wordBreak: 'break-word', flex: '1 1 180px' }}>🚀 {t('activeRepos')} & {t('deployments')}</h3>
            <span style={{ fontSize: '0.75rem', background: '#3b82f620', color: '#3b82f6', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 600, whiteSpace: 'nowrap' }}>REST API</span>
          </div>

          {restLoading ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>{t('loadingRest')}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: theme === 'dark' ? '#37415150' : '#f9fafb', borderRadius: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: '0.9rem' }}>{t('activeRepositories')}</span>
                <strong style={{ fontSize: '1.1rem', color: '#3b82f6' }}>{restData?.activeRepos}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: theme === 'dark' ? '#37415150' : '#f9fafb', borderRadius: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: '0.9rem' }}>{t('deploymentsToday')}</span>
                <strong style={{ fontSize: '1.1rem', color: '#10b981' }}>{restData?.deploymentsToday}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: theme === 'dark' ? '#37415150' : '#f9fafb', borderRadius: '8px', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: '0.9rem' }}>{t('status')}</span>
                <span style={{ background: '#10b98120', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                  ● {t(restData?.restApiStatus || 'statusOk')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* GraphQL Card */}
        <div style={modernCardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: theme === 'dark' ? '1px solid #374151' : '1px solid #f3f4f6', paddingBottom: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, wordBreak: 'break-word', flex: '1 1 180px' }}>⚡ {t('apiStatus')} (GraphQL)</h3>
            <span style={{ fontSize: '0.75rem', background: '#ec489920', color: '#ec4899', padding: '0.2rem 0.5rem', borderRadius: '6px', fontWeight: 600, whiteSpace: 'nowrap' }}>GraphQL</span>
          </div>

          {gqlLoading ? (
            <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem 0' }}>{t('loadingGql')}</p>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: theme === 'dark' ? '#37415150' : '#f9fafb', borderRadius: '8px', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ color: theme === 'dark' ? '#9ca3af' : '#4b5563', fontSize: '0.9rem' }}>{t('telemetryFeed')}</span>
                <span style={{ background: '#3b82f620', color: '#3b82f6', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                  ● {t(gqlData?.data.graphqlStatus || 'statusActive')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: theme === 'dark' ? '#9ca3af' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('recentCommits')}:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {gqlData?.data.recentCommits.map((c) => (
                  <div key={c.id} style={{ background: theme === 'dark' ? '#374151' : '#f9fafb', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #3b82f6', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', flexWrap: 'wrap', gap: '0.25rem' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#3b82f6' }}>{c.author}</strong>
                      <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{c.timestamp}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9, wordBreak: 'break-word' }}>"{t(c.message)}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DashboardContent />
      </QueryClientProvider>
    </Provider>
  );
}