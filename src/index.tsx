export * from 'react-hook-form'

import {
  UseFormProps,
  useForm,
  useController,
  UseControllerProps,
} from 'react-hook-form'

export type FieldProps = {
  value?: string | number | boolean
  isReadOnly?: boolean
  isRequired?: boolean
  isHidden?: boolean
  isDisabled?: boolean
  error?: boolean
  message?: string
}

export type VLProSetValueType<T> = (
  name: string,
  values: T,
  options?: Partial<{
    shouldValidate: boolean
    shouldDirty: boolean
    shouldTouch: boolean
  }>
) => void

export const useVLProForm = (
  props: UseFormProps<Record<string, FieldProps>>
) => {
  const { setValue: originalSetValue, ...formMethods } =
    useForm<Record<string, FieldProps>>(props)

  const setValueExtended: VLProSetValueType<FieldProps> = (
    name: string,
    values: FieldProps,
    options?: Partial<{
      shouldValidate: boolean
      shouldDirty: boolean
      shouldTouch: boolean
    }>
  ) => {
    originalSetValue(name, values, options)
  }

  return {
    ...formMethods,
    setValue: setValueExtended
  }
}

export const useVLProController = (props: UseControllerProps) => {
  const { control, name, defaultValue } = props
  const { field, ...rest } = useController({
    name,
    control,
    defaultValue
  })

  const extendedField = {
    ...field,
    ...field.value
  }

  return { field: extendedField, ...rest }
}
