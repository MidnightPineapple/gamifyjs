import React from 'react'
import PropTypes from 'prop-types'

const FormInput = ({ field:f, onChange, value }) => (
    <div id={"form-"+f.slug}>
        <label htmlFor={f.slug}>{ f.label }</label> 
        <input
        id={f.slug}
        type={f.type}
        onChange={onChange}
        value={value}/>
    </div> 
)


FormInput.propTypes = {
    field: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        type: PropTypes.oneOf([ 
            "text", 
            "password", 
            "email", 
            "checkbox" 
        ]).isRequired,
        label: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool, 
    ]),
}

export default FormInput
