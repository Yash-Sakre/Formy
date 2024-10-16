
import { GetFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/FormElements';
import FormSubmitPage from '@/components/FormSubmitPage';
import React from 'react'

async function Submit({params}:{
    params:{
        formUrl:string
    }
}) {

    const form = await GetFormContentByUrl(params.formUrl);

    if(!form){
        throw new Error('Form not found');
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];
    
    
  return (
    <FormSubmitPage formUrl = {params.formUrl} content={formContent} />  
  )
}

export default Submit