/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createCompany } from "./graphql/mutations";
const client = generateClient();
export default function CompanyCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    identityCard: "",
    name: "",
    siiPassword: "",
  };
  const [identityCard, setIdentityCard] = React.useState(
    initialValues.identityCard
  );
  const [name, setName] = React.useState(initialValues.name);
  const [siiPassword, setSiiPassword] = React.useState(
    initialValues.siiPassword
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setIdentityCard(initialValues.identityCard);
    setName(initialValues.name);
    setSiiPassword(initialValues.siiPassword);
    setErrors({});
  };
  const validations = {
    identityCard: [{ type: "Required" }],
    name: [{ type: "Required" }],
    siiPassword: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          identityCard,
          name,
          siiPassword,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createCompany.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "CompanyCreateForm")}
      {...rest}
    >
      <TextField
        label="Identity card"
        isRequired={true}
        isReadOnly={false}
        value={identityCard}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identityCard: value,
              name,
              siiPassword,
            };
            const result = onChange(modelFields);
            value = result?.identityCard ?? value;
          }
          if (errors.identityCard?.hasError) {
            runValidationTasks("identityCard", value);
          }
          setIdentityCard(value);
        }}
        onBlur={() => runValidationTasks("identityCard", identityCard)}
        errorMessage={errors.identityCard?.errorMessage}
        hasError={errors.identityCard?.hasError}
        {...getOverrideProps(overrides, "identityCard")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identityCard,
              name: value,
              siiPassword,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Sii password"
        isRequired={true}
        isReadOnly={false}
        value={siiPassword}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              identityCard,
              name,
              siiPassword: value,
            };
            const result = onChange(modelFields);
            value = result?.siiPassword ?? value;
          }
          if (errors.siiPassword?.hasError) {
            runValidationTasks("siiPassword", value);
          }
          setSiiPassword(value);
        }}
        onBlur={() => runValidationTasks("siiPassword", siiPassword)}
        errorMessage={errors.siiPassword?.errorMessage}
        hasError={errors.siiPassword?.hasError}
        {...getOverrideProps(overrides, "siiPassword")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
