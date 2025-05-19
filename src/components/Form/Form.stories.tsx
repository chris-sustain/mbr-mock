import { useForm } from "react-hook-form";
import {TextField, Label, Input} from 'react-aria-components';

function FormTemplate({ chidren }: { chidren: React.ReactNode }) {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            <Field1 {...props1} {...register("field 1")} />
            <Field2 {...props2} {...register("field 1")} />
            <Field3 {...props3} {...register("field 1")} />
        </form>
    )
}



export default {
    title: "test",
    component: FormTemplate,
}

export const TestStory = {
    render: (args) => <FormTemplate {...args} />,
}