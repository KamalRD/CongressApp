import { useEffect, useState } from "react";

import Navbar from "../navbar/Navbar";
import DonutChart from "../donut/PartyDonut";

import "./parties.css";

function Parties() {
    const [ republicanParty, setRepublicanParty ] = useState({});
    const [ independentParty, setIndependentParty ] = useState({});
    const [ democraticParty, setDemocraticParty ] = useState({});

    const numberWithCommas = (x) => {
        if (x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    useEffect(() => {
        const getAllMembers = async () => {
            let allMembersRequest = await fetch("http://localhost:3030/parties/congress");
            let allMembersJSON = await allMembersRequest.json();
            
            let republicans = allMembersJSON.filter(member => member.party === "Republican");
            let independents = allMembersJSON.filter(member => member.party === "Independent");
            let democrats = allMembersJSON.filter(member => member.party === "Democratic");

            let republicanFundingReq = await fetch("http://localhost:3030/parties/funding/Republican");
            let republicanFundingBody = await republicanFundingReq.json();

            let independentFundingReq = await fetch("http://localhost:3030/parties/funding/Independent");
            let independentFundingBody = await independentFundingReq.json();

            let democraticFundingReq = await fetch("http://localhost:3030/parties/funding/Democratic");
            let democraticFundingBody = await democraticFundingReq.json();

            console.log(republicanFundingBody);

            let repParty = {
                members: {
                    allMembers: {
                        count: republicans.length,
                        list: republicans
                    },
                    senators: {
                        count: republicans.filter(member => member.chamber === "Senate").length,
                        list: republicans.filter(member => member.chamber === "Senate")
                    },
                    representatives: {
                        count: republicans.filter(member => member.chamber === "House of Representatives").length,
                        list: republicans.filter(member => member.chamber === "House of Representatives")
                    }
                },
                bills: {
                    sponsoredBills: republicans.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    cosponsoredBills: republicans.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    sponsoredBillsPerMember: Math.round(republicans.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / republicans.length),
                    cosponsoredBillsPerMember: Math.round(republicans.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / republicans.length),
                },
                funding: republicanFundingBody
            };
            
            setRepublicanParty(repParty);

            let indParty = {
                members: {
                    allMembers: {
                        count: independents.length,
                        list: independents
                    },
                    senators: {
                        count: independents.filter(member => member.chamber === "Senate").length,
                        list: independents.filter(member => member.chamber === "Senate")
                    },
                    representatives: {
                        count: independents.filter(member => member.chamber === "House of Representatives").length,
                        list: independents.filter(member => member.chamber === "House of Representatives")
                    }
                },
                bills: {
                    sponsoredBills: numberWithCommas(independents.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0)),
                    cosponsoredBills: numberWithCommas(independents.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0)),
                    sponsoredBillsPerMember: Math.round(independents.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / independents.length),
                    cosponsoredBillsPerMember: Math.round(independents.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / independents.length),
                },
                funding: independentFundingBody
            };
            setIndependentParty(indParty);

            let demParty = {
                members: {
                    allMembers: {
                        count: democrats.length,
                        list: democrats
                    },
                    senators: {
                        count: democrats.filter(member => member.chamber === "Senate").length,
                        list: democrats.filter(member => member.chamber === "Senate")
                    },
                    representatives: {
                        count: democrats.filter(member => member.chamber === "House of Representatives").length,
                        list: democrats.filter(member => member.chamber === "House of Representatives")
                    }
                },
                bills: {
                    sponsoredBills: numberWithCommas(democrats.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0)),
                    cosponsoredBills: numberWithCommas(democrats.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0)),
                    sponsoredBillsPerMember: Math.round(democrats.map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / democrats.length),
                    cosponsoredBillsPerMember: Math.round(democrats.map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / democrats.length),
                },
                funding: democraticFundingBody
            };
            setDemocraticParty(demParty);
        }
        getAllMembers();
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <div className="partiesContainer">
                <div className="republicanContainer">
                    <div className="partyHeader">
                        <h1>Republican Party</h1>
                    </div>
                    <div className="partyInformation">
                        <div className="memberInformation partyCard">
                            <div className="totalMembers">
                                <h3>{republicanParty.members?.allMembers?.count}</h3>
                                <h4>Total Members</h4>
                            </div>
                            <div className="senators">
                                <h3>{republicanParty.members?.senators?.count}</h3>
                                <h4>Senators</h4>
                            </div>
                            <div className="representatives">
                                <h3>{republicanParty.members?.representatives?.count}</h3>
                                <h4>House of Representatives</h4>
                            </div>
                        </div>
                        <div className="votingInformation partyCard">
                            <div className="sponsoredBills">
                                <h3>{numberWithCommas(republicanParty.bills?.sponsoredBills)}</h3>
                                <h4>Sponsored Bills</h4>
                            </div>
                            <div className="cosponsoredBills">
                                <h3>{numberWithCommas(republicanParty.bills?.cosponsoredBills)}</h3>
                                <h4>Cosponsored Bills</h4>
                            </div>
                            <div className="sponsoredBillsPerMember">
                                <h3>{numberWithCommas(republicanParty.bills?.sponsoredBillsPerMember)}</h3>
                                <h4>Sponsored Bills per Member</h4>
                            </div>
                            <div className="cosponsoredBillsPerMember">
                                <h3>{numberWithCommas(republicanParty.bills?.cosponsoredBillsPerMember)}</h3>
                                <h4>Cosponsored Bills per Member</h4>
                            </div>
                        </div>
                        <div className="fundingInformation partyCard">
                            <DonutChart funding={republicanParty.funding}></DonutChart>
                        </div>
                    </div>
                </div>
                <div className="independentContainer">
                    <div className="partyHeader">
                        <h1>Independent Party</h1>
                    </div>
                    <div className="partyInformation">
                        <div className="memberInformation partyCard">
                            <div className="totalMembers">
                                <h3>{independentParty.members?.allMembers?.count}</h3>
                                <h4>Total Members</h4>
                            </div>
                            <div className="senators">
                                <h3>{independentParty.members?.senators?.count}</h3>
                                <h4>Senators</h4>
                            </div>
                            <div className="representatives">
                                <h3>{independentParty.members?.representatives?.count}</h3>
                                <h4>House of Representatives</h4>
                            </div>
                        </div>
                        <div className="votingInformation partyCard">
                            <div className="sponsoredBills">
                                <h3>{independentParty.bills?.sponsoredBills}</h3>
                                <h4>Sponsored Bills</h4>
                            </div>
                            <div className="cosponsoredBills">
                                <h3>{independentParty.bills?.cosponsoredBills}</h3>
                                <h4>Cosponsored Bills</h4>
                            </div>
                            <div className="sponsoredBillsPerMember">
                                <h3>{numberWithCommas(independentParty.bills?.sponsoredBillsPerMember)}</h3>
                                <h4>Sponsored Bills per Member</h4>
                            </div>
                            <div className="cosponsoredBillsPerMember">
                                <h3>{numberWithCommas(independentParty.bills?.cosponsoredBillsPerMember)}</h3>
                                <h4>Cosponsored Bills per Member</h4>
                            </div>
                        </div>
                        <div className="fundingInformation partyCard">
                        <DonutChart funding={independentParty.funding}></DonutChart>
                        </div>
                    </div>
                </div>
                <div className="democraticContainer">
                    <div className="partyHeader">
                        <h1>Democratic Party</h1>
                    </div>
                    <div className="partyInformation">
                        <div className="memberInformation partyCard">
                            <div className="totalMembers">
                                <h3>{democraticParty.members?.allMembers?.count}</h3>
                                <h4>Total Members</h4>
                            </div>
                            <div className="senators">
                                <h3>{democraticParty.members?.senators?.count}</h3>
                                <h4>Senators</h4>
                            </div>
                            <div className="representatives">
                                <h3>{democraticParty.members?.representatives?.count}</h3>
                                <h4>House of Representatives</h4>
                            </div>
                        </div>
                        <div className="votingInformation partyCard">
                            <div className="sponsoredBills">
                                <h3>{democraticParty.bills?.sponsoredBills}</h3>
                                <h4>Sponsored Bills</h4>
                            </div>
                            <div className="cosponsoredBills">
                                <h3>{democraticParty.bills?.cosponsoredBills}</h3>
                                <h4>Cosponsored Bills</h4>
                            </div>
                            <div className="sponsoredBillsPerMember">
                                <h3>{numberWithCommas(democraticParty.bills?.sponsoredBillsPerMember)}</h3>
                                <h4>Sponsored Bills per Member</h4>
                            </div>
                            <div className="cosponsoredBillsPerMember">
                                <h3>{numberWithCommas(democraticParty.bills?.cosponsoredBillsPerMember)}</h3>
                                <h4>Cosponsored Bills per Member</h4>
                            </div>
                        </div>
                        <div className="fundingInformation partyCard">
                            <DonutChart funding={democraticParty.funding}></DonutChart>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Parties;