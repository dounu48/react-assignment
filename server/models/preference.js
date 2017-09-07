import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Preference = new Schema({
    language : String,
    timezone: String,
    currency: String,
    privacy: String,
    messages: String,
    recentlyVisited: {},
    content: String,
    date: {
        created: { type: Date, default: Date.now },
        edited: { type: Date, default: Date.now }
    },
    is_edited: { type: Boolean, default: false },
    username : String
});

export default mongoose.model('preference', Preference);