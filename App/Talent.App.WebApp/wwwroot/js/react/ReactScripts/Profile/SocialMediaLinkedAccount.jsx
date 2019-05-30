/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts

        this.state = {
            showEditSection: false,
            newLinkedAccounts: linkedAccounts
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveDetails = this.saveDetails.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    }

    openEdit() {
        const linkedAccounts = this.props.linkedAccounts
        this.setState({
            showEditSection: true,
            newLinkedAccounts: linkedAccounts
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = this.state.newLinkedAccounts
        data[event.target.name] = event.target.value
        this.setState({
            newLinkedAccounts: data
        })
    }

    saveDetails() {
        const data = this.state.newLinkedAccounts
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }



    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <React.Fragment>
                <div className='ui sixteen wide column'>

                    <ChildSingleInput
                        inputType="text"
                        label="LinkedIn"
                        name="linkedIn"
                        value={this.state.newLinkedAccounts.linkedIn}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your LinkedIn URL"
                        errorMessage="Please enter a valid URL"
                    />

                    <ChildSingleInput
                        inputType="text"
                        label="GitHub"
                        name="github"
                        value={this.state.newLinkedAccounts.github}
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Enter your GitHub URL"
                        errorMessage="Please enter a valid URL"
                    />

                    <button type="button" className="ui green button" onClick={this.saveDetails}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </React.Fragment>
        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui four wide column">
                    <button type="button" className="ui right floated blue button"> <Icon name="linkedin" /> >LinkedIn</button>
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui right floated teal button"> <Icon name="github" /> >GitHub</button>
                </div>
                <div className="ui eight wide column">
                    <button type="button" className="ui right floated green button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}