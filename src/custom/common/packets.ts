export namespace Packets {
    export interface PNCard {
        question: string,
        answer: string,
        statement: string,
        isnew: boolean,
        metadata?: Packets.API.PacketMetadata
    }

    export interface ServiceWorkerResponse {
        success: boolean,
        content?: any,
        errmsg?: string
    }

    export namespace ServiceWorkerResponseContent {

        export interface DeckList {
            deck_list: string[],
            selected_deck?: string
        }
    }

    export namespace API {

        export type Request = CardgenRequest | GraphsubmitRequest | LegacyAPIRequest | null

        export interface Response {
            success: boolean,
            data?: CardgenResponseData | GraphsubmitResponseData | PingResponseData,
            errmsg?: string
        }

        export interface PacketMetadata {
            id: string,
            source?: string
        }

        export interface PingResponseData {
            username: string
        }           

        export interface CardgenRequest {
            sentence: string,
            heading_hierarchy: string[],
            metadata: PacketMetadata
        }

        interface CardGenResponseCard {
            id: string,
            conceptId: string,
            type: string,
            data: any           
        }

        interface CardgenResponseConcept {
            cards: CardGenResponseCard[],
            id: string,
            isClash: boolean,
            normalizedSentence: string,
            rank: number
        }

        export type CardgenResponseData = CardgenResponseConcept[]

        export interface GraphsubmitRequest {
            statement: string,
            metadata?: PacketMetadata
        }

        export interface GraphsubmitResponseData {
            metadata?: PacketMetadata
        }
    
        // ONLY FOR BACK COMPATIBILITY, DO NOT USE
        export interface LegacyAPIRequest {
            sentence: string,
            heading_hierarchy: string[],
            ptype: string
        }

        export interface OffscreenMessagePacket {
            endpoint: string,
            packet: Request
        }
    }

    export namespace Anki {

        export interface Note {
            front : string,
            back : string,
            source?: string,
            pn_id : string,
            tags?: string[] | undefined,
            deck : string
        }

        export type TagList = string[]

        export type DeckList = string[]

    }
}