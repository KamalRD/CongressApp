const mongoose = require("mongoose");

const cosponsoredBillSchema = new mongoose.Schema({
    congressId: String,
    billSubjects: {
        type: Map,
        of: Number
    }
});

module.exports = mongoose.model("CosponsoredBills", cosponsoredBillSchema);