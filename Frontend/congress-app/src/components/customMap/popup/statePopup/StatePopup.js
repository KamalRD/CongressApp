import { useEffect, useState } from "react";

import "./statePopup.css";

function StatePopup(props) {
    const [ stateName, setStateName ] = useState("");
    const [ stateCapital, setStateCapital ] = useState("");
    const [ senatorCards, setSenatorCards ] = useState([]);

    useEffect(() => {
        if (props.currentHover?.senators !== undefined) {
            setStateName(props.currentHover?.name);
            setStateCapital(props.currentHover?.stateCapital);

            const fetchSenatorInfo = async () => {
                const senatorInformation = [];
                // Get Congress Information

                for (const senator of props.currentHover.senators) {
                    let senatorId = senator.bioguideId;
                    let billInformation = await fetch(`http://localhost:3030/map/congress/${senatorId}`);
                    let billInfoBody = await billInformation.json();

                    // Get FEC Information
                    let fecId = billInfoBody.fecId;
                    let senatorFunding = await fetch(`http://localhost:3030/map/fec/${fecId}`);
                    let fundingBody = await senatorFunding.json();
                    
                    if (fundingBody.data !== null) {
                        let totalRaised = new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD"
                        }).format(fundingBody.data.total.amount);

                        senatorInformation.push({
                            sponsoredCount: billInfoBody.sponsoredLegislation.count,
                            cosponsoredCount: billInfoBody.cosponsoredLegislation.count,
                            totalMoneyRaised: totalRaised
                        }); 
                    } else {
                        senatorInformation.push({
                            sponsoredCount: billInfoBody.sponsoredLegislation.count,
                            cosponsoredCount: billInfoBody.cosponsoredLegislation.count
                        }); 
                    }                   
                }
                return senatorInformation;
            }
            
            const createSenatorCards = async (senatorInformation) => {
                const senatorCards = [];
                props.currentHover.senators.forEach((senator, index) => {
                    let senatorClassName = "senatorCard " + senator.party;
                    let senatorImageAlt = "Senator " + senator.name;

                    senatorCards.push(
                        <div className={senatorClassName}>
                            <img src={senator.depiction.imageUrl} alt={senatorImageAlt}></img>
                            <h3 className="senatorName">{senator.name}</h3>
                            <div className="senatorData">
                                <div className="senatorSponsorship">
                                    <h3>{senatorInformation[index].sponsoredCount}</h3>
                                    <h4>Sponsored Bills</h4>
                                </div>
                                <div className="senatorCosponsorship">
                                    <h3>{senatorInformation[index].cosponsoredCount}</h3>
                                    <h4>Cosponsored Bills</h4>
                                </div>
                                <div className="senatorRaising">
                                    <h3>{senatorInformation[index].totalMoneyRaised}</h3>
                                    <h4>Money Raised</h4>
                                </div>
                            </div>
                        </div>
                    );
                });
                return senatorCards;
            }

            fetchSenatorInfo().then((data) => createSenatorCards(data).then(data => setSenatorCards(data)));
            
        }
    }, [props]);

    return (
        <>
            { stateName !== undefined ?
            <div className="popupContainer">
                <div className="stateInformation">
                    <h1 className="popupStateName">{ stateName === null ? "United States of America" : stateName }</h1>
                    <h2 className="popupStateCapital">{ stateName === null ? "Washington D.C." : stateCapital }</h2>
                </div>
                <div className="stateReps">
                    {senatorCards}
                </div>
            </div>
            : null }
        </>
    );
}

export default StatePopup;