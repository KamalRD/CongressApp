const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const Member = require("./Member");
const Funding = require("./Funding");
const SponsoredBills = require("./SponsoredBills");
const CosponsoredBills = require("./CosponsoredBills");

const app = express();

app.use(cors());
app.use(express.json());

// Setting Up MongoDB with Mongoose

function sortObj(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

function buildAggregateDonutChartData(memberFunding) {
    let fundingData = {
        total: {
            amount: 0,
            donors: 0
        },
        individualContributions: {
            amount: 0,
            donors: 0
        },
        pacContributions: {
            amount: 0,
            donors: 0
        },
        otherContributions: {
            amount: 0,
            donors: 0
        },
        candidateContributions: {
            amount: 0,
            donors: 0
        }
    };

    memberFunding.forEach(member => {
        let jsonMember = member.toJSON();
        
        // Total
        fundingData.total.amount += jsonMember.total.amount;
        fundingData.total.donors += jsonMember.total.donors;
        
        // Individual
        fundingData.individualContributions.amount += jsonMember.total.donorType[0].individuals.amount;
        fundingData.individualContributions.donors += jsonMember.total.donorType[0].individuals.count;
        
        // PAC
        fundingData.pacContributions.amount += jsonMember.total.donorType[1].politicalActionCommittees.amount;
        fundingData.pacContributions.donors += jsonMember.total.donorType[1].politicalActionCommittees.count;

        // Other Committees
        fundingData.otherContributions.amount += jsonMember.total.donorType[2].otherCommittees.amount;
        fundingData.otherContributions.donors += jsonMember.total.donorType[2].otherCommittees.count;
        
        // Candidate
        fundingData.candidateContributions.amount += jsonMember.total.donorType[3].candidate.amount;
        fundingData.candidateContributions.donors += jsonMember.total.donorType[3].candidate.count;
    });
    fundingData.total.amount = Number(fundingData.total.amount.toFixed(2));
    fundingData.individualContributions.amount = Number(fundingData.individualContributions.amount.toFixed(2));
    fundingData.pacContributions.amount = Number(fundingData.pacContributions.amount.toFixed(2));
    fundingData.otherContributions.amount = Number(fundingData.otherContributions.amount.toFixed(2));
    fundingData.candidateContributions.amount = Number(fundingData.candidateContributions.amount.toFixed(2));

    return fundingData;
}

function buildSpecificDonutChartData(memberFunding) {
    let specificFunding = {
        individualContributions: {
            zeroToOneHundred: {
                count: 0,
                amount: 0
            },
            oneHundredToFiveHundred: {
                count: 0,
                amount: 0
            },
            fiveHundredToOneThousand: {
                count: 0,
                amount: 0
            },
            oneThousandToTwoThousand: {
                count: 0,
                amount: 0
            },
            twoThousandToThreeThousand: {
                count: 0,
                amount: 0
            },
            threeThousandToFourThousand: {
                count: 0,
                amount: 0
            },
            fourThousandToFiveThousand: {
                count: 0,
                amount: 0
            },
            fiveThousandPlus: {
                count: 0,
                amount: 0
            }
        },
        pacContributions: {
            zeroToOneHundred: {
                count: 0,
                amount: 0
            },
            oneHundredToFiveHundred: {
                count: 0,
                amount: 0
            },
            fiveHundredToOneThousand: {
                count: 0,
                amount: 0
            },
            oneThousandToTwoThousand: {
                count: 0,
                amount: 0
            },
            twoThousandToThreeThousand: {
                count: 0,
                amount: 0
            },
            threeThousandToFourThousand: {
                count: 0,
                amount: 0
            },
            fourThousandToFiveThousand: {
                count: 0,
                amount: 0
            },
            fiveThousandPlus: {
                count: 0,
                amount: 0
            }
        },
        otherCommittees: {
            zeroToOneHundred: {
                count: 0,
                amount: 0
            },
            oneHundredToFiveHundred: {
                count: 0,
                amount: 0
            },
            fiveHundredToOneThousand: {
                count: 0,
                amount: 0
            },
            oneThousandToTwoThousand: {
                count: 0,
                amount: 0
            },
            twoThousandToThreeThousand: {
                count: 0,
                amount: 0
            },
            threeThousandToFourThousand: {
                count: 0,
                amount: 0
            },
            fourThousandToFiveThousand: {
                count: 0,
                amount: 0
            },
            fiveThousandPlus: {
                count: 0,
                amount: 0
            }
        },
        candidateContributions: {
            zeroToOneHundred: {
                count: 0,
                amount: 0
            },
            oneHundredToFiveHundred: {
                count: 0,
                amount: 0
            },
            fiveHundredToOneThousand: {
                count: 0,
                amount: 0
            },
            oneThousandToTwoThousand: {
                count: 0,
                amount: 0
            },
            twoThousandToThreeThousand: {
                count: 0,
                amount: 0
            },
            threeThousandToFourThousand: {
                count: 0,
                amount: 0
            },
            fourThousandToFiveThousand: {
                count: 0,
                amount: 0
            },
            fiveThousandPlus: {
                count: 0,
                amount: 0
            }
        }
    }
    
    memberFunding.forEach(member => {
        let jsonMember = member.toJSON();

        specificFunding.individualContributions.zeroToOneHundred.count += jsonMember.total.donorType[0].individuals.donationRange.zeroToOneHundred.count;
        specificFunding.individualContributions.zeroToOneHundred.amount += jsonMember.total.donorType[0].individuals.donationRange.zeroToOneHundred.amount;
        specificFunding.individualContributions.oneHundredToFiveHundred.count += jsonMember.total.donorType[0].individuals.donationRange.oneHundredToFiveHundred.count;
        specificFunding.individualContributions.oneHundredToFiveHundred.amount += jsonMember.total.donorType[0].individuals.donationRange.oneHundredToFiveHundred.amount;
        specificFunding.individualContributions.fiveHundredToOneThousand.count += jsonMember.total.donorType[0].individuals.donationRange.fiveHundredToOneThousand.count;
        specificFunding.individualContributions.fiveHundredToOneThousand.amount += jsonMember.total.donorType[0].individuals.donationRange.fiveHundredToOneThousand.amount;
        specificFunding.individualContributions.oneThousandToTwoThousand.count += jsonMember.total.donorType[0].individuals.donationRange.oneThousandToTwoThousand.count;
        specificFunding.individualContributions.oneThousandToTwoThousand.amount += jsonMember.total.donorType[0].individuals.donationRange.oneThousandToTwoThousand.amount;
        specificFunding.individualContributions.twoThousandToThreeThousand.count += jsonMember.total.donorType[0].individuals.donationRange.twoThousandToThreeThousand.count;
        specificFunding.individualContributions.twoThousandToThreeThousand.amount += jsonMember.total.donorType[0].individuals.donationRange.twoThousandToThreeThousand.amount;
        specificFunding.individualContributions.threeThousandToFourThousand.count += jsonMember.total.donorType[0].individuals.donationRange.threeThousandToFourThousand.count;
        specificFunding.individualContributions.threeThousandToFourThousand.amount += jsonMember.total.donorType[0].individuals.donationRange.threeThousandToFourThousand.amount;
        specificFunding.individualContributions.fourThousandToFiveThousand.count += jsonMember.total.donorType[0].individuals.donationRange.fourThousandToFiveThousand.count;
        specificFunding.individualContributions.fourThousandToFiveThousand.amount += jsonMember.total.donorType[0].individuals.donationRange.fourThousandToFiveThousand.amount;
        specificFunding.individualContributions.fiveThousandPlus.count += jsonMember.total.donorType[0].individuals.donationRange.fiveThousandPlus.count;
        specificFunding.individualContributions.fiveThousandPlus.amount += jsonMember.total.donorType[0].individuals.donationRange.fiveThousandPlus.amount;

        specificFunding.pacContributions.zeroToOneHundred.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.zeroToOneHundred.count;
        specificFunding.pacContributions.zeroToOneHundred.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.zeroToOneHundred.amount;
        specificFunding.pacContributions.oneHundredToFiveHundred.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.oneHundredToFiveHundred.count;
        specificFunding.pacContributions.oneHundredToFiveHundred.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.oneHundredToFiveHundred.amount;
        specificFunding.pacContributions.fiveHundredToOneThousand.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fiveHundredToOneThousand.count;
        specificFunding.pacContributions.fiveHundredToOneThousand.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fiveHundredToOneThousand.amount;
        specificFunding.pacContributions.oneThousandToTwoThousand.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.oneThousandToTwoThousand.count;
        specificFunding.pacContributions.oneThousandToTwoThousand.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.oneThousandToTwoThousand.amount;
        specificFunding.pacContributions.twoThousandToThreeThousand.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.twoThousandToThreeThousand.count;
        specificFunding.pacContributions.twoThousandToThreeThousand.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.twoThousandToThreeThousand.amount;
        specificFunding.pacContributions.threeThousandToFourThousand.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.threeThousandToFourThousand.count;
        specificFunding.pacContributions.threeThousandToFourThousand.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.threeThousandToFourThousand.amount;
        specificFunding.pacContributions.fourThousandToFiveThousand.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fourThousandToFiveThousand.count;
        specificFunding.pacContributions.fourThousandToFiveThousand.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fourThousandToFiveThousand.amount;
        specificFunding.pacContributions.fiveThousandPlus.count += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fiveThousandPlus.count;
        specificFunding.pacContributions.fiveThousandPlus.amount += jsonMember.total.donorType[1].politicalActionCommittees.donationRange.fiveThousandPlus.amount;

        specificFunding.otherCommittees.zeroToOneHundred.count += jsonMember.total.donorType[2].otherCommittees.donationRange.zeroToOneHundred.count;
        specificFunding.otherCommittees.zeroToOneHundred.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.zeroToOneHundred.amount;
        specificFunding.otherCommittees.oneHundredToFiveHundred.count += jsonMember.total.donorType[2].otherCommittees.donationRange.oneHundredToFiveHundred.count;
        specificFunding.otherCommittees.oneHundredToFiveHundred.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.oneHundredToFiveHundred.amount;
        specificFunding.otherCommittees.fiveHundredToOneThousand.count += jsonMember.total.donorType[2].otherCommittees.donationRange.fiveHundredToOneThousand.count;
        specificFunding.otherCommittees.fiveHundredToOneThousand.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.fiveHundredToOneThousand.amount;
        specificFunding.otherCommittees.oneThousandToTwoThousand.count += jsonMember.total.donorType[2].otherCommittees.donationRange.oneThousandToTwoThousand.count;
        specificFunding.otherCommittees.oneThousandToTwoThousand.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.oneThousandToTwoThousand.amount;
        specificFunding.otherCommittees.twoThousandToThreeThousand.count += jsonMember.total.donorType[2].otherCommittees.donationRange.twoThousandToThreeThousand.count;
        specificFunding.otherCommittees.twoThousandToThreeThousand.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.twoThousandToThreeThousand.amount;
        specificFunding.otherCommittees.threeThousandToFourThousand.count += jsonMember.total.donorType[2].otherCommittees.donationRange.threeThousandToFourThousand.count;
        specificFunding.otherCommittees.threeThousandToFourThousand.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.threeThousandToFourThousand.amount;
        specificFunding.otherCommittees.fourThousandToFiveThousand.count += jsonMember.total.donorType[2].otherCommittees.donationRange.fourThousandToFiveThousand.count;
        specificFunding.otherCommittees.fourThousandToFiveThousand.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.fourThousandToFiveThousand.amount;
        specificFunding.otherCommittees.fiveThousandPlus.count += jsonMember.total.donorType[2].otherCommittees.donationRange.fiveThousandPlus.count;
        specificFunding.otherCommittees.fiveThousandPlus.amount += jsonMember.total.donorType[2].otherCommittees.donationRange.fiveThousandPlus.amount;

        specificFunding.candidateContributions.zeroToOneHundred.count += jsonMember.total.donorType[3].candidate.donationRange.zeroToOneHundred.count;
        specificFunding.candidateContributions.zeroToOneHundred.amount += jsonMember.total.donorType[3].candidate.donationRange.zeroToOneHundred.amount;
        specificFunding.candidateContributions.oneHundredToFiveHundred.count += jsonMember.total.donorType[3].candidate.donationRange.oneHundredToFiveHundred.count;
        specificFunding.candidateContributions.oneHundredToFiveHundred.amount += jsonMember.total.donorType[3].candidate.donationRange.oneHundredToFiveHundred.amount;
        specificFunding.candidateContributions.fiveHundredToOneThousand.count += jsonMember.total.donorType[3].candidate.donationRange.fiveHundredToOneThousand.count;
        specificFunding.candidateContributions.fiveHundredToOneThousand.amount += jsonMember.total.donorType[3].candidate.donationRange.fiveHundredToOneThousand.amount;
        specificFunding.candidateContributions.oneThousandToTwoThousand.count += jsonMember.total.donorType[3].candidate.donationRange.oneThousandToTwoThousand.count;
        specificFunding.candidateContributions.oneThousandToTwoThousand.amount += jsonMember.total.donorType[3].candidate.donationRange.oneThousandToTwoThousand.amount;
        specificFunding.candidateContributions.twoThousandToThreeThousand.count += jsonMember.total.donorType[3].candidate.donationRange.twoThousandToThreeThousand.count;
        specificFunding.candidateContributions.twoThousandToThreeThousand.amount += jsonMember.total.donorType[3].candidate.donationRange.twoThousandToThreeThousand.amount;
        specificFunding.candidateContributions.threeThousandToFourThousand.count += jsonMember.total.donorType[3].candidate.donationRange.threeThousandToFourThousand.count;
        specificFunding.candidateContributions.threeThousandToFourThousand.amount += jsonMember.total.donorType[3].candidate.donationRange.threeThousandToFourThousand.amount;
        specificFunding.candidateContributions.fourThousandToFiveThousand.count += jsonMember.total.donorType[3].candidate.donationRange.fourThousandToFiveThousand.count;
        specificFunding.candidateContributions.fourThousandToFiveThousand.amount += jsonMember.total.donorType[3].candidate.donationRange.fourThousandToFiveThousand.amount;
        specificFunding.candidateContributions.fiveThousandPlus.count += jsonMember.total.donorType[3].candidate.donationRange.fiveThousandPlus.count;
        specificFunding.candidateContributions.fiveThousandPlus.amount += jsonMember.total.donorType[3].candidate.donationRange.fiveThousandPlus.amount;
    });

    specificFunding.individualContributions.zeroToOneHundred.amount = Number(specificFunding.individualContributions.zeroToOneHundred.amount.toFixed(2));
    specificFunding.individualContributions.oneHundredToFiveHundred.amount = Number(specificFunding.individualContributions.oneHundredToFiveHundred.amount.toFixed(2));
    specificFunding.individualContributions.fiveHundredToOneThousand.amount = Number(specificFunding.individualContributions.fiveHundredToOneThousand.amount.toFixed(2));
    specificFunding.individualContributions.oneThousandToTwoThousand.amount = Number(specificFunding.individualContributions.oneThousandToTwoThousand.amount.toFixed(2));
    specificFunding.individualContributions.twoThousandToThreeThousand.amount = Number(specificFunding.individualContributions.twoThousandToThreeThousand.amount.toFixed(2));
    specificFunding.individualContributions.threeThousandToFourThousand.amount = Number(specificFunding.individualContributions.threeThousandToFourThousand.amount.toFixed(2));
    specificFunding.individualContributions.fourThousandToFiveThousand.amount = Number(specificFunding.individualContributions.fourThousandToFiveThousand.amount.toFixed(2));
    specificFunding.individualContributions.fiveThousandPlus.amount = Number(specificFunding.individualContributions.fiveThousandPlus.amount.toFixed(2));

    specificFunding.pacContributions.zeroToOneHundred.amount = Number(specificFunding.pacContributions.zeroToOneHundred.amount.toFixed(2));
    specificFunding.pacContributions.oneHundredToFiveHundred.amount = Number(specificFunding.pacContributions.oneHundredToFiveHundred.amount.toFixed(2));
    specificFunding.pacContributions.fiveHundredToOneThousand.amount = Number(specificFunding.pacContributions.fiveHundredToOneThousand.amount.toFixed(2));
    specificFunding.pacContributions.oneThousandToTwoThousand.amount = Number(specificFunding.pacContributions.oneThousandToTwoThousand.amount.toFixed(2));
    specificFunding.pacContributions.twoThousandToThreeThousand.amount = Number(specificFunding.pacContributions.twoThousandToThreeThousand.amount.toFixed(2));
    specificFunding.pacContributions.threeThousandToFourThousand.amount = Number(specificFunding.pacContributions.threeThousandToFourThousand.amount.toFixed(2));
    specificFunding.pacContributions.fourThousandToFiveThousand.amount = Number(specificFunding.pacContributions.fourThousandToFiveThousand.amount.toFixed(2));
    specificFunding.pacContributions.fiveThousandPlus.amount = Number(specificFunding.pacContributions.fiveThousandPlus.amount.toFixed(2));

    specificFunding.otherCommittees.zeroToOneHundred.amount = Number(specificFunding.otherCommittees.zeroToOneHundred.amount.toFixed(2));
    specificFunding.otherCommittees.oneHundredToFiveHundred.amount = Number(specificFunding.otherCommittees.oneHundredToFiveHundred.amount.toFixed(2));
    specificFunding.otherCommittees.fiveHundredToOneThousand.amount = Number(specificFunding.otherCommittees.fiveHundredToOneThousand.amount.toFixed(2));
    specificFunding.otherCommittees.oneThousandToTwoThousand.amount = Number(specificFunding.otherCommittees.oneThousandToTwoThousand.amount.toFixed(2));
    specificFunding.otherCommittees.twoThousandToThreeThousand.amount = Number(specificFunding.otherCommittees.twoThousandToThreeThousand.amount.toFixed(2));
    specificFunding.otherCommittees.threeThousandToFourThousand.amount = Number(specificFunding.otherCommittees.threeThousandToFourThousand.amount.toFixed(2));
    specificFunding.otherCommittees.fourThousandToFiveThousand.amount = Number(specificFunding.otherCommittees.fourThousandToFiveThousand.amount.toFixed(2));
    specificFunding.otherCommittees.fiveThousandPlus.amount = Number(specificFunding.otherCommittees.fiveThousandPlus.amount.toFixed(2));

    specificFunding.candidateContributions.zeroToOneHundred.amount = Number(specificFunding.candidateContributions.zeroToOneHundred.amount.toFixed(2));
    specificFunding.candidateContributions.oneHundredToFiveHundred.amount = Number(specificFunding.candidateContributions.oneHundredToFiveHundred.amount.toFixed(2));
    specificFunding.candidateContributions.fiveHundredToOneThousand.amount = Number(specificFunding.candidateContributions.fiveHundredToOneThousand.amount.toFixed(2));
    specificFunding.candidateContributions.oneThousandToTwoThousand.amount = Number(specificFunding.candidateContributions.oneThousandToTwoThousand.amount.toFixed(2));
    specificFunding.candidateContributions.twoThousandToThreeThousand.amount = Number(specificFunding.candidateContributions.twoThousandToThreeThousand.amount.toFixed(2));
    specificFunding.candidateContributions.threeThousandToFourThousand.amount = Number(specificFunding.candidateContributions.threeThousandToFourThousand.amount.toFixed(2));
    specificFunding.candidateContributions.fourThousandToFiveThousand.amount = Number(specificFunding.candidateContributions.fourThousandToFiveThousand.amount.toFixed(2));
    specificFunding.candidateContributions.fiveThousandPlus.amount = Number(specificFunding.candidateContributions.fiveThousandPlus.amount.toFixed(2));
    
    return specificFunding;
}



mongoose.connect("mongodb+srv://admin:ADMIN.1010@congressapi.5cxqc.mongodb.net/117th-congress?retryWrites=true&w=majority").then(() => {
    console.log("Connected to Database!");
    app.listen(3030, () => {
        console.log("The backend is running on port 3030");
    });
}).catch((erorr) => {
    console.log("There was an error!");
    console.log(error);
})

// Map
app.get("/map/congress/:id", async (req, res) => {
    let memberId = req.params.id;
    let congressMember = await Member.find({ "congressId": memberId });
    res.json(congressMember[0]);
});

app.get("/map/fec/:id", async (req, res) => {
    let fecId = req.params.id;
    let memberFunding = await Funding.find({ "fecId" : fecId });
    res.json(memberFunding[0]);
});

// Parties
app.get("/parties/congress", async (req, res) => {
    let allMembers = await Member.find();
    res.json(allMembers);
})

app.get("/parties/funding/:party", async (req, res) => {
    let party = req.params.party;
    let allPartyMembers = (await Member.find({ party: party })).map(members => members.fecId);
    let allFundingInfo = await Funding.find({ fecId: allPartyMembers});

    if (party === "Independent") {
        console.log(allPartyMembers);
        console.log(allFundingInfo);
    }

    res.json(buildAggregateDonutChartData(allFundingInfo));
})

// Chamber
app.get("/chamber/", async (req, res) => {
    let allMembers = await Member.find();
    res.json(allMembers);
})

app.get("/chamber/funding/:chamber", async (req, res) => {
    let congressChamber = req.params.chamber;

    if (congressChamber === "House") {
        congressChamber = "House of Representatives";
    }

    let chamberMembers = await Member.find({ chamber: congressChamber });
    let congressMemberIds = chamberMembers.map(member => member.fecId).sort();

    let chamberMemberFunding = await Funding.find({ fecId: congressMemberIds });
    res.json(buildAggregateDonutChartData(chamberMemberFunding));
})

// State
app.get("/state/fundingTotals/:state", async (req, res) => {
    let stateName = req.params.state;

    let stateMembers = await Member.find({state: stateName});
    let memberCongressIds = stateMembers.map(member => member.fecId).sort();
    
    let memberFunding = await Funding.find({ fecId: memberCongressIds});
    
    res.json(buildAggregateDonutChartData(memberFunding));
})

app.get("/state/fundingSpecific/:state", async (req, res) => {
    let stateName = req.params.state;
    
    let stateMembers = await Member.find({state: stateName});
    let memberCongressIds = stateMembers.map(member => member.fecId).sort();
    
    let memberFunding = await Funding.find({ fecId: memberCongressIds});

    res.json(buildSpecificDonutChartData(memberFunding));
})

app.get("/state/sponsoredBills/:state", async (req, res) => {
    let stateName = req.params.state;
    
    let stateMembers = await Member.find({state: stateName});
    let memberCongressIds = stateMembers.map(member => member.congressId).sort();

    let sponsoredBills = await SponsoredBills.find({ congressId: memberCongressIds});

    let combinedSponsoredBills = {};
    sponsoredBills.forEach(bill => {
        bill.billSubjects.forEach((value, key) => {
            if (key === "null") {
                key = "None";
            }
            if (combinedSponsoredBills.hasOwnProperty(key)) {
                combinedSponsoredBills[key] += value;
            } else {
                combinedSponsoredBills[key] = value;
            }
        })
    })
    
    res.json(sortObj(combinedSponsoredBills));
})

app.get("/state/cosponsoredBills/:state", async (req, res) => {
    let stateName = req.params.state;
    
    let stateMembers = await Member.find({state: stateName});
    let memberCongressIds = stateMembers.map(member => member.congressId).sort();

    let cosponsoredBills = await CosponsoredBills.find({ congressId: memberCongressIds});

    let combinedCosponsoredBills = {};
    cosponsoredBills.forEach(bill => {
        bill.billSubjects.forEach((value, key) => {
            if (key === "null") {
                key = "None";
            }
            if (combinedCosponsoredBills.hasOwnProperty(key)) {
                combinedCosponsoredBills[key] += value;
            } else {
                combinedCosponsoredBills[key] = value;
            }
        })
    })
    
    res.json(sortObj(combinedCosponsoredBills));
})