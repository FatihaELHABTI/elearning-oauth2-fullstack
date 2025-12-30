import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "elearning-realm",
  clientId: "react-client",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;