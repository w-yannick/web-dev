import mongoose = require('mongoose');

export interface Grid extends mongoose.Document {
    completeGrid: string[];
    gappedGrid: string[];
}

export const REQUESTED_GRID = new mongoose.Schema({
    completeGrid: { type: [String], required: true },
    gappedGrid: { type: [String], required: false }
});

export default mongoose.model<Grid>('RequestedGrid', REQUESTED_GRID);
