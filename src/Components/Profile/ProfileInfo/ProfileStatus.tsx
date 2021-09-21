import React from 'react';

export type ProfileStatusPropsType = {
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
    }

    onEditMode() {
        this.setState({
            editMode: true,
        })
        console.log(this.state.editMode)
    }

    offEditMode() {
        this.setState({
            editMode: false,
        })
        console.log(this.state.editMode)
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.onEditMode.bind(this)}>{this.props.status}</span>
                    </div>

                    : <div>
                        <input autoFocus={true}
                               onBlur={this.offEditMode.bind(this)}
                               type='text'
                               defaultValue={this.props.status}/>
                    </div>}
            </div>)
    }
}