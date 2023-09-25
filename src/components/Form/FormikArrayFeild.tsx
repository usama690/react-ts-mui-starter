import { TextField } from '@mui/material'
import { getIn, Field, FastField } from 'formik'

export interface IFormikArrayField<Type> {
    formik: Type
    label?: string
    name: string
    value?: string | number
    type?: string
    disabled?: boolean
    multiline?: boolean
    step?: string | number
    select?: boolean
    children?: ReactNode | ReactNode[]
    useSlowField?: boolean
    lowerCase?: boolean
    onChange?: (e: any) => void
    InputProps?: { endAdornment: ReactNode }
    shrinkLabel?: boolean
}
export const FormikArrayField = <Type extends Record<string, any>>({
    formik,
    label,
    name,
    type = 'text',
    disabled,
    children,
    useSlowField,
    lowerCase,
    shrinkLabel,
    ...rest
}: IFormikArrayField<Type>): ReactNode => {
    // const touched = getIn(formik.touched, name)
    const error = getIn(formik.errors, name)

    return useSlowField ? (
        <Field
            error={Boolean(error)}
            helperText={error}
            onBlur={formik.handleBlur}
            as={TextField}
            fullWidth
            name={name}
            label={label}
            onChange={(e) => {
                if (!lowerCase) e.target.value = e.target.value.toUpperCase()
                formik.handleChange(e)
            }}
            type={type}
            disabled={disabled || formik.isSubmitting}
            variant="outlined"
            InputLabelProps={{ shrink: Boolean(shrinkLabel) }}
            {...rest}
        >
            {children}
        </Field>
    ) : (
        <FastField
            error={Boolean(error)}
            helperText={error}
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
        >
            {children}
        </FastField>
    )
}
