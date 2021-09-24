import React, {ChangeEvent} from 'react';

export type ProfileStatusPropsType = {
    profileStatus: string
    updateProfileStatusThunk: (status: string) => void
}

export type stateType = {
    editMode: boolean
    status: string
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.profileStatus,
    }

    onEditMode = () => {
        this.setState({
            editMode: true,
        })
    }

    offEditMode = () => {
        this.setState({
            editMode: false,
        })
        this.props.updateProfileStatusThunk(this.state.status)
    }

    onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: stateType) {
        debugger
        if (prevProps.profileStatus !== this.props.profileStatus) {
            this.setState({
                status: this.props.profileStatus
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <div>
                        <span onDoubleClick={this.onEditMode}>{this.props.profileStatus || '-----'}</span>
                    </div>

                    : <div>
                        <input autoFocus={true}
                               onBlur={this.offEditMode}
                               type='text'
                               onChange={this.onChangeStatus}
                               value={this.state.status}/>
                    </div>}
            </div>)
    }
}