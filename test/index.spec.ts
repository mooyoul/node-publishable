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
    it("should return true", async () => {
      sandbox.mock(pacote)
        .expects("manifest")
        .withArgs("package-name@1.0.0")
        .rejects(new MockPacoteError("ENOVERSIONS"));

      expect(await publishable("package-name", "1.0.0")).to.be.eq(true);
    });
  });

  context("when package is published but requested version is not published to registry", () => {
    it("should return true", async () => {
      sandbox.mock(pacote)
        .expects("manifest")
        .withArgs("package-name@1.1.1")
        .rejects(new MockPacoteError("ETARGET"));

      expect(await publishable("package-name", "1.1.1")).to.be.eq(true);
    });
  });

  context("when package is published but requested version is not published to registry", () => {
    it("should return true", async () => {
      sandbox.mock(pacote)
        .expects("manifest")
        .withArgs("package-name@0.0.1")
        .resolves({ name: "package-name", version: "0.0.1" });

      expect(await publishable("package-name", "0.0.1")).to.be.eq(false);
    });
  });

  context("when unknown error was thrown", () => {
    it("should return false", async () => {
      sandbox.mock(pacote)
        .expects("manifest")
        .withArgs("package-name@1.2.3")
        .rejects(new MockPacoteError("UNKNOWN_ERROR"));

      expect(await publishable("package-name", "1.2.3")).to.be.eq(false);
    });
  });
});
