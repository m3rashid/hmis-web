import { Component, JSX, createContext, useContext } from 'solid-js';

export type IUi = {
  sidebarCollapsed: boolean;
  isMobile: boolean;
};

export const defaultUiState: IUi = {
  sidebarCollapsed: false,
  isMobile: true,
};

export const uiContext = createContext<[IUi, () => void]>([
  defaultUiState,
  () => {},
]);

export const UiContextProvider: Component<{ children: JSX.Element }> = (
  props
) => {
  return (
    <uiContext.Provider value={[defaultUiState, () => {}]}>
      {props.children}
    </uiContext.Provider>
  );
};

export const useUi = () => {
  const ctx = useContext(uiContext);
  if (!ctx) throw new Error('useAuth must be used within UiContextProvider');
  return ctx;
};
