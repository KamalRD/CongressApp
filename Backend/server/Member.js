const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    congressId: String,
    birthYear: String,
    chamber: String,
    cosponsoredLegislation: {
        count: Number,
        url: String,
    },
    depiction: {
        attribution: String,
        url: String
    },
    district: Number,
    leadership: [{
        congress: Number,
        current: Boolean,
        type: String
    }],
    name: String,
    party: String,
    sponsoredLegislation: {
        count: Number,
        url: String,
    },
    state: String,
    stateCode: String,
    fecId: String
});

module.exports = mongoose.model("Member", memberSchema);


