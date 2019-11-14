import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ZoneInformation {
    zone: string
    label: string
    interior?: boolean
    exterior?: boolean
    icon: IconDefinition
}

export interface ZoneStatus {
    zone: string
    pa: string
    pr: string
    mu: string
    dt: string
    vo: string
    tr: string
    bs: string
    bl: string
    ch: string
    ls: string
}

export interface SourceInformation {
    ch: string
    name: string
    icon: IconDefinition
}
