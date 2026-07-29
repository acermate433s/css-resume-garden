export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "property-no-vendor-prefix": [
      true,
      {
        ignoreProperties: ["-webkit-text-size-adjust"],
      },
    ],
    "shorthand-property-no-redundant-values": null,
  }
};