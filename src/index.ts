import * as debug from "debug";
// tslint:disable-next-line
const pacote = require("pacote") as {
  manifest(spec: string, opts: any): Promise<{ [key: string]: any }>;
};
import rc = require("rc");

const log = debug("publishable");
const config = rc("npm", {});

export = async function publishable(packageName: string, versionSpec: string): Promise<boolean> {
  const spec = `${packageName}@${versionSpec}`;
  log("querying package manifest to registry for spec %s...", spec);
  try {
    await pacote.manifest(spec, config); // if success, given spec already exists on registry. so cannot publish.

    return false;
  } catch (e) {
    // given spec does not exists on registry, so package is publishable.
    if (e.code === "ENOVERSIONS" || e.code === "ETARGET") {
      return true;
    }

    log("got unknown error, maybe registry is down?", e.message);
    return false;
  }
};
