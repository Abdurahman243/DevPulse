import { createSlice } from '@reduxjs/toolkit';
interface SettingsState {
    theme: 'dark' | 'light';
    sidebarOpen: boolean;
}

const initialState: SettingsState = {
    theme: 'dark',
    sidebarOpen: true,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
        toggleSidebar: (state) => {
            state.sidebarOpen = !state.sidebarOpen;
        },
    },
});

export const { toggleTheme, toggleSidebar } = settingsSlice.actions;
export default settingsSlice.reducer;