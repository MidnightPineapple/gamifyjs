import React, { Fragment, Component } from 'react'
import contain from '../../ContentContainer'
import FormRow from './FormRow'
import styles from './ProfileScene'

const user = {
    firstName: "John",
    lastName: "Smith",
    email: "user@example.com",
}

class ProfileScene extends Component {

    constructor() {
        super()
        this.state = {
            form: {
                firstName: {
                    value: user.firstName,
                    editing: false,
                    label: "First Name",
                    slug:'first-name'
                },
                lastName: {
                    value: user.lastName,
                    editing:false,
                    label: "Last Name",
                    slug: "last-name"
                },
                email: {
                    value: user.email,
                    editing: false,
                    label: "Email",
                    slug: 'email'
                },
                password: {
                    value: "",
                    editing: false,
                    label: "Change Password",
                    slug: 'password'
                }
            }
        }
    }

    onSubmit(fieldName, event) {
        event.preventDefault()
        const form = Object.assign({}, this.state.form)
        const field = Object.assign({}, this.state.form[fieldName])

        field.value = event.target[0].value
        form[fieldName] = field
        this.setState({ form })

        // TODO: make network request here
    }


    render() {

        const { form } = this.state

        return (
            <Fragment>
                <h3>User Profile: John Smith</h3>
                {
                    Object.keys(form).map( (v,k) => (
                        <FormRow 
                        key={v}
                        value={form[v].value} 
                        label={form[v].label} 
                        onSubmit={e => this.onSubmit(v,e)} />
                    ))
                }
            </Fragment>
        )
    }

}

export default contain(ProfileScene, { background:"#ddd", color:"#222" })