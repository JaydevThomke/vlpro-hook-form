import React, { useEffect } from 'react'

import {
  useVLProForm,
  useVLProController,
  Control,
  FieldProps,
  VLProSetValueType
} from 'vlpro-hook-form'
import 'vlpro-hook-form/dist/index.css'

export type ParameterProps = {
  uiParam: {
    name: string
    initialValue?: string | number | boolean
    isDisabled?: boolean
    isReadOnly?: boolean
  }
  control: Control
  setValue: VLProSetValueType<FieldProps>
}
const Parameter = React.memo(
  ({ uiParam, control, setValue }: ParameterProps) => {
    const { name, initialValue, isDisabled, isReadOnly } = uiParam
    const { field } = useVLProController({
      name: name,
      control: control
    })

    useEffect(() => {
      setValue(name, {
        value: initialValue,
        isDisabled: isDisabled,
        isReadOnly: isReadOnly
      })
    }, [initialValue, isDisabled, isReadOnly, name, setValue])

    return (
      <div>
        <span>{name}</span>
        <input
          value={field.value}
          onChange={() => {}}
          disabled={field.isDisabled}
          readOnly={field.isReadOnly}
          onChangeCapture={(e) => {
            setValue(name, { value: e.currentTarget.value })
          }}
        />
      </div>
    )
  },
  (prev, next) => {
    return prev.uiParam === next.uiParam
  }
)

const App = () => {
  const { control, setValue } = useVLProForm({})
  return (
    <div>
      <form name='demo'>
        <Parameter
          control={control}
          setValue={setValue}
          uiParam={{
            name: 'field1',
            initialValue: 1
          }}
        />
        <Parameter
          control={control}
          setValue={setValue}
          uiParam={{
            name: 'field2',
            isDisabled: true,
            initialValue: 2
          }}
        />
        <Parameter
          control={control}
          setValue={setValue}
          uiParam={{
            name: 'field3',
            isReadOnly: true,
            initialValue: 3
          }}
        />
      </form>
    </div>
  )
}

export default App
