import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";

chai.use(chaiAsPromised);

const expect = chai.expect;

const pacote = require("pacote") as any; // tslint:disable-line
import publishable = require("../src/index");

class MockPacoteError extends Error {
  constructor(public code: string) {
    super("MOCK_PACOTE_ERROR");
  }
}

describe("publishable", () => {
  let sandbox: sinon.SinonSandbox;

  beforeEach((() => {
    sandbox = sinon.createSandbox();
  }));

  afterEach(() => {
    sandbox.verifyAndRestore();
  });

  context("when package is not published to registry", () => {
    beforeEach(() => {
      sandbox.stub(pacote, "manifest").rejects(new MockPacoteError("E404"));
    });

    it("should return true", async () => {
      expect(await publishable("@foo/bar", "3.4.5")).to.be.eq(true);
    });
  });

  context("when package is published but requested version is not published to registry", () => {
    beforeEach(() => {
      sandbox.stub(pacote, "manifest").rejects(new MockPacoteError("ENOVERSIONS"));
    });

    it("should return true", async () => {
      expect(await publishable("package-name", "1.0.0")).to.be.eq(true);
    });
  });

  context("when package is published but requested version is not published to registry", () => {
    beforeEach(() => {
      sandbox.stub(pacote, "manifest").rejects(new MockPacoteError("ETARGET"));
    });

    it("should return true", async () => {
      expect(await publishable("@user/package-name", "1.1.1")).to.be.eq(true);
    });
  });

  context("when package is published and requested version is published to registry", () => {
    beforeEach(() => {
      sandbox.stub(pacote, "manifest").resolves({ name: "package-name", version: "0.0.1" });
    });

    it("should return false", async () => {
      expect(await publishable("package-name", "0.0.1")).to.be.eq(false);
    });
  });

  context("when unknown error was thrown", () => {

    beforeEach(() => {
      sandbox.stub(pacote, "manifest").rejects(new MockPacoteError("UNKNOWN_ERROR"));
    });

    it("should return false", async () => {
      expect(await publishable("package-name", "1.2.3")).to.be.eq(false);
    });
  });
});
