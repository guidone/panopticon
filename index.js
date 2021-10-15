import React from 'react';
import { plug } from 'code-plug';

import { UserRecords, SmallTag } from '../../src/components';
import SecretViewer from './views/secret-viewer';
import { secretColor } from './helpers/secret-color';
import SecretsMap from './pages/secret-map';

plug('sidebar', null, {
  id: 'wiggle',
  label: 'Panopticon',
  icon: 'logo-survey',
  permission: 'wiggle.view',
  options: [
    {
      id: 'wiggle-secrets',
      label: 'Secrets',
      url: '/secrets',
    },
    {
      id: 'wiggle-secrets-map',
      label: 'Secrets Map',
      url: '/secrets-map',
    }
  ]
});
// register a page map for all secrets
plug('pages', SecretsMap, {
  url: '/secrets-map',
  title: 'Secrets Map',
  id: 'secrets-maps',

  permission: 'wiggle.view',
  breadcrumbs: ['Secrets Map']
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
    name: 'View Panopticon secret',
    description: `View secrets stored in Panopticon Bot`,
    group: 'Panopticon'
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
    description: 'List of Panopticon secrets',
    form: SecretViewer,
    status: [
      { value: 'private', label: 'Private' },
      { value: 'public', label: 'Public' },
      { value: 'crazy', label: 'Crazy' },
      { value: 'keyholder-free', label: 'Keyholder free' },
      { value: 'keyholder-taken', label: 'Keyholder taken' }
    ]
  }
);
// register button in the user modal to redirect to survey lists
/*plug(
  'user-button',
  GoToSurveyButton
);*/
