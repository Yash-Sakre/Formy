import { TextFieldformElement } from "./fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType,

    construct : (id:string) => FormElementInstance

    designerBtn : {
        icon : React.ElementType;
        label : string;
    }


    designerComponent : React.FC<{
        elementInstance : FormElementInstance;
    }>;
    formComponent : React.FC;
    propertiesComponent : React.FC<{
        elementInstance : FormElementInstance;
    }>;
}

export interface FormElementInstance {
    type: ElementsType;
    id: string;
    extraAttribute?: Record<string, any>;
}

type FormElementsType = {
    [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
    TextField : TextFieldformElement
}