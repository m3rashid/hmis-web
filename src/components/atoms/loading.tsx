import { Component, JSX, Show } from 'solid-js';

interface IProps {
  loading: boolean;
}

const Loading: Component<IProps> = (props) => {
  return (
    <Show when={props.loading}>
      <div class='flex items-center justify-center'>
        <p>Loading ....</p>
      </div>
    </Show>
  );
};

export default Loading;
