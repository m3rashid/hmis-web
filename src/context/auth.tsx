import {
  Component,
  createContext,
  createSignal,
  JSX,
  Setter,
  useContext,
} from 'solid-js';

export type IUser = any;

export type IAuth = {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: any | null;
};

export const authDefaultState: IAuth = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authContext = createContext<[IAuth, Setter<IAuth>]>([
  authDefaultState,
  (() => {}) as Setter<IAuth>,
]);

export const AuthContextProvider: Component<{ children: JSX.Element }> = (
  props
) => {
  const [auth, setAuth] = createSignal<IAuth>(authDefaultState);
  return (
    <authContext.Provider value={[auth(), setAuth]}>
      {props.children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(authContext);
  if (!ctx) throw new Error('useAuth must be used within AuthContextProvider');
  return ctx;
};
