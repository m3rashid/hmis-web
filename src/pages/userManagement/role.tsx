import type { Component } from 'solid-js';
import TableHoc from '../../components/tableHoc';

const Role: Component = () => {
  return (
    <div>
      <TableHoc addButtonLabel='Add Role' title='Roles' />
    </div>
  );
};

export default Role;
