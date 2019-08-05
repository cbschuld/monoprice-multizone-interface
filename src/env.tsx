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

export const HomeName: string = '2555 E Carob Dr';
export const HostName: string = '10.10.1.82:8181';
export const Zones: Array<ZoneInformation> = [
    { zone: '11', label: 'Brock', interior: true, exterior: false, icon: faBed },
    { zone: '12', label: 'Bode', interior: true, exterior: false, icon: faBed },
    { zone: '13', label: 'Dinning', interior: true, exterior: false, icon: faMugHot },
    { zone: '14', label: 'Kitchen', interior: true, exterior: false, icon: faUtensils },
    { zone: '15', label: 'Courtyard', interior: false, exterior: true, icon: faDoorClosed },
    { zone: '16', label: 'Den', interior: true, exterior: false, icon: faPencilAlt },
    { zone: '21', label: 'Great Room', interior: true, exterior: false, icon: faCouch },
    { zone: '22', label: 'Guest Room', interior: true, exterior: false, icon: faBed },
    { zone: '23', label: 'Master Bed', interior: true, exterior: false, icon: faBed },
    { zone: '24', label: 'Master Bath', interior: true, exterior: false, icon: faBath },
    { zone: '25', label: 'Back Patio', interior: false, exterior: true, icon: faSwimmingPool },
    { zone: '26', label: 'Casita', interior: true, exterior: false, icon: faBriefcase },
];

export const SourceNames: Array<SourceInformation> = [
    { ch: '02', name: "Great Room TV", icon: faTv },
    { ch: '03', name: "Gramofon", icon: faSpotify },
    { ch: '05', name: "Alexa", icon: faAmazon },
];