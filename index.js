import React from 'react';
import { plug } from 'code-plug';

import { UserRecords, SmallTag } from '../../src/components';
import SecretViewer from './views/secret-viewer';
import { secretColor } from './helpers/secret-color';

plug('sidebar', null, {
  id: 'wiggle',
  label: 'Wiggle',
  icon: 'logo-survey',
  permission: 'wiggle.view',
  options: [
    {
      id: 'wiggle-secrets',
      label: 'Secrets',
      url: '/secrets',
    }
  ]
});

// register a page for user records of type survey
plug('pages', UserRecords, {
  url: '/secrets',
  title: 'Secrets',
  id: 'secrets',
  type: 'secret',
  permission: 'wiggle.view',
  breadcrumbs: ['Secrets'],
  labels: {
    title: 'Name',
    record: 'secret'
  },
  columns: [
    {
      id: 'secret-type',
      label: 'Type',
      width: 120,
      cell: ({ payload }) => (
        <SmallTag color={secretColor(payload.secret_type)}>{payload.secret_type}</SmallTag>
      )
    }
  ]
});
// register permissions
plug(
  'permissions',
  null,
  {
    permission: 'wiggle.view',
    name: 'View Wiggle secret',
    description: `View secrets stored in Wiggle Bot`,
    group: 'Wiggle'
  }
);
// register user record type
plug(
  'user-record-types',
  null,
  {
    type: 'secret',
    name: 'Secret',
    list: `Secrets`,
    description: 'List of Wiggle secrets',
    form: SecretViewer,
    status: [
      { value: 'new', label: 'New' },
      { value: 'expired', label: 'Expired' },
    ]
  }
);
// register button in the user modal to redirect to survey lists
/*plug(
  'user-button',
  GoToSurveyButton
);*/
