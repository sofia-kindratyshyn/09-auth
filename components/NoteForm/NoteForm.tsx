'use client'
import css from './NoteForm.module.css'
import { Formik, Field, Form, type FormikHelpers, ErrorMessage } from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postNote } from '../../lib/api'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import { NoteForPost } from '../../types/note'

interface NoteFormProps {
  onClose: () => void
}

const CreatingNoteSchema = Yup.object().shape({
  title: Yup.string()
    .max(50, 'Title must not contain more than 50 symbols.')
    .min(3, 'Title should consist of at least 3 symbols.')
    .required('Title is required.'),
  content: Yup.string()
    .max(500, 'Content must not contain more than 500 symbols.')
    .required('Content is required'),
})

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (noteForPost: NoteForPost) => postNote(noteForPost),
    onError: () => {
      toast.error('There was an error while creating.')
    },
    onSuccess: () => {
      toast.success('The note successfully created.')
      queryClient.invalidateQueries({ queryKey: ['note'] })
      onClose()
    },
  })

  function handleSubmit(values: NoteForPost, actions: FormikHelpers<NoteForPost>) {
    mutation.mutate(values)
    actions.resetForm()
  }

  return (
    <Formik
      initialValues={{
        title: '',
        content: '',
        categoryId: '592f6727-80fe-4bcc-ae13-5d2e6ae5186b',
      }}
      onSubmit={handleSubmit}
      validationSchema={CreatingNoteSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor='title'>Title</label>
          <Field id='title' type='text' name='title' className={css.input} />
          <ErrorMessage name='title' component='span' className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='content'>Content</label>
          <Field as='textarea' id='content' name='content' rows={8} className={css.textarea} />
          <ErrorMessage name='content' component='span' className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor='categoryId'>Category Id</label>
          <Field as='select' id='categoryId' name='categoryId' className={css.select}>
            <option value='' disabled>
              Select category
            </option>
            <option value='592f6727-80fe-4bcc-ae13-5d2e6ae5186b'>Home</option>
            <option value='adba00fe-520b-431d-a247-dc362e6f41a1'>Work</option>
          </Field>
          <ErrorMessage name='categoryId' component='span' className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={() => onClose()} type='button' className={css.cancelButton}>
            Cancel
          </button>
          <button type='submit' className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  )
}
