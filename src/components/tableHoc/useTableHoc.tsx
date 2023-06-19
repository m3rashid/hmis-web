import { JSX, createSignal } from 'solid-js';
import { ServiceHelper } from '../../api/service';
import { MODELS } from '@hmis/gatekeeper';

export interface TableHocProps<T> {
  services?: {
    get?: ServiceHelper<any, any>;
    list?: ServiceHelper<any, any>;
    edit?: ServiceHelper<any, any>;
    create?: ServiceHelper<any, any>;
    details?: ServiceHelper<any, any>;
    delete?: ServiceHelper<any, any>;
  };
  title: string;
  addButtonLabel: string;
  showCreatedTime?: boolean;
  showUpdatedTime?: boolean;
  actionsButtons?: JSX.Element;
  notToShowInfo?: string[];
  modifyDetails?: (details: T) => Record<string, string>;
  dialogType?: 'modal' | 'drawer';
}

const useTableHoc = <T,>(props: TableHocProps<T>) => {
  const defaultTableResponse: MODELS.PaginatedListIResponse<T> = {
    docs: [],
    totalDocs: 0,
    limit: 15,
    totalPages: 1,
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  };

  const [getTableData, setTableData] =
    createSignal<MODELS.PaginatedListIResponse<T>>(defaultTableResponse);
  const [getInfoModalVisible, setInfoModalVisible] = createSignal(false);
  const [getLoading, setLoading] = createSignal(false);
  const [getSelectedRows, setSelectedRows] = createSignal<T[]>([]);

  return {
    state: {
      getTableData,
      getInfoModalVisible,
      getLoading,
      getSelectedRows,
    },
    setState: {
      setTableData,
      setInfoModalVisible,
      setLoading,
      setSelectedRows,
    },
  };
};

export default useTableHoc;
