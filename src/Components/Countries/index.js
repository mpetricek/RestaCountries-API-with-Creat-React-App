import React from 'react';
import { ReactComponent as PopulationIcon } from '../../assets/svg/population.svg';
import { ReactComponent as AreaIcon } from '../../assets/svg/area.svg';
import { ReactComponent as CapitalIcon } from '../../assets/svg/capital.svg';
import { ReactComponent as CurrencyIcon } from '../../assets/svg/currency.svg';
import Modal from '../Modal';

import './countries.scss';


const sortByColumn = (a, colIndex, reverse) => {
    if (reverse === true) {
        a.sort(sortFunction).reverse();
    } else {
        a.sort(sortFunction);
    }

    function sortFunction(a, b) {
        if (a[colIndex] === b[colIndex]) {
            return 0;
        } else {
            return (a[colIndex] < b[colIndex]) ? -1 : 1;
        }
    }
    return a;
}

class Countries extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            toggle: false,
            activeColumn: 0,
            lastActiveColumn: 0,
            modalOpen: false
        }
    }
    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(function (response) {
                return response.json();
            })
            .then(items => this.setState({ data: items }));
    }

    handleClick(title) {
        if (this.state.activeColumn === title) {
            let toggle = !this.state.toggle
            this.setState({
                toggle: toggle,
                activeColumn: title,
                rows: sortByColumn(this.state.data, title, toggle)
            })
        } else {
            this.setState({
                activeColumn: title,
                rows: sortByColumn(this.state.data, title, false)
            })
        }
    }
    modalOpener = () => {
        this.setState({ modalOpen: !this.state.modalOpen });
    }
    rowClick(data) {
        const currencies = data.currencies && data.currencies.map(child => `${child.name !== null ? child.name : ""} ${child.symbol !== null ? `(${child.symbol})` : ""}`);
        document.getElementById('countryModalImg').innerHTML = `<img src=${data.flag} alt="Modal flag"/>`;
        document.getElementById('countryModalName').innerHTML = data.name;
        document.getElementById('countryModalCapital').innerHTML = data.capital;
        document.getElementById('countryModalPopulation').innerHTML = data.population;
        document.getElementById('countryModalArea').innerHTML = data.area;
        document.getElementById('countryModalCurrencies').innerHTML = currencies;
        this.modalOpener();
    }
    render() {
        const Row = (props) => (
            <div className="countries__row" onClick={() => this.rowClick( props.data )}>
                <div><img src={props.data.flag} alt="Flag" /></div>
                <div><p>{props.data.name}</p></div>
                <div><p>{props.data.capital}</p></div>
                <div><p>{props.data.population && props.data.population.toLocaleString('en').replace(/,/g, ".")}</p></div>
                <div><p>{props.data.area && props.data.area.toLocaleString('en').replace(/,/g, ".")}</p></div>
                <div>{props.data.currencies && props.data.currencies.map((child, index) => {
                    return (
                        <p key={index}>{child.name && child.name} {child.symbol && `(${child.symbol})`}</p>
                    )
                })}
                </div>
            </div>
        )
        const rows = this.state.data.map((rowData, index) => <Row data={rowData} key={index} />);

        return (
            <>
                <Modal modalOpen={this.state.modalOpen} onClick={() => this.modalOpener()}/>
                <div className="countries">
                    <div className="countries__header">
                        <div></div>
                        <div></div>
                        <div onClick={() => this.handleClick('capital')} className={(this.state.activeColumn === 'capital') ? (this.state.toggle) ? "desc" : "asc" : ""}>
                            <CapitalIcon />
                        </div>
                        <div onClick={() => this.handleClick('population')} className={(this.state.activeColumn === 'population') ? (this.state.toggle) ? "desc" : "asc" : ""}>
                            <PopulationIcon />
                        </div>
                        <div onClick={() => this.handleClick('area')} className={(this.state.activeColumn === 'area') ? (this.state.toggle) ? "desc" : "asc" : ""}>
                            <AreaIcon />
                        </div>
                        <div>
                            <CurrencyIcon />
                        </div>
                    </div>
                    <div className="countries__body">
                        {rows}
                    </div>
                </div>
            </>
        );
    }
}

export default Countries;
