import { CheckboxFieldformElement } from "./fields/CheckboxField";
import { DateFieldformElement } from "./fields/DateField";
import { NumberFieldformElement } from "./fields/NumberField";
import { ParagraphFieldformElement } from "./fields/ParagraphField";
import { SelectFieldformElement } from "./fields/SelectField";
import { SeparatorFieldformElement } from "./fields/SeparatorField";
import { SpacerFieldformElement } from "./fields/SpacerField";
import { SubTitleFieldformElement } from "./fields/SubTitleField";
import { TextAreaFieldformElement } from "./fields/TextAreaField";
import { TextFieldformElement } from "./fields/TextField";
import { TitleFieldformElement } from "./fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField" 
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type SubmitType = (key: string, value: string) => void;

export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  designerBtn: {
    icon: React.ElementType;
    label: string;
  };

  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitType;
    isValid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export interface FormElementInstance {
  type: ElementsType;
  id: string;
  extraAttribute?: Record<string, any>;
}

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
  TextField: TextFieldformElement,
  TitleField: TitleFieldformElement,
  SubTitleField: SubTitleFieldformElement,
  ParagraphField: ParagraphFieldformElement,
  SeparatorField: SeparatorFieldformElement,
  SpacerField:SpacerFieldformElement,
  NumberField: NumberFieldformElement, 
  TextAreaField:TextAreaFieldformElement,
  DateField:DateFieldformElement,
  SelectField:SelectFieldformElement,
  CheckboxField:CheckboxFieldformElement
};
