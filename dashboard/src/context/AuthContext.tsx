import React, { createContext, useReducer, useEffect, ReactNode } from 'react';

// Define the shape of the initial state and the context
interface AuthState {
    user: any;
    loading: boolean;
    error: null | string;
}

interface AuthContextProps extends AuthState {
    dispatch: React.Dispatch<any>;
}

const INITIAL_STATE: AuthState = {
    user: JSON.parse(localStorage.getItem('user') as string) || null,
    loading: false,
    error: null,
};

// Create context
export const AuthContext = createContext<AuthContextProps>({
    ...INITIAL_STATE,
    dispatch: () => null,
});

// Reducer function to handle state changes
const AuthReducer = (state: AuthState, action: any): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                user: null,
                loading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

// Context provider component
export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.user));
    }, [state.user]);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
