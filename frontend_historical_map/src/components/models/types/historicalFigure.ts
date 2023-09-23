import { HistoricalState } from "./historicalState";
import { PresentCountry } from "./presentCountry";

export interface HistoricalFigure {
    birthDate: string,
    birthHistoricalState: HistoricalState,
    deathDate: string,
    description: string,
    id: number,
    name: string,
    presentCountry: PresentCountry
}