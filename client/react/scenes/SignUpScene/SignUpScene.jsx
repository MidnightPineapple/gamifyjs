import React, { Component, Fragment } from 'react'
import contain from '../../ContentContainer'
import FormInput from './FormInput'

const fields = [
    {
        label: "First Name",
        type: "text",
        slug: 'first-name',
    },
    {
        label: "Last Name",
        type: "text",
        slug: "last-name"
    },
    {
        label: "Username",
        type: "text",
        slug: 'username'
    },
    {
        label: "Email",
        type: "email",
        slug: 'email'
    },
    {
        label: "Password",
        type: "password",
        slug: 'password'
    },
    {
        label: "Password Confirmation",
        type: "password",
        slug: 'password-confirmation'
    },
    {
        label: "Class Code",
        type: "text",
        slug: "class-code"
    }
]

class SignUpScene extends Component {
    
    constructor() {
        super()
        this.state = {
            progress:0,
            form: fields.reduce( (ag,v) => ({ ...ag, [v.slug]:"" }), {})
        }
    }

    onChangeField(fieldSlug, value) {
        const form = Object.assign({}, this.state.form)
        form[fieldSlug] = value
        this.setState({ form })
    }

    onSubmitForm(e) {
        e.preventDefault()
    }
    
    render() {

        const { form } = this.state

        return (
            <Fragment>
                <div>Just a few questions...</div>
                <form>
                    { fields.map( f => (
                        <FormInput 
                        key = {f.slug}
                        field={f} 
                        value={form[f.slug]} 
                        onChange={ e => this.onChangeField(f.slug, e.target.value) } />
                    ))}
                </form>
            </Fragment>
        )
    }
}

export default contain(SignUpScene)
