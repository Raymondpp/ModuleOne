import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props)
        const jobSeekingStatus = props.status ? props.status : { "status": "", "availableDate": null }
 
        this.state = {
            newJobSeekingStatus: jobSeekingStatus.status,
            availableDate: jobSeekingStatus.availableDate
        }

        this.saveJobSeekingStatus = this.saveJobSeekingStatus.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }
    
    handleChange(val) {
        var data = event.target.value
        if (val == 'availableLater') {
            this.setState({
                newJobSeekingStatus: val,
                availableDate: data
            })
        } else {
            this.setState({
                newJobSeekingStatus: val,
                availableDate: null
            },
                this.saveJobSeekingStatus
            )
        }
    }

    saveJobSeekingStatus() {
        const data = this.state.newJobSeekingStatus
        const temp = this.state.availableDate
        const x = { "status": data, "availableDate": temp }
        this.props.saveProfileData({ "jobSeekingStatus": x })
    }

    

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="ui form">
                        <div className="ui sixteen wide column">
                            <div className="grouped fields">
                                <label>Current Status</label>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" value='active' checked={this.state.newJobSeekingStatus === 'active'} onChange={this.handleChange.bind(this, 'active')}></input>
                                        <label>Actively looking for a job</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" value='inactive' checked={this.state.newJobSeekingStatus === 'inactive'} onChange={this.handleChange.bind(this, 'inactive')}></input>
                                        <label>Not looking for a job at the moment</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" value='employed' checked={this.state.newJobSeekingStatus === 'employed'} onChange={this.handleChange.bind(this, 'employed')}></input>
                                        <label>Currently employed but open to offers</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" value='availableLater' checked={this.state.newJobSeekingStatus === 'availableLater'} onChange={this.handleChange.bind(this, 'availableLater')}></input>
                                        <label>Will be available on later date</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.newJobSeekingStatus === "availableLater" ?
                       
                            <div className="row">
                                <div className="ui four wide column">
                                    <div className="field">
                                        <label>Available Date: </label>
                                    </div>
                                <div className="ui six wide column">
                                    <input type="date" name="availeDate" placeholder="Available Date" value={this.state.availableDate} onChange={this.handleChange.bind(this, 'availableLater')}></input>
                                </div>
                                <div className="ui four wide column">
                                    <button type="button" className="ui green button" onClick={this.saveJobSeekingStatus}>Save Date</button>
                                </div>
                                </div>
                            </div>
                        : <React.Fragment>
                        </React.Fragment>
                        }
                </div>
            </React.Fragment>
        )
    }
}