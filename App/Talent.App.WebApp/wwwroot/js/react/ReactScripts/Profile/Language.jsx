/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Table, Icon, Modal } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const languages = props.languageData

        this.state = {
            showEdit: false,
            showUpdate: false,
            updateId: "",
            newLanguages: languages,
            language: "",
            level: ""

        }

        this.openAddNew = this.openAddNew.bind(this)
        this.closeAddNew = this.closeAddNew.bind(this)

        this.showUpdate = this.showUpdate.bind(this)
        this.closeUpdate = this.closeUpdate.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.onDropdownSelected = this.onDropdownSelected.bind(this)

        this.saveLanguage = this.saveLanguage.bind(this)
        this.saveUpdate = this.saveUpdate.bind(this)

        this.deleteLanguage = this.deleteLanguage.bind(this)
    }

    openAddNew() {
        const details = this.props.languageData
        this.setState({
            showEdit: true,
            newLanguages: details,
            language: "",
            level: ""
        })
    }

    closeAddNew() {
        this.setState({
            showEdit: false,
        })
    }

    showUpdate(id, lang, lev) {
        const details = this.props.languageData
        this.setState({
            showUpdate: true,
            newLanguages: details,
            updateId: id,
            language: lang,
            level: lev
        })
    }

    closeUpdate() {
        this.setState({
            showUpdate: false,
        })
    }

    handleChange(event) {
        var data = event.target.value;
        this.setState({
            language: data
        })
    }

    onDropdownSelected(event) {
        var data = event.target.value;
        this.setState({
            level: data
        })
    }

    deleteLanguage(id) {
        let temp = this.props.languageData
        const index = temp.findIndex(obj => obj.id == id)
        temp.splice(index, 1)
        this.props.updateProfileData(temp)
       
    }

    saveUpdate() {
        let newData = this.state.newLanguages
        const data = newData.findIndex(obj => obj.id == this.state.updateId)
        newData[data].name = this.state.name
        newData[data].level = this.state.level

        this.props.updateProfileData(newData)
        this.closeUpdate()
    }

    saveLanguage() {

        let name = this.state.language
        let level = this.state.level
        this.state.newLanguages.push({ name, level })
        var data = Object.assign([], this.state.newLanguages)
        this.props.updateProfileData({ "languages": data })
        this.closeAddNew()
    }

    render() {
        let list = this.props.languageData;
        let options = null;      
        let tableData = null;
        if (this.state.showEdit) {
            options = <div className="row">
                <div className="ui five wide column">
                    <input placeholder="Add Language" value={this.state.language} onChange={this.handleChange} />
                </div>
                <div className="ui five wide column">
                    <div className="field">
                    <select className="ui dropdown"  name ="level" placeholder="Level" onChange={this.onDropdownSelected}>
                        <option value="0">Language Level</option>
                        <option value="Basic">Basic</option>
                        <option value="Conversational">Conversational</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native/Bilingual">Native/Bilingual</option>
                        </select>
                    </div>
                </div>
                <div className="ui four wide column">
                    <button type="button" className="ui green button" onClick={this.saveLanguage}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeAddNew}>Cancel</button>
                </div>
            </div>
        }
 
        if (list != "") {
            tableData = list.map(languageData =>
                <Table.Row key={languageData.id}>
                    {this.state.showUpdate && languageData.id == this.state.updateId
                        ? <React.Fragment>
                            <Table.Cell className="five wide column">
                                <input placeholder="Update Language" value={this.state.language} onChange={this.handleChange} />
                            </Table.Cell>
                            <Table.Cell className="five wide column">
                                <select className="ui dropdown" name ="level" placeholder="Level" value={this.state.level} onChange={this.onDropdownSelected}>
                                    <option value="Basic">Basic</option>
                                    <option value="Conversational">Conversational</option>
                                    <option value="Fluent">Fluent</option>
                                    <option value="Native/Bilingual">Native/Bilingual</option>
                                </select>
                            </Table.Cell>
                            <Table.Cell className="six wide column">
                                <button type="button" className="ui basic red button" onClick={this.saveUpdate}>Update</button>
                                <button type="button" className="ui basic blue button" onClick={this.closeUpdate}>Cancel</button>
                            </Table.Cell>
                        </React.Fragment>
                        : <React.Fragment>
                            <Table.Cell className="five wide column">{languageData.name}</Table.Cell>
                            <Table.Cell className="five wide column">{languageData.level}</Table.Cell>
                            <Table.Cell className="six wide column" textAlign="right">
                                <Icon name="pencil" onClick={this.showUpdate.bind(this, languageData.id, languageData.name, languageData.level)} />
                                <Icon name="cancel" onClick={this.deleteLanguage.bind(this, languageData.id)} />
                            </Table.Cell>
                        </React.Fragment>
                    }

                </Table.Row>
            )
        }

        return (
            <React.Fragment>
                {options}
                <div className="ui sixteen wide column">

                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" color='black' className="ui right floated green button" onClick={this.openAddNew} >
                                    <Icon name="plus" />Add New</button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {tableData}
                        </Table.Body>
                    </Table>
                </div>

            </React.Fragment>
        )

    }
}