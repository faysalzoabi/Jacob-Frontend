import React, { Component } from 'react';
import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import "./index.css"

registerPlugin(FilePondPluginImagePreview);



class Upload extends Component {
    state = {
        files: []
    }

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    render() {

        return (
            <div className="App">

                {/* Pass FilePond properties as attributes */}
                <FilePond ref={ref => this.pond = ref}
                    allowMultiple={true}
                    maxFiles={3}
                    className="filepond"
                    server="http://192.168.33.10"
                    oninit={() => this.handleInit()}
                    onupdatefiles={(fileItems) => {
                        // Set current file objects to this.state
                        this.setState({
                            files: fileItems.map(fileItem => fileItem.file)
                        });
                    }}>

                    {/* Update current files  */}
                    {this.state.files.map(file => (
                        <File key={file} src={file} origin="local" />
                    ))}

                </FilePond>

            </div>
        );
    }
}

export default Upload;