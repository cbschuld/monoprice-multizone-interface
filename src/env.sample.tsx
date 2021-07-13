import {
    faBed,
    faDoorClosed,
    faCouch,
    faUtensils,
    faMugHot,
    faPencilAlt,
    faBath,
    faSwimmingPool,
    faBriefcase,
    faTv
} from '@fortawesome/free-solid-svg-icons'
import { faSpotify, faAmazon } from '@fortawesome/free-brands-svg-icons'

import { ZoneInformation, SourceInformation } from './common/types';

export const HomeName: string = '[maybe your address]';
export const HostName: string = '[ip address of your JSON API]:8181';
export const Zones: Array<ZoneInformation> = [
    { zone: '11', label: 'zone name', interior: true, exterior: false, icon: faBed },
    { zone: '12', label: 'zone name', interior: true, exterior: false, icon: faBed },
    { zone: '13', label: 'zone name', interior: true, exterior: false, icon: faMugHot },
    { zone: '14', label: 'zone name', interior: true, exterior: false, icon: faUtensils },
    { zone: '15', label: 'zone name', interior: false, exterior: true, icon: faDoorClosed },
    { zone: '16', label: 'zone name', interior: true, exterior: false, icon: faPencilAlt },
    { zone: '21', label: 'zone name', interior: true, exterior: false, icon: faCouch },
    { zone: '22', label: 'zone name', interior: true, exterior: false, icon: faBed },
    { zone: '23', label: 'zone name', interior: true, exterior: false, icon: faBed },
    { zone: '24', label: 'zone name', interior: true, exterior: false, icon: faBath },
    { zone: '25', label: 'zone name', interior: false, exterior: true, icon: faSwimmingPool },
    { zone: '26', label: 'zone name', interior: true, exterior: false, icon: faBriefcase },
];

export const SourceNames: Array<SourceInformation> = [
    { ch: '02', name: "Great Room TV", icon: faTv },
    { ch: '03', name: "Gramofon", icon: faSpotify },
    { ch: '05', name: "Alexa", icon: faAmazon },
];
