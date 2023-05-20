import { useEffect, useState } from "react";

import Navbar from "../navbar/Navbar";
import DonutChart from "../donut/ChamberDonut";

import "./chamber.css";


function Chamber() {
    const [ senators, setSenators ] = useState({});
    const [ representatives, setRepresentatives ] = useState({});

    const numberWithCommas = (x) => {
        if (x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    useEffect(() => {
        const getAllMembers = async () => {
            let allMembersReq = await fetch("http://localhost:3030/chamber");
            let allMembersBody = await allMembersReq.json();

            // let senatorFundingReq = await fetch("http://localhost:3030/chamber/funding/Senate");
            // let senatorFundingBody = await senatorFundingReq.json();
            // console.log(senatorFundingBody);

            let representativeFundingReq = await fetch("http://localhost:3030/chamber/funding/House");
            let representativeFundingBody = await representativeFundingReq.json();
            
            let tempSenators = {
                chamberMembers: {
                    all: allMembersBody.filter(member => member.chamber === "Senate"),
                    republicans: allMembersBody.filter(member => (member.chamber === "Senate" && member.party === "Republican")),
                    independents: allMembersBody.filter(member => (member.chamber === "Senate" && member.party === "Independent")),
                    democrats: allMembersBody.filter(member => (member.chamber === "Senate" && member.party === "Democratic"))
                },
                bills: {
                    sponsoredBills: allMembersBody.filter(member => member.chamber === "Senate").map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    sponsoredBillsPerMember: Math.round(allMembersBody.filter(member => member.chamber === "Senate").map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / allMembersBody.filter(member => member.chamber === "Senate").length),
                    cosponsoredBills: allMembersBody.filter(member => member.chamber === "Senate").map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    cosponsoredBillsPerMember: Math.round(allMembersBody.filter(member => member.chamber === "Senate").map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / allMembersBody.filter(member => member.chamber === "Senate").length),
                }
            };

            let tempRepresentatives = {
                chamberMembers: {
                    all: allMembersBody.filter(member => member.chamber === "House of Representatives"),
                    republicans: allMembersBody.filter(member => (member.chamber === "House of Representatives" && member.party === "Republican")),
                    independents: allMembersBody.filter(member => (member.chamber === "House of Representatives" && member.party === "Independent")),
                    democrats: allMembersBody.filter(member => (member.chamber === "House of Representatives" && member.party === "Democratic")),
                },
                bills: {
                    sponsoredBills: allMembersBody.filter(member => member.chamber === "House of Representatives").map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    sponsoredBillsPerMember: Math.round(allMembersBody.filter(member => member.chamber === "House of Representatives").map(member => member.sponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / allMembersBody.filter(member => member.chamber === "House of Representatives").length),
                    cosponsoredBills: allMembersBody.filter(member => member.chamber === "House of Representatives").map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0),
                    cosponsoredBillsPerMember: Math.round(allMembersBody.filter(member => member.chamber === "House of Representatives").map(member => member.cosponsoredLegislation.count).reduce((acc, cur) => acc + cur, 0) / allMembersBody.filter(member => member.chamber === "House of Representatives").length),
                },
                funding: representativeFundingBody
            };

            setSenators(tempSenators);
            setRepresentatives(tempRepresentatives);
        }

        getAllMembers();
    }, [])
    
    return (
        <>
            <Navbar></Navbar> 
            <div className="chambersContainer">
                <div className="senateContainer">
                    <div className="chamberHeader">
                        <h1>Senate</h1>
                    </div>
                    <div className="memberInformation partyCard">
                        <div className="totalMembers">
                            <h3>{senators.chamberMembers?.all.length}</h3>
                            <h4>Total Members</h4>
                        </div>
                        <div className="republicans">
                            <h3>{senators.chamberMembers?.republicans?.length}</h3>
                            <h4>Republicans</h4>
                        </div>
                        <div className="independents">
                            <h3>{senators.chamberMembers?.independents?.length}</h3>
                            <h4>Independents</h4>
                        </div>
                        <div className="democrats">
                            <h3>{senators.chamberMembers?.democrats?.length}</h3>
                            <h4>Democrats</h4>
                        </div>
                    </div>
                    <div className="votingInformation partyCard">
                        <div className="sponsoredBills">
                            <h3>{numberWithCommas(senators.bills?.sponsoredBills)}</h3>
                            <h4>Sponsored Bills</h4>
                        </div>
                        <div className="cosponsoredBills">
                            <h3>{numberWithCommas(senators.bills?.cosponsoredBills)}</h3>
                            <h4>Cosponsored Bills</h4>
                        </div>
                        <div className="sponsoredBillsPerMember">
                            <h3>{numberWithCommas(senators.bills?.sponsoredBillsPerMember)}</h3>
                            <h4>Sponsored Bills per Member</h4>
                        </div>
                        <div className="cosponsoredBillsPerMember">
                            <h3>{numberWithCommas(senators.bills?.cosponsoredBillsPerMember)}</h3>
                            <h4>Cosponsored Bills per Member</h4>
                        </div>
                    </div>
                </div>
                <div className="houseContainer">
                    <div className="chamberHeader">
                        <h1>House of Representatives</h1>
                    </div>
                    <div className="memberInformation partyCard">
                        <div className="totalMembers">
                            <h3>{representatives.chamberMembers?.all?.length}</h3>
                            <h4>Total Members</h4>
                        </div>
                        <div className="republicans">
                            <h3>{representatives.chamberMembers?.republicans?.length}</h3>
                            <h4>Republicans</h4>
                        </div>
                        <div className="independents">
                            <h3>{representatives.chamberMembers?.independents?.length}</h3>
                            <h4>Independents</h4>
                        </div>
                        <div className="democrats">
                            <h3>{representatives.chamberMembers?.democrats?.length}</h3>
                            <h4>Democrats</h4>
                        </div>
                    </div>
                    <div className="votingInformation partyCard">
                        <div className="sponsoredBills">
                            <h3>{numberWithCommas(representatives.bills?.sponsoredBills)}</h3>
                            <h4>Sponsored Bills</h4>
                        </div>
                        <div className="cosponsoredBills">
                            <h3>{numberWithCommas(representatives.bills?.cosponsoredBills)}</h3>
                            <h4>Cosponsored Bills</h4>
                        </div>
                        <div className="sponsoredBillsPerMember">
                            <h3>{numberWithCommas(representatives.bills?.sponsoredBillsPerMember)}</h3>
                            <h4>Sponsored Bills per Member</h4>
                        </div>
                        <div className="cosponsoredBillsPerMember">
                            <h3>{numberWithCommas(representatives.bills?.cosponsoredBillsPerMember)}</h3>
                            <h4>Cosponsored Bills per Member</h4>
                        </div>
                    </div>
                    <div className="fundingInformation partyCard">
                        <DonutChart funding={representatives.funding}></DonutChart>
                    </div>
                </div>    
            </div> 
        </>
    );
}

export default Chamber;