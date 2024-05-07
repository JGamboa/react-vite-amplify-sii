import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CompanyCreateFormInputValues = {
    identityCard?: string;
    name?: string;
    siiPassword?: string;
};
export declare type CompanyCreateFormValidationValues = {
    identityCard?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    siiPassword?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CompanyCreateFormOverridesProps = {
    CompanyCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    identityCard?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    siiPassword?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CompanyCreateFormProps = React.PropsWithChildren<{
    overrides?: CompanyCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CompanyCreateFormInputValues) => CompanyCreateFormInputValues;
    onSuccess?: (fields: CompanyCreateFormInputValues) => void;
    onError?: (fields: CompanyCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CompanyCreateFormInputValues) => CompanyCreateFormInputValues;
    onValidate?: CompanyCreateFormValidationValues;
} & React.CSSProperties>;
export default function CompanyCreateForm(props: CompanyCreateFormProps): React.ReactElement;
