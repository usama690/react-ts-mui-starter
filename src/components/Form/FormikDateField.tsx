import { LocalizationProvider, DesktopDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'

export interface IFormikTextField<Type> {
    formik: Type
    label?: string
    name: string
    disabled?: boolean
    inputFormat?: string
    sx?: Record<string, unknown>
    value?: number | string
}
export const FormikDateField = <Type extends Record<string, any>>({
    formik,
    label,
    name,
    disabled,
    inputFormat,
    ...rest
}: IFormikTextField<Type>): ReactNode => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label={label}
                inputFormat={inputFormat || 'dd-MM-yyyy'}
                mask={(inputFormat || 'dd-MM-yyyy').replaceAll(/[\w]/g, '_')}
                disabled={disabled || formik.isSubmitting}
                value={formik.values[name]}
                onChange={(date) => {
                    formik.setFieldValue(name, date)
                }}
                renderInput={(params) => (
                    <TextField
                        helperText={formik.touched[name] && formik.errors[name]}
                        error={Boolean(
                            formik.touched[name] && formik.errors[name]
                        )}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        fullWidth
                        name={name}
                        {...params}
                    />
                )}
                {...rest}
            />
        </LocalizationProvider>
    )
}
