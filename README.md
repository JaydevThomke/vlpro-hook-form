# vlpro-hook-form

> An Extended version of react-hook-form for valve link pro

## Install

```bash
npm install --save vlpro-hook-form
```

## Usage

```tsx
import React, { Component } from 'react'

import { useVLProForm, useVLProController } from 'vlpro-hook-form'
import 'vlpro-hook-form/dist/index.css'

const Field = ({ name, control, setValue }) => {
  const { field: { value, isDisabled, isReadOnly, isHidden, isRequired } } = useVLProController({
    name: name,
    control: control
  })

  useEffect(() => {
    setValue(name, { value: initialValue, isDisabled, isReadOnly, isHidden, isRequired });
  }, [name, initialValue, isDisaveld, isDisabled, isReadOnly, isHidden, isRequired])

  return <input value={value} name={name} disabled={isDisabled} required={isRequired} readOnly={isReadOnly} />
};

const Example = () => {
  const { control, setValue } = useVLProForm({});
  return <form>
    <Field name="field1" control={control} value="AXZ" setValue={setValue} />
  </form>
}
```

## License

EMERSON © [JaydevThomke](https://github.com/JaydevThomke)
