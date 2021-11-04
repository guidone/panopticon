import React from 'react';
import { Icon, FlexboxGrid } from 'rsuite';

import { SmallTag, Maps } from '../../../src/components';
import useSettings from '../../../src/hooks/settings';

import { secretColor } from '../helpers/secret-color';
import '../styles/secret-viewer.scss';

const PinPoint = () => {
  return (
    <Icon
      className="map-marker"
      icon="map-marker"
      size="2x"
      style={{ color: 'red' }}
    />
  );
}

const SecretViewer = ({ record }) => {
  const { payload } = record;

  const expireDate = new Date(payload.secret_duration);
  const now = new Date();
  const duration = expireDate.getTime() - now.getTime();

  return (
    <div className="secret-viewer">
      <FlexboxGrid justify="space-between" style={{ marginTop: '30px' }}>
        <FlexboxGrid.Item colspan={7}>
          <div>
            <b>Secret is</b> <SmallTag color={secretColor(payload.secret_type)}>{payload.secret_type}</SmallTag>
          </div>
          {(payload.secret_type === 'time' || payload.secret_type === 'location+time') && (
            <div>
              <b>Revealed when</b>
              <br/>
              <em>{expireDate.toLocaleDateString()}, {expireDate.toLocaleTimeString()}</em>
              {(duration > 0) && (
                <div className="secret-reveal-at">{Math.round(duration/1000/60)} minutes</div>
              )}
              {(duration < 0) && (
                <div>Secret date is due</div>
              )}
            </div>
          )}
          {payload.secret_bounty != null && (
            <>
              <b>ICE price:</b> {payload.secret_bounty} EUR<br/>
            </>
          )}
          {payload.secret_payment != null && (
            <>
              <br/>
              <b>User paid to reveal the secret</b><br/>
              <b>Email: </b> {payload.secret_payment.order_info.email}<br />
              <b>Currency: </b> {payload.secret_payment.currency}<br />
              <b>Amount: </b> {(payload.secret_payment.total_amount / 100).toFixed(2)}<br />
              <b>Payment ID: </b> {payload.secret_payment.provider_payment_charge_id}<br />
            </>
          )}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={7}>
          {payload.secret_url != null && (
            <div>
              <b>Secret image</b>
              <img src={payload.secret_url} width="100%"/>
            </div>
          )}
          {payload.secret != null && (
            <div>
              <b>Secret text</b>
              <div className="display-secret">
                {payload.secret}
              </div>
            </div>
          )}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={7}>
          {record.latitude != null && (
            <div className="ui-devices-map" style={{ height: `300px` }}>
              <Maps
                defaultCenter={{ lat: record.latitude, lng: record.longitude }}
                defaultZoom={11}
              >
                <PinPoint />
              </Maps>
            </div>
          )}
          {record.latitude == null && (
            <div>
              <em>No location for this secret</em>
            </div>
          )}
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
};
/*SurveryViewer.propTypes = {
  record: PropTypes.shape({
    question: PropTypes.shape({
      type: PropTypes.oneOf(['text', 'number', 'multiple', 'image']),
      answer: PropTypes.string,
      data: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          answer: PropTypes.string,
          value: PropTypes.string
        })
      ])
    })
  })
};*/

export default SecretViewer;