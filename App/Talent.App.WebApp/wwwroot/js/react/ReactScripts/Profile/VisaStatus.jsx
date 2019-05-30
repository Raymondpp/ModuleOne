import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';


export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        const visaStatus = props.visaStatusData
        const expiryDates = props.visaExpiryData

        this.state = {
            newVisaStatus: visaStatus,
            newExpiryDate: expiryDates
        }

        this.saveVisaStatus = this.saveVisaStatus.bind(this)
        this.saveExpiryDate = this.saveExpiryDate.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }
    componentDidUpdate(prevProps) {
        if (prevProps.visaExpiryDate != this.props.visaExpiryDate) {
            this.setState({
                newExpiryDate: this.props.visaExpiryDate
            })
        }
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.newVisaStatus)
        data[event.target.name] = event.target.value
        this.setState({
            newVisaStatus: data
        }
            , this.saveVisaStatus
        )
    }

    handleDateChange(event) {
       
        this.setState({
            newExpiryDate: event.target.value
        })
    }

    saveVisaStatus() {
        const data = this.state.newVisaStatus
        this.props.saveProfileData(data)

    }
    saveExpiryDate() {
        const data = this.state.newExpiryDate
        this.props.saveProfileData({ "visaExpiryDate": data })

    }

    formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }


    render() {
        
        
        const selectedStatus = this.props.visaStatusData;
    

        return (
            <React.Fragment>
                <div className="row">
                    <div className='ui sixteen wide column'>
                        <div className="field">
                        <label>Visa Type</label>
                        <select className="ui dropdown"
                            placeholder="Visa type"
                            value={selectedStatus}
                            onChange={this.handleChange}
                            name="visaStatus">

                            <option value="0">Select your visa type</option>
                            <option value="Citizen">Citizen</option>
                            <option value="Permanent Resisdent">Permanent Resisdent</option>
                            <option value="Work Visa">Work Visa</option>
                            <option value="Student Visa">Student Visa</option>
                            
                            </select>
                        </div>
                    </div>

                    {this.props.visaStatus == "Work Visa" || this.props.visaStatus == "Student Visa" ?
                        <React.Fragment>
                            <div className="ui six wide column">
                                <div className="field">
                                    <label>Visa expiry date</label>
                                    <div className="ui calendar" >
                                        <div className="ui input left icon">
                                            <i className="calendar icon"></i>
                                            <input type="date" name="visaExpiryDate" value={this.formatDate(this.state.newExpiryDate)}  onChange={this.handleDateChange}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ui four wide column">
                                <div className="field">
                                    <label >Save Date</label>
                                    <button type="button" className="ui green button" onClick={this.saveExpiryDate}>Save</button>
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                        </React.Fragment>
                        }
                </div>
            </React.Fragment>

        )
    }
}