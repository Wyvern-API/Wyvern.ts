import { Emoji } from './emoji';

export enum InteractionType {
    Ping = 0,
    ApplicationCommand,
    MessageComponent
}

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

export interface SelectOption {
    label: string;
    value: string;
    description?: string;
    emoji: Partial<Emoji>;
    default?: boolean;
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
