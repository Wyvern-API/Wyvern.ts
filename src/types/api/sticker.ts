import { FileContent } from '../../utils';
import { User } from './user';

export interface Sticker {
    id: string;
    pack_id?: string;
    name: string;
    description: string | null;
    tags: string;
    type: StickerType;
    format_type: StickerFormatType;
    available?: boolean;
    guild_id?: string;
    user?: User;
    sort_value?: string;
}

export interface StickerItem {
    id: string;
    name: string;
    format_type: StickerFormatType;
}

export interface StickerPack {
    id: string;
    stickers: Sticker[];
    name: string;
    sku_id: string;
    cover_sticker_id?: string;
    description: string;
    banner_assest_id: string;
}

export enum StickerType {
    Standard = 1,
    Guild
}

export enum StickerFormatType {
    Png = 1,
    Apng,
    Lottie
}

export interface CreateGuildSticker {
    name: string;
    description: string;
    tags: string;
    file: FileContent;
}

export interface ModifyGuildSticker {
    name: string;
    description: string | null;
    tags: string;
}
