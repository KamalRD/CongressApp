import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../navbar/Navbar";
import SponsoredBillHistogram from "../histogram/SponsoredBillHistogram";
import CosponsoredBillHistogram from "../histogram/CosponsoredBillHistogram";
import DonutChart from "../donut/StateDonut";

import "./state.css";
import DonationsHistogram from "../histogram/DonationsDistogram";


function State(props) {
    const currentPropsState = useLocation().state;
    const stateRepresentatives = currentPropsState.stateRepresentatives;
    const sponsoredBillCount = currentPropsState.stateRepresentatives.map(rep => rep.sponsoredLegislation.count).reduce((acc, value) => {
        return acc + value;
    }, 0);
    const cosponsoredBillCount = currentPropsState.stateRepresentatives.map(rep => rep.cosponsoredLegislation.count).reduce((acc, value) => {
        return acc + value;
    }, 0);
    const [ sponsoredBills, setSponsoredBills ] = useState({});
    const [ cosponsoredBills, setCosponsoredBills ] = useState({});
    const [ netFundingData, setNetFundingData ] = useState({});
    const [ specificFundingData, setSpecificFundingData ] = useState({});

    const numberWithCommas = (x) => {
        if (x) {
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        }
    }


    useEffect(() => {
        const getSponsoredBillInfo = async () => {
            let membersSponosredReq = await fetch(`http://localhost:3030/state/sponsoredBills/${currentPropsState.stateName}`);
            let membersSponsoredBody = await membersSponosredReq.json();
            return membersSponsoredBody;
        } 
        const getCosponsoredBillInfo = async () => {
            let membersCosponsoredReq = await fetch(`http://localhost:3030/state/cosponsoredBills/${currentPropsState.stateName}`);
            let membersCosponsoredBody = await membersCosponsoredReq.json();
            return membersCosponsoredBody;
        } 

        const getNetFundingInfo = async () => {
            let membersFundingReq = await fetch(`http://localhost:3030/state/fundingTotals/${currentPropsState.stateName}`);
            let membersFundingBody = await membersFundingReq.json();
            return membersFundingBody;
        }

        const getSpecificFundingInfo = async () => {
            let membersFundingReq = await fetch(`http://localhost:3030/state/fundingSpecific/${currentPropsState.stateName}`);
            let membersFundingBody = await membersFundingReq.json();
            return membersFundingBody;
        }


        getSponsoredBillInfo().then(data => setSponsoredBills(data));
        getCosponsoredBillInfo().then(data => setCosponsoredBills(data));
        getNetFundingInfo().then(data => setNetFundingData(data));
        getSpecificFundingInfo().then(data => setSpecificFundingData(data));

    }, [props, currentPropsState.stateName]); 
    return (
        <>
            <Navbar></Navbar>
            <div className="stateContainer">
                <div className="stateInfoContainer"> 
                    <section className="stateGeography">
                        <h1>{currentPropsState.stateName}</h1>
                        <h2>{currentPropsState.stateCapital}</h2>
                    </section>

                    <section className="stateSpecifics">
                        <div className="stateSenators">
                            <h3>2</h3>
                            <h4>Senators</h4>
                        </div>
                        <div className="stateHouseMembers">
                            <h3>{stateRepresentatives.filter(member => member.chamber === "House of Representatives").length}</h3>
                            <h4>House of Representatives</h4>
                        </div>
                        <div className="billSponsorCount">
                            <h3>{numberWithCommas(sponsoredBillCount)}</h3>
                            <h4>Sponsored Bills</h4>
                        </div>
                        <div className="billCosponsorCount">
                            <h3>{numberWithCommas(cosponsoredBillCount)}</h3>
                            <h4>Cosponsored Bills</h4>
                        </div>
                    </section>
                </div>
                <div className="billHistogramContainer">
                    <SponsoredBillHistogram className="sponsoredBillHistogram" data={sponsoredBills} barColor={currentPropsState.party === "Republican" ? "rgb(150, 16, 16)" : "rgb(24, 108, 234)"} width={400} height={200}></SponsoredBillHistogram>
                    <CosponsoredBillHistogram className="cosponsoredBillHistogram" data={cosponsoredBills} barColor={currentPropsState.party === "Republican" ? "rgb(150, 16, 16)" : "rgb(24, 108, 234)"} width={400} height={200}></CosponsoredBillHistogram>
                </div>
                <div className="donationsHistogramContainer">
                    <DonationsHistogram funding={specificFundingData}></DonationsHistogram>
                </div>
                <div className="donationDonutContainer"> 
                    <DonutChart funding={netFundingData}></DonutChart>
                </div>
            </div>
        </>
    );
}

export default State;