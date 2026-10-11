import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            dashboardTitle: 'DevPulse Engineering & Analytics',
            activeRepos: 'Active Repositories',
            deployments: 'Deployments',
            apiStatus: 'API Status',
            themeDark: 'Dark',
            themeLight: 'Light',
            loadingRest: 'Loading REST API data...',
            loadingGql: 'Loading GraphQL feed...',
            activeRepositories: 'Active Repositories',
            deploymentsToday: 'Deployments Today',
            status: 'Status',
            telemetryFeed: 'Telemetry Feed',
            recentCommits: 'Recent Commits',
            subtitle: 'Real-time telemetry, REST endpoints, and GraphQL feed monitoring.',
            // Clean keys translation
            statusOk: 'Operational (200 OK)',
            statusActive: 'Connected (GraphQL Endpoint Active)',
            commit1: 'Fix TypeScript build errors',
            commit2: 'Add TanStack Query caching',
        },
    },
    am: {
        translation: {
            dashboardTitle: 'ዴቭፓልስ ኢንጂነሪንግ እና ትንተና',
            activeRepos: 'ንቁ ሪፖዚቶሪዎች',
            deployments: 'ማሰማራቶች',
            apiStatus: 'የኤፒአይ ሁኔታ',
            themeDark: 'ጨለማ',
            themeLight: 'ብርሃን',
            loadingRest: 'የ REST API መረጃ በመጫን ላይ...',
            loadingGql: 'የ GraphQL ፊድ በመጫን ላይ...',
            activeRepositories: 'ንቁ ሪፖዚቶሪዎች',
            deploymentsToday: 'ዛሬ የተከናወኑ ማሰማራቶች',
            status: 'ሁኔታ',
            telemetryFeed: 'ቴሌሜትሪ ፊድ',
            recentCommits: 'የቅርብ ጊዜ ኮሚቶች',
            subtitle: 'የእውነተኛ ጊዜ ቴሌሜትሪ፣ የ REST ኤንድፖይንቶች እና የ GraphQL ፊድ ክትትል።',
            // Clean keys translation in Amharic
            statusOk: 'በሥራ ላይ ያለ (200 OK)',
            statusActive: 'ተገናኝቷል (ግራፍኪኤል ኤንድፖይንት ንቁ ነው)',
            commit1: 'የታይፕስክሪፕት ቢልድ ስህተቶችን አስተካክል',
            commit2: 'የታንስታክ ኬሪ መሸጎጫ (caching) ጨምር',
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;