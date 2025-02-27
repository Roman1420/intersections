export const setCssParamValue = (paramName: string, value: any) => {
  const documentElementStyle = document.documentElement.style;
  documentElementStyle.setProperty(paramName, value);
};
