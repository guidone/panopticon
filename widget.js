import React from 'react';
import { Button, ButtonToolbar, FormGroup } from 'rsuite';
import { Panel } from '../../src/components';
import useSocket from '../../src/hooks/socket';

const Widget = () => {
  const { sendToInput } = useSocket();

  return (
    <Panel title="My Widget">
      <span>something here</span>
    </Panel>
  );
};

export default Widget;
