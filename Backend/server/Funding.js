const mongoose = require("mongoose");

const donationRangeSchema = new mongoose.Schema({
    zeroToOneHundred: {
        count: Number,
        amount: Number
    },
    oneHundredToFiveHundred: {
        count: Number,
        amount: Number
    },
    fiveHundredToOneThousand: {
        count: Number,
        amount: Number
    },
    oneThousandToTwoThousand: {
        count: Number,
        amount: Number
    },
    twoThousandToThreeThousand: {
        count: Number,
        amount: Number
    },
    threeThousandToFourThousand: {
        count: Number,
        amount: Number
    },
    fourThousandToFiveThousand: {
        count: Number,
        amount: Number
    },
    fiveThousandPlus: {
        count: Number,
        amount: Number
    }
});

const fundingSchema = new mongoose.Schema({
    fecId: String,
    total: {
        amount: Number,
        donors: Number,
        donorType: [
            {
                individuals: {
                    count: Number,
                    amount: Number,
                    donationRange: donationRangeSchema
                }
            },
            {
                politicalActionCommittees: {
                    count: Number,
                    amount: Number,
                    donationRange: donationRangeSchema
                },
            },
            {
                otherCommittees: {
                    count: Number,
                    amount: Number,
                    donationRange: donationRangeSchema
                },
            },
            {
                candidate: {
                    count: Number,
                    amount: Number,
                    donationRange: donationRangeSchema
                }
            }
        ]
    }
})

module.exports = mongoose.model("Funding", fundingSchema);