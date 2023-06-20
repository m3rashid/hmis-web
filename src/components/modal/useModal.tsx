import { Accessor, JSX, Setter, createSignal } from 'solid-js';

export interface ModalProps {
  title: string;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: boolean;
  children: JSX.Element;
  getOpen: Accessor<boolean>;
  setOpen: Setter<boolean>;
}

const useModal = (props: ModalProps) => {
  return {
    state: {},
    setState: {},
  };
};

export default useModal;
