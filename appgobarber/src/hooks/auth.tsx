import React, {
    useContext,
    createContext,
    useState,
    useCallback,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthState {
    token: string;
    user: Record<string, unknown>;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: Record<string, unknown>;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
    const [infos, setInfos] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const [[, token], [, user]] = (await AsyncStorage.multiGet([
                    '@GoBarber:token',
                    '@GoBarber:user',
                ])) || [
                    ['', ''],
                    ['', ''],
                ];
                if (token && user) {
                    setInfos({
                        token,
                        user: JSON.parse(user),
                    });
                }
            } finally {
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    const signIn = useCallback(
        async ({ email, password }: SignInCredentials) => {
            const {
                data: { token, user },
            } = await api.post<AuthState>('session', {
                email,
                password,
            });
            api.defaults.headers = `Bearer ${token}`;
            await AsyncStorage.multiSet([
                ['@GoBarber:token', token],
                ['@GoBarber:user', JSON.stringify(user)],
            ]);

            setInfos({ token, user });
        },
        [],
    );
    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
        setInfos({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: infos.user, signIn, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
