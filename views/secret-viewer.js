import React from 'react';
import moment from 'moment';
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
  const { googleMapsKey } = useSettings();

  const expireDate = moment(payload.secret_duration);
  const now = moment();

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
              <em>{expireDate.format("dddd, MMMM Do YYYY, h:mm:ss")}</em>
              {expireDate.isAfter(now) && (
                <div className="secret-reveal-at">{expireDate.toNow(true)}</div>
              )}
              {!expireDate.isAfter(now) && (
                <div>Secret date is due</div>
              )}
            </div>
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