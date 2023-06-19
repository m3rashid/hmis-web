import dayjs from 'dayjs';

import { camelCaseToSentenceCase } from '../../helpers/strings';
import { Component } from 'solid-js';

interface IProps {
  data: Record<string, any>;
  notToShow?: string[];
}

const dateKeys = ['createdAt', 'updatedAt'];

const ObjectAsDetails: Component<IProps> = (props) => {
  const notToShow = [
    '_id',
    'key',
    '__v',
    'deleted',
    'actualName',
    'password',
    'createdBy',
    'lastUpdatedBy',
    ...(props.notToShow || []),
  ];
  if (!props.data) return null;

  const parsedData = Object.entries(props.data).reduce<
    Array<{ key: string; value: string }>
  >((acc, [key, value]) => {
    if (notToShow.includes(key)) return acc;
    else if (dateKeys.includes(key)) {
      return [
        ...acc,
        {
          key: camelCaseToSentenceCase(key ?? ''),
          value: dayjs(value).format('DD-MM-YYYY HH:mm A'),
        },
      ];
    }
    return [
      ...acc,
      {
        key: camelCaseToSentenceCase(key ?? ''),
        value: JSON.stringify(value ?? {}).replace(/['"]+/g, ''),
      },
    ];
  }, []);

  return (
    <div class='flex flex-col gap-2'>
      {parsedData.map(({ key, value }) => {
        return (
          <div
            class='grid gap-2'
            style={{ 'grid-template-columns': '1fr 2fr' }}
          >
            <p class='font-bold'>{key}</p>
            <p class=''>{value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ObjectAsDetails;
