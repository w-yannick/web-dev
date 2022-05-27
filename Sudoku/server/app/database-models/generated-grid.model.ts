import mongoose = require('mongoose');

export interface GeneratedGrid extends mongoose.Document {
    completGrid: string[];
    gappedGrid: string[];
    difficulty: string;
}

export const GENERATED_GRID = new mongoose.Schema({
    completeGrid: { type: [String], required: true},
    gappedGrid: {type: [String], required: true},
    difficulty: { type: String, required: true}
});

export default mongoose.model<GeneratedGrid>('GeneratedGrid', GENERATED_GRID);
