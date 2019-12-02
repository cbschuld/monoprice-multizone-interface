import React, { Fragment } from 'react';
import { ZoneInformation, ZoneStatus } from './common/types';
import { Card, Switch, Slider, Select } from 'antd';
import { Row, Col } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import { SourceNames } from './env';
import { SourceInformation } from './common/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faVolumeUp, faMicrophone } from '@fortawesome/free-solid-svg-icons'

interface ZoneInputProps {
    info: ZoneInformation
    status: ZoneStatus
    onVolumeChange: (zone: string, volume: SliderValue) => void
    onBassChange: (zone: string, bass: SliderValue) => void
    onTrebleChange: (zone: string, treble: SliderValue) => void
    onPowerChange: (zone: string, on: boolean) => void
    onSourceChange: (zone: string, source: number) => void
}

const { Option } = Select;

export const Zone: React.FC<ZoneInputProps> = ({ info, status, onVolumeChange, onBassChange, onTrebleChange,  onPowerChange, onSourceChange }) => {
    return (
        <Fragment>
            <Row>
                <Col span={18}>
                    {info &&
                        <h1>{info.label}</h1>
                    }
                </Col>
                <Col span={6} style={{ textAlign: 'right' }}>
                    <Switch checked={status && status.pr === '01'} onChange={(checked) => { onPowerChange(info.zone, checked) }} />
                </Col>
            </Row>
            {status.pr === '01' &&
                <Fragment>
                    <Row style={{ paddingTop: 10 }}>
                        <Col span={24}>
                            <Card size="small" title="Source" extra={<FontAwesomeIcon icon={faMicrophone}/>}>
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
                                                    <FontAwesomeIcon fixedWidth icon={si.icon}/>
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
                            <Card size="small" title="Volume" extra={<FontAwesomeIcon icon={faVolumeUp}/>}>
                                <Row>
                                    <Col span={24}>
                                        <Slider
                                            min={1}
                                            max={38}
                                            onChange={(vo: SliderValue) => onVolumeChange(info.zone, vo)}
                                            value={parseInt(status.vo)}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        <Col span={24}>
                            <Card size="small" title="Bass" extra={<FontAwesomeIcon icon={faVolumeUp}/>}>
                                <Row>
                                    <Col span={24}>
                                        <Slider
                                            min={0}
                                            max={14}
                                            onChange={(bs: SliderValue) => onBassChange(info.zone, bs)}
                                            value={parseInt(status.bs)}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row style={{ paddingTop: 10 }}>
                        <Col span={24}>
                            <Card size="small" title="Treble" extra={<FontAwesomeIcon icon={faVolumeUp}/>}>
                                <Row>
                                    <Col span={24}>
                                        <Slider
                                            min={0}
                                            max={14}
                                            onChange={(tr: SliderValue) => onTrebleChange(info.zone, tr)}
                                            value={parseInt(status.tr)}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Fragment>
            }
        </Fragment>
    );
}
