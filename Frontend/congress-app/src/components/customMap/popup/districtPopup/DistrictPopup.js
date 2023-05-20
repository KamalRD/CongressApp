import { useEffect, useState } from "react";

import "./districtPopup.css";

function DistrictPopup(props) {
    const [ stateName, setStateName ] = useState("");
    const [ districtNumber, setDistrictNumber ] = useState("");
    const [ memberCard, setMemberCard ] = useState([]);

    useEffect(() => {
        if (props.currentHover?.member !== undefined) {
            const currentMember = props.currentHover;
            setStateName(currentMember.state);
            setDistrictNumber(currentMember.districtNumber);

            const fetchMemberInfo = async () => {
                const memberInformation = [];
                // Get Congress Information
                let memberId = currentMember.member.bioguideId;
                let billInformation = await fetch(`http://localhost:3030/map/congress/${memberId}`);
                let billInfoBody = await billInformation.json();

                // Get FEC Information
                let fecId = billInfoBody.fecId;
                let fecInformation = await fetch(`http://localhost:3030/map/fec/${fecId}`);
                let fecBodyInfo = await fecInformation.json();

                let totalRaised = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                }).format(fecBodyInfo.total.amount);
                
                memberInformation.push({
                    sponsoredCount: billInfoBody.sponsoredLegislation.count,
                    cosponsoredCount: billInfoBody.cosponsoredLegislation.count,
                    totalMoneyRaised: totalRaised
                });
                return memberInformation;
            }

            const createMemberCard = async (memberInfo) => {
                const memberCard = [];
                let memberClassName = "memberCard " + currentMember.member.party;
                let memberAltImage = "Congress Member " + currentMember.member.name;
                
                memberCard.push(
                    <div className={memberClassName}>
                        <img src={currentMember.member.depiction.imageUrl} alt={memberAltImage}></img>
                        <h3 className="memberName">{currentMember.member.name}</h3>
                        <div className="memberData">
                            <div className="memberSponsorship">
                                <h3>{memberInfo[0].sponsoredCount}</h3>
                                <h4>Sponsored Bills</h4>
                            </div>
                            <div className="memberCosponsorship">
                                <h3>{memberInfo[0].cosponsoredCount}</h3>
                                <h4>Cosponsored Bills</h4>
                            </div>
                            <div className="memberRaising">
                                <h3>{memberInfo[0].totalMoneyRaised}</h3>
                                <h4>Money Raised</h4>
                            </div>
                        </div>
                    </div>
                );
                return memberCard;
            }
            
            fetchMemberInfo().then((data) => createMemberCard(data).then(data => setMemberCard(data)));
        }
    }, [props]);



    return (
        <>
            { stateName !== undefined ?
            <div className="popupContainer">
                <div className="stateInformation">
                    <h1 className="popupStateName">{ stateName === null ? "United States of America" : stateName }</h1>
                    <h2 className="popupDistrict">{ stateName === null ? "Washington D.C." : "District " + districtNumber }</h2>
                </div>
                <div className="stateMember">
                    {memberCard}
                </div>
            </div>
            : null }
        </>
    );
}

export default DistrictPopup;