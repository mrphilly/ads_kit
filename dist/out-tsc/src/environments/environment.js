"use strict";
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false,
};
exports.SERVER = {
    url: "http://127.0.0.1:5000",
    //url: "http://137.74.199.121:5009",
    //url_redirect: "/dist/#",
    url_redirect: "/#"
};
//# sourceMappingURL=environment.js.map