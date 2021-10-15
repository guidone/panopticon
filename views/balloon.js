import React from 'react';
import { Icon, Popover } from 'rsuite';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Image from './image';

const Balloon = ({ topic, ts, content, onDelete, onZoom, thumb, image, width, height, maxHeight, ...props }) => {
  let thumbImage;
  if (!_.isEmpty(thumb)) {
    thumbImage = (
      <Image
        thumb={thumb}
        topic={topic}
        width={width}
        height={height}
        maxHeight={maxHeight}
        onClick={() => {
          console.log('clicked');
          onZoom({ })
        }}
      />
    );
  }

  return (
    <Popover title={topic} {...props} onMouseLeave={() => {}}>
      <div className="popover-map-marker">
        vario
      </div>
    </Popover>
  );
};

Balloon.propTypes = {
  topic: PropTypes.string,
  thumb: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
  ts: PropTypes.instanceOf(Date),
  onDelete: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
};

Balloon.defaultProps = {
  topic: null,
  thumb: null,
  image: null,
  content: null,
  ts: null,
  onDelete: () => {},
  width: null,
  height: null
};

export default Balloon;
