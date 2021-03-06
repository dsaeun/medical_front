import React, { Component, createContext } from "react";
import Medicine from "../page/Medicine";

const DrugsContext = createContext({
    drugs: [],
    setDrugs: (drug) => {},
    initializeDrugs: () => {},
});

class DrugsProvider extends Component {
    constructor(props) {
        super(props);

        this.setDrugs = (drug) => {
            let nextArray = this.state.drugs.concat(drug);
            this.setState({
                drugs: nextArray,
            });
        };

        this.initializeDrugs = () => {
            this.setState({
                drugs: [],
            })
        }

        this.state = {
            drugs: [],
            setDrugs: this.setDrugs,
            initializeDrugs: this.initializeDrugs,
        };
    }

    render() {
        return (
            <DrugsContext.Provider value={this.state}>
                {this.props.children}
            </DrugsContext.Provider>
        );
    }
}

class MedicineContainer extends Component {
    render() {
        return (
            <DrugsProvider>
                <Medicine />
            </DrugsProvider>
        );
    }
}

export const { Consumer: DrugsConsumer } = DrugsContext;

export default MedicineContainer;
