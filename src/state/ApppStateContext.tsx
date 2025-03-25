import {createContext, useContext} from 'react';
import {usePageState} from './usePageState';
import {Page} from '../utils/types';


type AppStateContextType = ReturnType<typeof usePageState>;

const ApppStateContext = createContext<AppStateContextType>({} as AppStateContextType); // create a context with the return type of usePageState

type AppStateProviderProps = {
    children: React.ReactNode;
    initialState: Page;
}

export const AppStateProvider = ({children, initialState}: AppStateProviderProps) => {
    const pageStateHandlers = usePageState(initialState); // get the state from the usePageState hook
    return (
        <ApppStateContext.Provider value={pageStateHandlers}>
            {children}
        </ApppStateContext.Provider>
    );
}; // create a provider component that wraps the children with the context provider

export const useAppState = () => useContext(ApppStateContext); // create a custom hook to use the context