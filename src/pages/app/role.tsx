import type { Component } from 'solid-js';
import Table from '../../components/table';
import { TableProps } from '../../components/table/useTable';
import { MODELS } from '@hmis/gatekeeper';
import apiService from '../../api/service';

const Role: Component = () => {
  const columns: TableProps<MODELS.IRole>['columns'] = [
    { key: 'name', title: 'Name', class: 'w-[80px]' },
    { key: 'description', title: 'Description' },
    // { key: 'permissions', title: 'Permissions' },
  ];

  return (
    <>
      <Table<MODELS.IRole>
        addButtonLabel='Add Role'
        title='Roles'
        columns={columns}
        services={{
          list: apiService('/role/all', 'GET'),
        }}
        showCreatedAt
        showUpdatedAt
      />
    </>
  );
};

export default Role;
