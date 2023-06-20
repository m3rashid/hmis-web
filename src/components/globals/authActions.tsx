import { Component, Match, createSignal } from 'solid-js';
import { useUi } from '../../context/ui';
import { useAuth } from '../../context/auth';

interface IProps {}

const AuthActions: Component<IProps> = () => {
  const [ui, setUi] = useUi();
  const [getAuth, setAuth] = useAuth();
  const [getAuthModalVisible, setAuthModalVisible] = createSignal(false);
  return (
    <>
      <Match when={getAuth().isLoggedIn}>
        <p>user Logged in</p>
      </Match>
      <Match when={!getAuth().isLoggedIn}>
        <p>user not Logged in</p>
      </Match>
    </>
  );
};

export default AuthActions;
