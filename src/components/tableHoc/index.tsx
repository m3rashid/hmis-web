import { Show } from 'solid-js';
import useTableHoc, { TableHocProps } from './useTableHoc';
import { Icon } from 'solid-heroicons';
import { informationCircle, pencil, trash } from 'solid-heroicons/outline';

const TableHoc = <T extends Record<any, any>>(props: TableHocProps<T>) => {
  const { state, setState } = useTableHoc<T>(props);

  const TabPanel = () => {
    return (
      <div class='flex flex-col sm:flex-row items-center justify-between'>
        <Show when={props.title} fallback={<div />}>
          <h2 class='text-2xl font-semibold text-gray-700'>{props.title}</h2>
        </Show>

        <div class='flex items-center justify-center sm:justify-end flex-grow mr-2'>
          <div class='flex gap-2'>
            {/* show info button only if only one row is selected */}
            <Show when={state.getSelectedRows().length === 1}>
              <button
                onClick={() => {}}
                class='flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              >
                <Icon path={informationCircle} class='w-5' />
                <span>Info</span>
              </button>
            </Show>

            {/* show edit button only if only one row is selected */}
            <Show
              when={
                props.services?.edit && state.getSelectedRows().length === 1
              }
            >
              <button
                onClick={() => {}}
                class='flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              >
                <Icon path={pencil} class='w-5' />
                <span>Edit</span>
              </button>
            </Show>

            {/* show delete button only if any number of rows are selected */}
            <Show
              when={
                props.services?.delete && state.getSelectedRows().length > 0
              }
            >
              {/* Handle Confirm before deleting */}
              <button
                onClick={() => {}}
                class='flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
              >
                <Icon path={trash} class='w-5' />
                <span>Delete</span>
              </button>
            </Show>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Show when={props.dialogType === 'modal'}>{/* modal */}</Show>
      <Show when={props.dialogType === 'drawer'}>{/* drawer */}</Show>

      <Show when={state.getSelectedRows().length === 1}>
        {/* modal for details */}
      </Show>

      <Show when={props.title} fallback={<div />}>
        <h2 class='text-2xl font-semibold text-gray-700'>{props.title}</h2>
      </Show>

      {/* Actual table */}
    </>
  );
};

export default TableHoc;
