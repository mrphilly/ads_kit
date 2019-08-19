// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    /* firebase: {
      apiKey: "AIzaSyC_cYQskL_dKhkt-aQ1ayHt8ia2NQYEHTs",
      authDomain: "comparez.firebaseapp.com",
      databaseURL: "https://comparez.firebaseio.com",
      projectId: "comparez",
      storageBucket: "gs://comparez.appspot.com/",
      messagingSenderId: "975260713071",
    },
    googleMapsKey: 'AIzaSyCTDRoGnPwEHP_Iw1Vc68GLrmNQ7iwBkhA' */
};

export const SERVER = {
  url: "http://127.0.0.1:5000",
  //url: "http://137.74.199.121:5009",
  //url_redirect: "/dist/#",
  url_redirect: "/#"

}
