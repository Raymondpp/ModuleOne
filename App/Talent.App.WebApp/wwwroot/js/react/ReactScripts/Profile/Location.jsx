import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';

export class Address extends React.Component {
    constructor(props) {
        super(props)
        const details = props.addressData
           

        this.state = {
            showEditSection: false,
            newAddress: details
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const details = this.props.addressData
        this.setState({
            showEditSection: true,
            newAddress: details
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = this.state.newAddress
        data[event.target.name] = event.target.value
        this.setState({
            newAddress: data
        })
    }

    saveAddress() {
        const data = this.state.newAddress
        this.props.saveProfileData(data)
        this.closeEdit()
    }


    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }
    renderEdit() {
        let countriesOptions = [];
        const selectedCountry = this.props.addressData.country;
        const selectedCity = this.props.addressData.city;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);
        
        if (selectedCountry != "" && selectedCountry != null) {
           
            var temp = Array.from(new Set(Countries[selectedCountry]));
            var popCities = temp.map(x => <option key={x} value={x}> {x}</option>);
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className='ui four wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Number"
                            name="number"
                            value={this.state.newAddress.number}
                            controlFunc={this.handleChange}
                            maxLength={10}
                            placeholder="Enter your street number"
                            errorMessage="Please enter a valid Street number"
                        />
                    </div>
                    <div className='ui eight wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Street"
                            name="street"
                            value={this.state.newAddress.street}
                            controlFunc={this.handleChange}
                            maxLength={80}
                            placeholder="Enter your street name"
                            errorMessage="Please enter a valid street name"
                        />
                    </div>
                    <div className='ui four wide column'>
                        <ChildSingleInput
                            inputType="text"
                            label="Suburb"
                            name="suburb"
                            value={this.state.newAddress.suburb}
                            controlFunc={this.handleChange}
                            maxLength={20}
                            placeholder="Enter a suburb"
                            errorMessage="Please enter a valid suburb"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className='ui six wide column'>
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">

                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    <div className='ui six wide column'>
                        <select className="ui right labeled dropdown"
                            placeholder="City"
                            value={selectedCity}
                            onChange={this.handleChange}
                            name="city">
                         
                            <option value="">Select a city</option>
                            {popCities}
                        </select>
                    </div>
                </div>
                <div className='ui four wide column'>
                    <ChildSingleInput
                        inputType="number"
                        label="Postcode"
                        name="postCode"
                        value={this.state.newAddress.postCode}
                        controlFunc={this.handleChange}
                        maxLength={12}
                        placeholder="Enter a postcode"
                        errorMessage="Please enter a valid postcode"
                    />
                </div>
                <div className="row">
                    <div className='ui sixteen wide column'>
                        <button type="button" className="ui green button" onClick={this.saveAddress}>Save</button>
                        <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
            
    renderDisplay() {

       

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {this.props.addressData.number},{this.props.addressData.street},{this.props.addressData.suburb},{this.props.addressData.postCode}</p>
                        <p>City: {this.props.addressData.city}</p>
                        <p>Country: {this.props.addressData.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated green button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}
            
export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        const nationality = props.nationalityData


        this.state = {
            newNation: nationality
        }

        this.saveNation = this.saveNation.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
        handleChange(event) {
            const data = Object.assign({}, this.state.newNation)
            data[event.target.name] = event.target.value
            this.setState({
                newNation: data
            }
                , this.saveNation
            )
        }

        saveNation() {
            const data = this.state.newNation
            this.props.saveProfileData(data)
          
        }
    


    render() {
        let countriesOptions = [];
        const selectedNation = this.props.nationalityData;

        countriesOptions = Object.keys(Countries).map((x) => <option key={x} value={x}>{x}</option>);

      
        return (
            <React.Fragment>
                <div className="row">
                    <div className='ui sixteen wide column'>
                        <select className="ui right labeled dropdown"
                            placeholder="Nationality"
                            value={selectedNation}
                            onChange={this.handleChange}
                            name="nationality">

                            <option value="">Select a nationality</option>
                            {countriesOptions}
                        </select>
                    </div>
                </div>
            </React.Fragment>

            )
    }

}