import * as mongoose from 'mongoose';

export interface HighScores extends mongoose.Document {
    scoreObject: Object[];
    difficulty: string;
}

export const HIGH_SCORE = new mongoose.Schema({
    scoreObject: [{
        playerName: String,
        winnerScore: Number,
        loserScore: Number
    }],
    difficulty: String
});

export default mongoose.model<HighScores>('HighScores', HIGH_SCORE);
