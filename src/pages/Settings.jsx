// eslint-disable-next-line no-unused-vars
import React from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
