import { FormInstance } from 'antd'

export function handleFormSubmission(
  form: FormInstance<any>,
  onFinish: (arg0: any) => void,
  setConfirmLoading: (arg0: boolean) => void
) {
  form
    .validateFields()
    .then((values) => {
      setConfirmLoading(true)
      onFinish(values)
    })
    .catch((error) => {
      console.log('There was an issue submitting the form.')
      console.log(error.errorFields)
    })
}
