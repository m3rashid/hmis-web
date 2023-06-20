import { JSX, createSignal } from 'solid-js';
import { ServiceHelper } from '../../api/service';
import { createQuery } from '@tanstack/solid-query';

export interface ColumnType<T extends Record<string, any>> {
  title: string;
  class?: string;
  key: string;
  render?: (props: {
    data: T[string];
    record: T;
    class?: string;
  }) => JSX.Element;
}

export interface TableProps<T extends Record<string, any>> {
  services: {
    list: ServiceHelper<any, any>;
    edit?: ServiceHelper<any, any>;
    create?: ServiceHelper<any, any>;
    details?: ServiceHelper<any, any>;
    delete?: ServiceHelper<any, any>;
  };
  columns: Array<ColumnType<T>>;
  title: string;
  description: string;
  addButtonLabel: string;
  showCreatedTime?: boolean;
  showUpdatedTime?: boolean;
  actionsButtons?: JSX.Element;
  notToShowInfo?: string[];
  modifyDetails?: (details: T) => Record<string, string>;
  dialogType?: 'modal' | 'drawer';
  showCreatedAt?: boolean;
  showUpdatedAt?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const useTable = <T extends Record<string, any>>(props: TableProps<T>) => {
  const [getInfoModalVisible, setInfoModalVisible] = createSignal(false);
  const [getLoading, setLoading] = createSignal(false);
  const [getCheckedRows, setCheckedRows] = createSignal<string[]>([]);

  const getQuery = createQuery({
    queryKey: () => [props.title],
    queryFn: props.services.list,
  });

  const checkUncheckAllRows = (checked: boolean) => {
    const ids = getQuery.data?.data.docs.map((t: T) => t._id);
    setCheckedRows(!checked ? [] : ids);
  };

  const checkUncheckRow = (checked: boolean, _id: string) => {
    setCheckedRows((prev) => {
      const rows = prev.filter((id) => id !== _id);
      if (checked) return [...prev, _id];
      return rows;
    });
  };

  return {
    state: {
      getInfoModalVisible,
      getLoading,
      getQuery,
      getCheckedRows,
    },
    setState: {
      setInfoModalVisible,
      setLoading,
    },
    actions: {
      checkUncheckAllRows,
      checkUncheckRow,
    },
  };
};

export default useTable;
