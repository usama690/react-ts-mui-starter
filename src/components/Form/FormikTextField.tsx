import { TextField } from '@mui/material'
import { Field, FastField } from 'formik'

export interface IFormikTextField<Type> {
    formik: Type
    label?: string
    name: string
    type?: string
    disabled?: boolean
    multiline?: boolean
    rows?: number | string
    sx?: Record<string, unknown>
    step?: number | string
    value?: number | string
    useSlowField?: boolean
}
export const FormikTextField = <Type extends Record<string, any>>({
    formik,
    label,
    name,
    type = 'text',
    disabled,
    useSlowField,
    ...rest
}: IFormikTextField<Type>): ReactNode => {
    return useSlowField ? (
        <Field
            error={Boolean(formik.touched[name] && formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
            onBlur={formik.handleBlur}
            as={TextField}
            fullWidth
            name={name}
            label={label}
            onChange={(e) => {
                e.target.value = e.target.value.toUpperCase()
                formik.handleChange(e)
            }}
            type={type}
            disabled={disabled || formik.isSubmitting}
            variant="outlined"
            {...rest}
        />
    ) : (
        <FastField
            error={Boolean(formik.touched[name] && formik.errors[name])}
            fullWidth
            helperText={formik.touched[name] && formik.errors[name]}
            label={label}
            name={name}
            onBlur={formik.handleBlur}
            onChange={(e) => {
                e.target.value = e.target.value.toUpperCase()
                formik.handleChange(e)
            }}
            as={TextField}
            type={type}
            variant="outlined"
            disabled={disabled || formik.isSubmitting}
            {...rest}
        />
    )
}
