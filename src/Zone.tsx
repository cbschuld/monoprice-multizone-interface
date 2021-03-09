import React, { useState } from 'react';
import { ZoneInformation, ZoneStatus } from './common/types';
import { Card, Switch, Slider, Select } from 'antd';
import { Row, Col } from 'antd';
import { SourceNames } from './env';
import { SourceInformation } from './common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faVolumeUp, faMicrophone } from '@fortawesome/free-solid-svg-icons';

interface ZoneInputProps {
  info: ZoneInformation;
  status: ZoneStatus;
  onVolumeChange: (zone: string, volume: number) => void;
  onBassChange: (zone: string, bass: number) => void;
  onTrebleChange: (zone: string, treble: number) => void;
  onPowerChange: (zone: string, on: boolean) => void;
  onSourceChange: (zone: string, source: number) => void;
}

const { Option } = Select;

export const Zone: React.FC<ZoneInputProps> = ({
  info,
  status,
  onVolumeChange,
  onBassChange,
  onTrebleChange,
  onPowerChange,
  onSourceChange,
}) => {
  const [volume, setVolume] = useState<number>(parseInt(status.vo));
  const [bass, setBass] = useState<number>(parseInt(status.vo));
  const [treble, setTreble] = useState<number>(parseInt(status.vo));
  return (
    <>
      <Row>
        <Col span={18}>{info && <h1>{info.label}</h1>}</Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Switch
            checked={status && status.pr === '01'}
            onChange={(checked) => {
              onPowerChange(info.zone, checked);
            }}
          />
        </Col>
      </Row>
      {status.pr === '01' && (
        <>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              <Card size="small" title="Source" extra={<FontAwesomeIcon icon={faMicrophone} />}>
                <Row>
                  <Col span={24}>
                    <Select
                      value={parseInt(status.ch)}
                      style={{ width: '100%' }}
                      dropdownMatchSelectWidth={true}
                      onChange={(ch: number) => onSourceChange(info.zone, ch)}
                    >
                      {SourceNames.map((si: SourceInformation) => {
                        return (
                          <Option key={parseInt(si.ch)} value={parseInt(si.ch)}>
                            <FontAwesomeIcon fixedWidth icon={si.icon} />
                            &nbsp;
                            {si.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              <Card size="small" title="Volume" extra={<FontAwesomeIcon icon={faVolumeUp} />}>
                <Row>
                  <Col span={24}>
                    <Slider
                      min={1}
                      max={38}
                      onChange={(vo: number) => setVolume(vo as number)}
                      onAfterChange={(vo: number) => onVolumeChange(info.zone, vo)}
                      value={volume}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              <Card size="small" title="Bass" extra={<FontAwesomeIcon icon={faVolumeUp} />}>
                <Row>
                  <Col span={24}>
                    <Slider
                      min={0}
                      max={14}
                      onChange={(bs: number) => setBass(bs as number)}
                      onAfterChange={(bs: number) => onBassChange(info.zone, bs)}
                      value={bass}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row style={{ paddingTop: 10 }}>
            <Col span={24}>
              <Card size="small" title="Treble" extra={<FontAwesomeIcon icon={faVolumeUp} />}>
                <Row>
                  <Col span={24}>
                    <Slider
                      min={0}
                      max={14}
                      onChange={(tr: number) => setTreble(tr as number)}
                      onAfterChange={(tr: number) => onTrebleChange(info.zone, tr)}
                      value={treble}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
