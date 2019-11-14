import React, { Fragment } from 'react';
import { ZoneInformation, ZoneStatus } from './common/types';
import { SliderValue } from 'antd/lib/slider';
import { ZonePowerVolumeControl } from './ZonePowerVolumeControl';

interface ZoneListInputProps {
    label: string
    interior: boolean
    exterior: boolean
    infoList: Array<ZoneInformation>
    statusList: Array<ZoneStatus>
    onVolumeChange: (zone: string, volume: SliderValue) => void
    onBassChange: (zone: string, bass: SliderValue) => void
    onTrebleChange: (zone: string, treble: SliderValue) => void
    onPowerChange: (zone: string, on: boolean) => void
    onSourceChange: (zone: string, source: string) => void
}

export const ZoneList: React.FC<ZoneListInputProps> = ({ label, interior, exterior, infoList, statusList, onVolumeChange, onPowerChange, onSourceChange }) => {

    const isZoneOn = (zone: string) => {
        if (statusList.length > 0) {
            const info = infoList.find(z => z.zone === zone);
            if (info) {
                try {
                    const status = statusList.find(z => z.zone === info.zone);
                    if (status) {
                        return status.pr === '01';
                    }
                }
                catch {
                    return false;
                }
            }
        }
        return false;
    }

    const getVolume = (zone: string | false) => {
        if (statusList.length > 0) {
            const info = infoList.find(z => z.zone === zone);
            if (info) {
                try {
                    const status = statusList.find(z => z.zone === info.zone);
                    if (status) {
                        return parseInt(status.vo);
                    }
                }
                catch {
                    return 0;
                }
            }
        }
        return 0;
    }

    const getSource = (zone: string | false) => {
        if (statusList.length > 0) {
            const info = infoList.find(z => z.zone === zone);
            if (info) {
                try {
                    const status = statusList.find(z => z.zone === info.zone);
                    if (status) {
                        return parseInt(status.ch);
                    }
                }
                catch {
                    return 0;
                }
            }
        }
        return 0;
    }

    return (
        <Fragment>
            <h1>{label}</h1>
            {infoList.map((info: ZoneInformation) => {
                if ((interior && info.interior) || (exterior && info.exterior)) {
                    return (
                        <ZonePowerVolumeControl
                            key={info.zone}
                            info={info}
                            ch={getSource(info.zone)}
                            on={isZoneOn(info.zone)}
                            vo={getVolume(info.zone)}
                            onPowerChange={onPowerChange}
                            onVolumeChange={onVolumeChange}
                            onSourceChange={onSourceChange}
                        />
                    );
                }
                else {
                    return <Fragment key={info.zone} />
                }
            })}
        </Fragment>
    );
}
