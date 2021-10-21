import { Emoji } from './emoji';

export type Component = {
    type: ComponentType;
} & Partial<{
    custom_id: string;
    disabled: boolean;
    style: ButtonStyle;
    label: string;
    emoji: Emoji;
    url: string;
    options: SelectOption[];
    placeholder: string;
    min_values: number;
    max_values: number;
    components: Component[];
}>;

export interface SelectMenu {
    type: number;
    custom_id: string;
    options: SelectOption[];
    placeholder?: string;
    min_values?: number;
    max_values?: string;
    disabled?: boolean;
}

export interface SelectOption {
    label: string;
    value: string;
    description?: string;
    emoji: Partial<Emoji>;
    default?: boolean;
}

export interface Button {
    type: number;
    style: ButtonStyle;
    label?: string;
    emoji?: Partial<Emoji>;
    custom_id?: string;
    url?: string;
    disabled?: boolean;
}

export enum ButtonStyle {
    Primary = 1,
    Secondary,
    Success,
    Danger,
    Link
}

export enum ComponentType {
    ActionRow = 1,
    Button,
    SelectMenu
}
