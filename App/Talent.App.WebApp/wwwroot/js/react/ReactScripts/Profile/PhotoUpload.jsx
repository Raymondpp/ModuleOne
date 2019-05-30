/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);
        const photoFile = props.photoFile
        const photoURL = props.photoURL

        this.state = {
            selectedFile: photoFile,
            photoSrc: photoURL,
            fileSelected: false
            

        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    };

    onChangeHandler(event) {
        let localSelectedFile = this.state.selectedFile;
        let imageSrc = this.state.photoSrc;
       
        localSelectedFile = event.target.files[0];
        imageSrc = window.URL.createObjectURL(event.target.files[0]);
        this.setState({
            selectedFile: localSelectedFile,
            photoSrc: imageSrc,
            fileSelected: true
        })
    }

    onClickHandler() {
        let data = new FormData()
        data.append('ProfilePhoto', this.state.selectedFile);
        data.append('ProfilePhotoUrl', this.state.photoSrc);
        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: 'http://localhost:60290/profile/profile/UpdateProfilePhoto',
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    console.log("success")
                    TalentUtil.notification.show("Image updated successfully", "success", null, null);
                    
                } else {
                    TalentUtil.notification.show("Image did not update successfully", "error", null, null);
                   
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
               
            }
        });
        this.setState({
            fileSelected: false
        })
       
    }
    

    render() {
        return (

            <div className="two wide column">
                <input type="file" onChange={this.onChangeHandler} className="inputfile" id="selectFile" style={{ display: 'none' }} />
                <label htmlFor="selectFile" className="work-sample-photo">
                    {this.state.selectedFile ?
                        (<img src={this.state.photoSrc} className="ui small circular image" ></img>)
                        :
                        <i className="ui huge camera retro icon circular" ></i>}
                </label>
                <div className="four wide column">
                    {this.state.fileSelected ?
                        <div><button className="medium ui black button ui upload button" type="button" onClick={this.onClickHandler}><i className="ui upload icon"></i>Upload</button></div>
                        :
                        null}
                </div>
            </div>

        )
        
    }
}
