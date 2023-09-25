import { MenuItem, TextField } from '@mui/material'

export interface IFormikSelect<Type> {
    formik: Type
    label?: string
    name: string
    type?: string
    disabled?: boolean
    multiline?: boolean
    rows?: number | string
    sx?: Record<string, unknown>
    step?: number | string
    options: Array<{ value: string; label: string }>
}
export const FormikSelect = <Type extends Record<string, any>>({
    formik,
    label,
    name,
    type = 'text',
    disabled,
    options,
    ...rest
}: IFormikSelect<Type>): ReactNode => {
    return (
        <TextField
            select
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
            type={type}
            value={formik.values[name]}
            variant="outlined"
            disabled={disabled || formik.isSubmitting}
            {...rest}
        >
            {options.map((option) => (
                <MenuItem value={option.value}>{option.label}</MenuItem>
            ))}
        </TextField>
    )
}
