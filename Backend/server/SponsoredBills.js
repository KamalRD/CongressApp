const mongoose = require("mongoose");

const sponsoredBillSchema = new mongoose.Schema({
    congressId: String,
    billSubjects: {
        type: Map,
        of: Number
    }
});

module.exports = mongoose.model("SponsoredBills", sponsoredBillSchema);