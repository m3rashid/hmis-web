import dayjs from 'dayjs';
import { For, Match, Suspense, Switch } from 'solid-js';
import useTable, { ColumnType, TableProps } from './useTable';

const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
  const { state, setState, actions } = useTable<T>(props);

  const columns: ColumnType<T>[] = [
    ...props.columns,
    ...(props.showCreatedAt
      ? [
          {
            key: 'createdAt',
            title: 'Created At',
            render: ({ data }: any) => (
              <div class='w-[80px]'>
                {dayjs(String(data)).format('DD-MM-YYYY')}
              </div>
            ),
          },
        ]
      : []),
    ...(props.showUpdatedAt
      ? [
          {
            key: 'updatedAt',
            title: 'Updated At',
            render: ({ data }: any) => (
              <div class='w-[80px]'>
                {dayjs(String(data)).format('DD-MM-YYYY')}
              </div>
            ),
          },
        ]
      : []),
  ];

  const ShowOnEmptyTable = () => {
    return <div>Table is Empty</div>;
  };

  return (
    <div class='overflow-x-auto overflow-y-hidden h-[calc(100vh-100px)]'>
      {/* Header */}
      <div class='sm:flex sm:items-center'>
        <div class='sm:flex-auto'>
          <h1 class='text-base font-semibold leading-6 text-gray-900'>
            {props.title}
          </h1>
          <p class='mt-2 text-sm text-gray-700'>{props.description}</p>
        </div>
        <div class='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
          <button
            type='button'
            class='block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            {props.addButtonLabel}
          </button>
        </div>
      </div>

      {/* Table */}
      <div class='mt-8 flow-root overflow-y-auto h-[100%] rounded-md'>
        <div class='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div class='inline-block min-w-full py-2 align-middle px-2 sm:px-6 lg:px-8'>
            <table class='min-w-full divide-y divide-gray-300 shadow-md'>
              <thead>
                <tr class='bg-gray-200 rounded-md'>
                  <th scope='col' class='relative px-7 sm:w-12 sm:px-6'>
                    <input
                      type='checkbox'
                      class='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-gray-200'
                      checked={
                        state.getCheckedRows().length ===
                        state.getQuery.data?.data.docs.length
                      }
                      onClick={(e) => {
                        actions.checkUncheckAllRows(e.currentTarget.checked);
                      }}
                    />
                  </th>

                  <For each={columns}>
                    {(column) => (
                      <th
                        scope='col'
                        class={`text-left text-sm font-semibold text-gray-900 ${
                          props.size === 'large'
                            ? 'py-4 px-5'
                            : props.size === 'small'
                            ? 'py-2 px-2'
                            : 'py-3 px-4'
                        } ${column.class}`}
                      >
                        {column.title}
                      </th>
                    )}
                  </For>
                </tr>
              </thead>

              <tbody class='divide-y divide-gray-200 bg-white'>
                <Suspense fallback={<ShowOnEmptyTable />}>
                  <For each={state.getQuery.data?.data.docs}>
                    {(tableData) => (
                      <tr>
                        <td class='relative px-7 sm:w-12 sm:px-6 '>
                          <input
                            type='checkbox'
                            class='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-white'
                            checked={state
                              .getCheckedRows()
                              .includes(tableData._id)}
                            onClick={(e) => {
                              actions.checkUncheckRow(
                                e.currentTarget.checked,
                                tableData._id
                              );
                            }}
                          />
                        </td>

                        <For each={columns}>
                          {(column) => (
                            <td
                              class={`whitespace-nowrap text-sm ${
                                props.size === 'large'
                                  ? 'py-4 px-5'
                                  : props.size === 'small'
                                  ? 'py-2 px-2'
                                  : 'py-3 px-4'
                              } ${column.class}`}
                            >
                              <Switch>
                                <Match when={!!column.render}>
                                  {column.render && (
                                    <column.render
                                      data={tableData[column.key]}
                                      record={tableData}
                                      class={
                                        props.size === 'large'
                                          ? 'py-4 px-5'
                                          : props.size === 'small'
                                          ? 'py-2 px-2'
                                          : 'py-3 px-4'
                                      }
                                    />
                                  )}
                                </Match>

                                <Match when={!column.render}>
                                  {tableData[column.key]}
                                </Match>
                              </Switch>
                            </td>
                          )}
                        </For>
                      </tr>
                    )}
                  </For>
                </Suspense>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
