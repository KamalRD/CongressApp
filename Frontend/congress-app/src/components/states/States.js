import { Link } from 'react-router-dom';

import USStates from '../../data/USStates.json';
import Congress from '../../data/117thCongress.json';

import './states.css';

import Navbar from '../navbar/Navbar';

function States() {
    const stateNames = [...USStates.features.map(state => state.properties.name)];
    const stateCapitals = [...USStates.features.map(state => state.properties.stateCapital)];
    const stateCodes = [...USStates.features.map(state => state.properties.stateCode)];
    
    const statesToRender = [];

    stateNames.forEach((state, index) => {
        let allRepresentatives = Congress.filter(member => member.state === state);
        let stateSenators = allRepresentatives.filter(member => member.chamber === "Senate");
        let stateRepresentatives = allRepresentatives.filter(member => member.chamber === "House of Representatives");
        let stateColorValue = 0;
        allRepresentatives.forEach(member => {
            if (member.party === "Democratic") {
                stateColorValue += 1;
            } else if (member.party === "Republican") {
                stateColorValue -= 1;
            } else {
                stateColorValue += 0;
            }
        });

        let stateParty;
        if (stateColorValue > 0) {
            stateParty = "Democratic";
        } else if (stateColorValue < 0) {
            stateParty = "Republican";
        } else {
            stateParty = "Neutral";
        }

        let containerClassName = "stateCardContainer " + stateParty
        let linkEndpoint = "/states/" + stateCodes[index];

        statesToRender.push(
            <Link to={linkEndpoint} state={{stateName: state, stateCapital: stateCapitals[index], party: stateParty, stateRepresentatives: allRepresentatives}}>
            <div className={containerClassName}>
                <div className="stateName">
                    <h2>{state}  ({stateCodes[index]})</h2>
                </div>

                {/* <div className="stateCongressMembers"> */}
                    <div className="statesSenators">
                        <h3>{stateSenators.length}</h3>
                        <h4>Senators</h4>
                    </div>
                    <div className="statesRepresentatives">
                        <h3>{stateRepresentatives.length}</h3>
                        <h4>Representatives</h4>
                    </div>
                {/* </div> */}
            </div>
            </Link>
        );
    });

    return (
        <div className="statePage">
            <Navbar></Navbar>
            <div className="statesBody">
                <div className="stateTitle">
                    <h1>States</h1>
                </div>
                <div className="cardsContainer">
                    {statesToRender}
                </div>
            </div>
        </div>
    );
}

export default States;
