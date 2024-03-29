import { HistoricalState } from "./historicalState";
import { PresentCountry } from "./presentCountry";

export interface HistoricalFigure {
    birthDate: string,
    birthHistoricalState: HistoricalState,
    birthPresentCountry: PresentCountry,
    deathDate: string | null,
    deathHistoricalState: HistoricalState,
    deathPresentCountry: PresentCountry,
    id: number,
    name: string
}