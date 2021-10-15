import React, { useState } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useApolloClient } from 'react-apollo';
import { Loader } from 'rsuite';

import { PageContainer, Breadcrumbs, Maps } from '../../../src/components';

import PinPoint from '../views/pin-point';

const GET_LOCATION_SECRETS = gql`
query($where: JSON) {
  records(limit: 50, order: "geohash", where: $where) {
    id,
    status,
    title,
    latitude,
    longitude,
    geohash,
    payload
  }
}`;

const SecretsMap = () => {
  const [secrets, setSecrets] = useState(null);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  let markers = (secrets || [])
    .filter(secret => secret.latitude != null && secret.longitude != null)
    .map(secret => (
      <PinPoint
        key={secret.id}
        lat={secret.latitude}
        lng={secret.longitude}
        point={{}}
        popover={secret.title}
        showPopover={true}
      >
        <div style={{minHeight: '120px'}}><strong>{secret.title}</strong>
        {secret.payload.secret_url != null && (
          <div
            style={{
              backgroundImage: `url(${secret.payload.secret_url})`,
              backgroundPosition: 'center',
              minWidth: '120px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: `120px`
            }}
          />
        )}
        {secret.payload.secret != null && (
          <div>{secret.payload.secret}</div>
        )}
        <Link to={`/record/${secret.id}`}>view</Link>
        </div>
      </PinPoint>
    ));

  return (
    <PageContainer className="my-page">
      <Breadcrumbs pages={['Secret locations']}/>
      <div style={{ width: '100%', height: '450px', position: 'relative' }}>
        {loading && (
          <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10000000 }}>
            <Loader size="md" />
          </div>
        )}
        <Maps
          defaultCenter={{ lat: 45.4854739, lng: 9.2022176 }}
          defaultZoom={11}
          height={450}
          onChange={async ({ bounds }) => {
            const { se, nw } = bounds;
            setLoading(true);
            const { data: { records }} = await client.query({
              query: GET_LOCATION_SECRETS,
              variables: {
                where: {
                  latitude: { 'gte': se.lat, 'lte': nw.lat },
                  longitude: { 'gte': nw.lng, 'lte': se.lng }
                }
              },
              fetchPolicy: 'network-only'
            });
            setSecrets(records);
            setLoading(false);
          }}
        >
          {markers}
        </Maps>
      </div>
    </PageContainer>
  );
};

export default SecretsMap;
