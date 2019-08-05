import React, { useState, useEffect } from 'react';
import { ZoneInformation } from './common/types';
import { Row, Col, Button, Slider, Select } from 'antd';
import { SliderValue } from 'antd/lib/slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faPowerOff, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { SourceNames } from './env';
import { LabeledValue } from 'antd/lib/select';

interface ZonePowerVolumeControlInputProps {
    info: ZoneInformation
    on: boolean
    vo: number,
    ch: number,
    onPowerChange: (zone: string, on: boolean) => void
    onVolumeChange: (zone: string, volume: SliderValue) => void
    onSourceChange: (zone: string, source: string) => void
}
const { Option } = Select;

export const ZonePowerVolumeControl: React.FC<ZonePowerVolumeControlInputProps> = ({ info, on, vo, ch, onPowerChange, onVolumeChange, onSourceChange }) => {
    const [power, setPower] = useState(on);
    const [volume, setVolume] = useState(vo);
    const [source,setSource] = useState(ch);
    useEffect(() => {
        setPower(on);
        setVolume(vo);
        setSource(ch);
    }, [info, on, vo, ch]);

    const getSourceIcon = () => {
        if (SourceNames.length > 0) {
            const sourceInfo = SourceNames.find(s => parseInt(s.ch) === source);
            if (sourceInfo) {
                return <FontAwesomeIcon fixedWidth icon={sourceInfo.icon}/>;
            }
        }
        return <FontAwesomeIcon fixedWidth icon={faQuestion}/>;
    }

    return (
        <Row>
            <Col span={14}>
                <h4>

                    <Button type={power ? "primary" : "default"} size="small" onClick={() => {
                        setPower(!power);
                        onPowerChange(info.zone, !power);
                    }}>
                        <FontAwesomeIcon icon={faPowerOff} />
                    </Button>
                    &nbsp;
                    <Select
                        labelInValue
                        disabled={!on}
                        size="small"
                        style={{width:'48px'}}
                        onChange={(selected:LabeledValue)=>{
                            setSource(parseInt(selected.key));
                            onSourceChange(info.zone,selected.key);
                        }}
                        value={{key:source.toString(),label:getSourceIcon()}}
                    >
                        {SourceNames.map((s)=>{
                            return <Option key={s.ch} value={s.ch}><FontAwesomeIcon icon={s.icon}/></Option>
                        })}
                    </Select>
                    &nbsp;
            {info.label}
                </h4>
            </Col>
            <Col span={10}>
                <Slider
                    min={1}
                    max={38}
                    onChange={(vo: SliderValue) => {
                        setVolume(parseInt(vo.toString()));
                        onVolumeChange(info.zone, vo)
                    }}
                    value={volume}
                    disabled={!on}
                />
            </Col>
        </Row>
    );
}